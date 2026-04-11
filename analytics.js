// === Analytics Tracking Module ===
// Vercel Web Analytics (프라이버시 친화, 쿠키 없음) + GA4 (고급 분석) 이중 트래킹
//
// 설정 방법:
// 1. Vercel Web Analytics: Vercel 대시보드 → 프로젝트 → Analytics 탭에서 활성화 (코드 변경 불필요, 스크립트 자동 주입)
//    또는 index.html에 수동 추가: <script defer src="/_vercel/insights/script.js"></script>
// 2. GA4: index.html의 G-XXXXXXXXXX를 실제 GA4 Measurement ID로 교체
//    GA4는 선택사항 — Vercel Analytics만으로도 기본 분석 가능

(function () {
  'use strict';

  // === Config ===
  const SCREEN_NAMES = {
    'screen-intro': 'intro',
    'screen-q1': 'q1_location',
    'screen-q2': 'q2_house_type',
    'screen-q3': 'q3_floor',
    'screen-q4': 'q4_direction',
    'screen-q5': 'q5_companion',
    'screen-loading': 'loading',
    'screen-result': 'result',
  };

  // === State ===
  let sessionStartTime = Date.now();
  let screenEnteredAt = Date.now();
  let currentScreen = 'screen-intro';
  let furthestScreen = 0;

  // === Dual-track: Vercel Analytics + GA4 ===
  function track(eventName, params) {
    // Vercel Web Analytics 커스텀 이벤트
    // va.track()은 Vercel Analytics 스크립트가 로드되면 자동으로 사용 가능
    if (typeof window.va === 'function') {
      // Vercel Analytics는 flat string/number 값만 지원
      const vaParams = {};
      for (const [k, v] of Object.entries(params || {})) {
        if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
          vaParams[k] = String(v);
        }
      }
      window.va('event', { name: eventName, ...vaParams });
    }

    // GA4 gtag 이벤트
    if (typeof gtag === 'function') {
      gtag('event', eventName, params || {});
    }

    // PostHog 이벤트
    if (typeof posthog !== 'undefined' && posthog.capture) {
      posthog.capture(eventName, params || {});
    }

    // 개발 환경 콘솔 로깅
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      console.log('[Analytics]', eventName, params);
    }
  }

  // === 1. Screen View Tracking ===
  function trackScreenView(screenId) {
    const now = Date.now();
    const prevScreenName = SCREEN_NAMES[currentScreen] || currentScreen;
    const timeSpent = now - screenEnteredAt;

    // 이전 화면 체류 시간 기록
    if (currentScreen !== screenId) {
      track('screen_exit', {
        screen_name: prevScreenName,
        time_spent_ms: timeSpent,
        time_spent_sec: Math.round(timeSpent / 1000),
      });
    }

    // 새 화면 진입 기록
    const screenName = SCREEN_NAMES[screenId] || screenId;
    const screenIndex = Object.keys(SCREEN_NAMES).indexOf(screenId);

    track('screen_view', {
      screen_name: screenName,
      screen_index: screenIndex,
    });

    if (screenIndex > furthestScreen) {
      furthestScreen = screenIndex;
    }

    currentScreen = screenId;
    screenEnteredAt = now;
  }

  // === 2. Option Selection Tracking ===
  function trackOptionSelected(question, value, screenId) {
    track('option_selected', {
      question: question,
      value: value,
      screen_name: SCREEN_NAMES[screenId] || screenId,
    });
  }

  // === 3. Location Method Tracking ===
  function trackLocationMethod(method, locationName) {
    track('location_method', {
      method: method,
      location_name: locationName || '',
    });
  }

  // === 4. Result Viewed Tracking ===
  function trackResultViewed(typeId, typeName) {
    const duration = Date.now() - sessionStartTime;
    track('result_viewed', {
      type_id: typeId,
      type_name: typeName,
      funnel_duration_sec: Math.round(duration / 1000),
    });

    track('funnel_completed', {
      duration_sec: Math.round(duration / 1000),
    });
  }

  // === 5. Product Click Tracking ===
  function trackProductClick(productName, productUrl, typeId) {
    track('product_clicked', {
      product_name: productName,
      product_url: productUrl,
      type_id: typeId,
    });
  }

  // === 6. Share Action Tracking ===
  function trackShareAction(method, typeId) {
    track('share_action', {
      method: method,
      type_id: typeId,
    });
  }

  // === 7. Feedback Tracking ===
  function trackFeedback(match, reason, typeId) {
    track('feedback_submitted', {
      match: match,
      reason: reason || '',
      type_id: typeId,
    });
  }

  // === 8. Drop-off Detection ===
  function trackDropOff() {
    const screenName = SCREEN_NAMES[currentScreen] || currentScreen;
    const timeSpent = Date.now() - screenEnteredAt;
    const totalTime = Date.now() - sessionStartTime;

    // beforeunload/visibilitychange에서는 navigator.sendBeacon이 더 안정적
    // GA4 gtag는 내부적으로 sendBeacon을 사용하므로 OK
    // Vercel Analytics도 beacon 기반이므로 OK
    track('session_end', {
      last_screen: screenName,
      furthest_screen: Object.values(SCREEN_NAMES)[furthestScreen] || 'intro',
      furthest_screen_index: furthestScreen,
      last_screen_time_sec: Math.round(timeSpent / 1000),
      total_session_sec: Math.round(totalTime / 1000),
      completed: currentScreen === 'screen-result',
    });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      trackDropOff();
    }
  });

  window.addEventListener('beforeunload', trackDropOff);

  // === 9. Auto-bind: Product Card Clicks (event delegation) ===
  document.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    if (productCard) {
      const productName = productCard.querySelector('.product-name')?.textContent || '';
      const productUrl = productCard.href || '';
      const typeId = document.getElementById('screen-result')?.dataset.typeId || '';
      trackProductClick(productName, productUrl, typeId);
    }
  });

  // === 10. Initial page view ===
  track('screen_view', {
    screen_name: 'intro',
    screen_index: 0,
  });

  // === Expose API for app.js ===
  window.FengshuiAnalytics = {
    trackScreenView,
    trackOptionSelected,
    trackLocationMethod,
    trackResultViewed,
    trackProductClick,
    trackShareAction,
    trackFeedback,
    track,
  };
})();
