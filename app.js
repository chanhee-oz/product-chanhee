// === State ===
const answers = {
  location: null,
  houseType: null,
  floor: null,
  direction: null,
  companion: [],
};

const screens = [
  'screen-intro',
  'screen-q1',
  'screen-q2',
  'screen-q3',
  'screen-q4',
  'screen-q5',
  'screen-loading',
  'screen-result',
];

let currentScreenIndex = 0;

// === Screen Navigation ===
function goToScreen(targetId) {
  const currentEl = document.getElementById(screens[currentScreenIndex]);
  const targetIndex = screens.indexOf(targetId);
  const targetEl = document.getElementById(targetId);

  if (currentEl === targetEl) return;

  const questionScreens = ['screen-q1','screen-q2','screen-q3','screen-q4','screen-q5'];
  const qIndex = questionScreens.indexOf(targetId);
  const progressBar = document.getElementById('progress-bar');

  if (qIndex >= 0) {
    progressBar.classList.remove('hidden');
    const pct = ((qIndex + 1) / questionScreens.length) * 100;
    document.getElementById('progress-fill').style.setProperty('--progress', pct + '%');
    document.getElementById('progress-text').textContent = `${qIndex + 1}/5`;
  } else if (targetId === 'screen-loading' || targetId === 'screen-result') {
    progressBar.classList.add('hidden');
  } else if (targetId === 'screen-intro') {
    progressBar.classList.add('hidden');
  }

  currentEl.classList.add('slide-out-left');
  setTimeout(() => {
    currentEl.classList.remove('active', 'slide-out-left');
    targetEl.classList.add('active', 'slide-in-right');
    setTimeout(() => {
      targetEl.classList.remove('slide-in-right');
    }, 300);
  }, 250);

  currentScreenIndex = targetIndex;
}

function goToNextScreen() {
  if (currentScreenIndex < screens.length - 1) {
    goToScreen(screens[currentScreenIndex + 1]);
  }
}

// === Location Data (주요 동네 목록) ===
const NEIGHBORHOODS = [
  { name: '서울 강남구 역삼동', region: '서울' },
  { name: '서울 강남구 삼성동', region: '서울' },
  { name: '서울 강남구 논현동', region: '서울' },
  { name: '서울 서초구 서초동', region: '서울' },
  { name: '서울 서초구 반포동', region: '서울' },
  { name: '서울 마포구 합정동', region: '서울' },
  { name: '서울 마포구 망원동', region: '서울' },
  { name: '서울 마포구 연남동', region: '서울' },
  { name: '서울 용산구 이태원동', region: '서울' },
  { name: '서울 용산구 한남동', region: '서울' },
  { name: '서울 성동구 성수동', region: '서울' },
  { name: '서울 송파구 잠실동', region: '서울' },
  { name: '서울 송파구 문정동', region: '서울' },
  { name: '서울 영등포구 여의도동', region: '서울' },
  { name: '서울 종로구 종로동', region: '서울' },
  { name: '서울 중구 명동', region: '서울' },
  { name: '서울 관악구 신림동', region: '서울' },
  { name: '서울 노원구 상계동', region: '서울' },
  { name: '서울 강서구 마곡동', region: '서울' },
  { name: '서울 동작구 사당동', region: '서울' },
  { name: '경기 성남시 판교', region: '경기' },
  { name: '경기 수원시 영통구', region: '경기' },
  { name: '경기 고양시 일산', region: '경기' },
  { name: '경기 용인시 수지구', region: '경기' },
  { name: '경기 화성시 동탄', region: '경기' },
  { name: '경기 부천시 중동', region: '경기' },
  { name: '경기 안양시 평촌', region: '경기' },
  { name: '인천 연수구 송도동', region: '인천' },
  { name: '인천 남동구 구월동', region: '인천' },
  { name: '부산 해운대구 해운대', region: '부산' },
  { name: '부산 수영구 광안동', region: '부산' },
  { name: '부산 부산진구 서면', region: '부산' },
  { name: '대구 수성구 범어동', region: '대구' },
  { name: '대전 유성구 봉명동', region: '대전' },
  { name: '광주 서구 치평동', region: '광주' },
  { name: '제주 제주시 연동', region: '제주' },
];

// === GPS ===
document.getElementById('btn-gps').addEventListener('click', () => {
  const btnText = document.querySelector('#btn-gps .location-btn-text');
  btnText.textContent = '위치를 찾고 있어요...';

  if (!navigator.geolocation) {
    btnText.textContent = '이 브라우저에서는 위치를 찾을 수 없어요 😢';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=ko`
        );
        const data = await res.json();
        const addr = data.address;
        const displayName = [addr.city || addr.state, addr.borough || addr.county, addr.suburb || addr.neighbourhood]
          .filter(Boolean).join(' ');

        setLocation(displayName || '현재 위치', latitude, longitude);
      } catch {
        setLocation('현재 위치', latitude, longitude);
      }
    },
    () => {
      btnText.textContent = '현재 위치로 찾기';
      alert('위치 접근이 허용되지 않았어요. 동네 이름으로 검색해주세요!');
    }
  );
});

// === Neighborhood Search ===
const locationInput = document.getElementById('location-input');
const suggestionsEl = document.getElementById('location-suggestions');

locationInput.addEventListener('input', () => {
  const query = locationInput.value.trim();
  if (query.length < 1) {
    suggestionsEl.classList.add('hidden');
    return;
  }

  const matches = NEIGHBORHOODS.filter(n =>
    n.name.includes(query)
  ).slice(0, 5);

  if (matches.length === 0) {
    suggestionsEl.classList.add('hidden');
    return;
  }

  suggestionsEl.innerHTML = matches
    .map(n => `<div class="suggestion-item" data-name="${n.name}">${n.name}</div>`)
    .join('');
  suggestionsEl.classList.remove('hidden');
});

suggestionsEl.addEventListener('click', (e) => {
  const item = e.target.closest('.suggestion-item');
  if (!item) return;
  setLocation(item.dataset.name);
  suggestionsEl.classList.add('hidden');
  locationInput.value = '';
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.location-search')) {
    suggestionsEl.classList.add('hidden');
  }
});

// === Set Location ===
function setLocation(name, lat, lng) {
  answers.location = { name, lat: lat || null, lng: lng || null };
  const displayEl = document.getElementById('location-display');
  displayEl.textContent = `📍 ${name} 근처`;
  document.getElementById('location-result').classList.remove('hidden');
}

// === Confirm Location ===
document.getElementById('btn-location-confirm').addEventListener('click', () => {
  if (answers.location) {
    goToNextScreen();
  }
});

// === Event: Start Button ===
document.getElementById('btn-start').addEventListener('click', () => {
  goToScreen('screen-q1');
});

// === Event: Single-select Option Buttons (Q2, Q3, Q4) ===
document.querySelectorAll('.options:not(.multi) .option-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const options = btn.closest('.options');
    const questionKey = options.dataset.question;

    options.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    answers[questionKey] = btn.dataset.value;

    setTimeout(() => goToNextScreen(), 400);
  });
});

// === Event: Multi-select Option Buttons (Q5) ===
document.querySelectorAll('.options.multi .option-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value;

    if (value === 'alone') {
      btn.closest('.options').querySelectorAll('.option-btn').forEach(b => {
        if (b !== btn) b.classList.remove('selected');
      });
      btn.classList.toggle('selected');
    } else {
      const aloneBtn = btn.closest('.options').querySelector('[data-value="alone"]');
      if (aloneBtn) aloneBtn.classList.remove('selected');
      btn.classList.toggle('selected');
    }

    const selected = btn.closest('.options').querySelectorAll('.option-btn.selected');
    answers.companion = Array.from(selected).map(b => b.dataset.value);

    const nextBtn = document.getElementById('btn-q5-next');
    if (answers.companion.length > 0) {
      nextBtn.classList.remove('hidden');
    } else {
      nextBtn.classList.add('hidden');
    }
  });
});

// === Event: Q5 Next Button ===
document.getElementById('btn-q5-next').addEventListener('click', () => {
  goToScreen('screen-loading');
  startLoading();
});

// === Loading Animation ===
function startLoading() {
  const loadingText = document.getElementById('loading-text');
  const messages = [
    '🔮 기운을 읽는 중...',
    '🌿 공간의 에너지를 분석하고 있어요...',
    '✨ 거의 다 됐어요!',
  ];

  let i = 0;
  loadingText.textContent = messages[0];

  const interval = setInterval(() => {
    i++;
    if (i < messages.length) {
      loadingText.style.opacity = '0';
      setTimeout(() => {
        loadingText.textContent = messages[i];
        loadingText.style.opacity = '1';
      }, 200);
    } else {
      clearInterval(interval);
      showResult();
    }
  }, 800);
}

// === Show Result ===
function showResult() {
  const result = calculateResult(answers);
  const { type, energy, explanations } = result;

  const resultEl = document.getElementById('screen-result');
  resultEl.innerHTML = `
    <div class="result-content" id="result-card">
      <div class="result-header">
        <p class="result-label">✨ 당신의 집은...</p>
        <div class="result-emoji">${type.emoji}</div>
        <h1 class="result-name">${type.name}</h1>
        <p class="result-summary">${type.summary}</p>
        <div class="result-keywords">
          ${type.keywords.map(k => `<span class="keyword">#${k}</span>`).join(' ')}
        </div>
      </div>

      <div class="result-section">
        <h3>🧭 어떻게 읽었냐면요...</h3>
        <div class="explanations">
          ${explanations.map(e => `<p class="explanation">${e}</p>`).join('')}
        </div>
      </div>

      <div class="result-section">
        <h3>📊 풍수 에너지 리딩</h3>
        <div class="energy-bars">
          <div class="energy-row">
            <span class="energy-label">활력</span>
            <div class="energy-bar"><div class="energy-fill" style="width:${energy.vitality}%"></div></div>
            <span class="energy-value">${energy.vitality}%</span>
          </div>
          <div class="energy-row">
            <span class="energy-label">안정</span>
            <div class="energy-bar"><div class="energy-fill" style="width:${energy.stability}%"></div></div>
            <span class="energy-value">${energy.stability}%</span>
          </div>
          <div class="energy-row">
            <span class="energy-label">풍요</span>
            <div class="energy-bar"><div class="energy-fill" style="width:${energy.abundance}%"></div></div>
            <span class="energy-value">${energy.abundance}%</span>
          </div>
        </div>
      </div>

      <div class="result-section">
        <h3>💡 이 공간의 기운을 더 살리려면?</h3>
        <div class="tips">
          ${type.tips.map(t => `<p class="tip">${t}</p>`).join('')}
        </div>
      </div>
    </div>

    <div class="product-section">
      <h3>🛒 이 기운을 살려줄 아이템</h3>
      <p class="product-section-sub">풍수 에너지에 어울리는 오늘의집 아이템이에요</p>
      <div class="product-cards">
        ${(PRODUCT_RECOMMENDATIONS[type.id] || []).map(p => `
          <a class="product-card" href="https://ohou.se/search?query=${encodeURIComponent(p.query)}" target="_blank" rel="noopener">
            <div class="product-emoji">${p.emoji}</div>
            <div class="product-info">
              <span class="product-name">${p.name}</span>
              <p class="product-story">${p.story}</p>
            </div>
            <span class="product-arrow">→</span>
          </a>
        `).join('')}
      </div>
    </div>

    <div class="share-section">
      <button class="share-btn" id="btn-save-image">📸 결과 카드 저장하기</button>
      <button class="share-btn" id="btn-copy-link">🔗 나도 해보기 링크 복사</button>
      <button class="btn-primary" id="btn-retry">🔮 다시 해보기</button>
    </div>
  `;

  resultEl.dataset.typeId = type.id;

  goToScreen('screen-result');

  setTimeout(() => {
    resultEl.querySelectorAll('.energy-fill').forEach(bar => {
      bar.style.transition = 'width 1s ease';
    });
  }, 400);

  bindShareButtons();
}

// === Bind Share Buttons ===
function bindShareButtons() {
  // Save as image
  document.getElementById('btn-save-image').addEventListener('click', async () => {
    const card = document.getElementById('result-card');
    const btn = document.getElementById('btn-save-image');
    btn.textContent = '이미지 생성 중...';

    try {
      const canvas = await html2canvas(card, {
        scale: 2,
        backgroundColor: '#FAFAFA',
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = '나의_풍수지리_결과.png';
      link.href = canvas.toDataURL();
      link.click();
      btn.textContent = '✅ 저장 완료!';
      setTimeout(() => { btn.textContent = '📸 결과 카드 저장하기'; }, 2000);
    } catch {
      btn.textContent = '📸 결과 카드 저장하기';
      alert('이미지 저장에 실패했어요. 스크린샷을 이용해주세요!');
    }
  });

  // Copy share link
  document.getElementById('btn-copy-link').addEventListener('click', async () => {
    const typeId = document.getElementById('screen-result').dataset.typeId;
    const url = `${window.location.origin}${window.location.pathname}?type=${typeId}`;
    const btn = document.getElementById('btn-copy-link');

    try {
      await navigator.clipboard.writeText(url);
      btn.textContent = '✅ 링크 복사 완료!';
      setTimeout(() => { btn.textContent = '🔗 나도 해보기 링크 복사'; }, 2000);
    } catch {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      btn.textContent = '✅ 링크 복사 완료!';
      setTimeout(() => { btn.textContent = '🔗 나도 해보기 링크 복사'; }, 2000);
    }
  });

  // Retry
  document.getElementById('btn-retry').addEventListener('click', () => {
    answers.location = null;
    answers.houseType = null;
    answers.floor = null;
    answers.direction = null;
    answers.companion = [];

    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    document.getElementById('btn-q5-next').classList.add('hidden');
    document.getElementById('location-result').classList.add('hidden');
    document.getElementById('location-input').value = '';
    document.querySelector('#btn-gps .location-btn-text').textContent = '현재 위치로 찾기';

    goToScreen('screen-intro');
  });
}

// === Handle Shared Link ===
(function handleSharedLink() {
  const params = new URLSearchParams(window.location.search);
  const sharedType = params.get('type');

  if (sharedType && FENGSHUI_TYPES[sharedType]) {
    const type = FENGSHUI_TYPES[sharedType];
    const resultEl = document.getElementById('screen-result');

    resultEl.innerHTML = `
      <div class="result-content" id="result-card">
        <div class="result-header">
          <p class="result-label">✨ 친구의 집은...</p>
          <div class="result-emoji">${type.emoji}</div>
          <h1 class="result-name">${type.name}</h1>
          <p class="result-summary">${type.summary}</p>
          <div class="result-keywords">
            ${type.keywords.map(k => `<span class="keyword">#${k}</span>`).join(' ')}
          </div>
        </div>

        <div class="result-section">
          <h3>📊 풍수 에너지 리딩</h3>
          <div class="energy-bars">
            <div class="energy-row">
              <span class="energy-label">활력</span>
              <div class="energy-bar"><div class="energy-fill" style="width:${type.energy.vitality}%"></div></div>
              <span class="energy-value">${type.energy.vitality}%</span>
            </div>
            <div class="energy-row">
              <span class="energy-label">안정</span>
              <div class="energy-bar"><div class="energy-fill" style="width:${type.energy.stability}%"></div></div>
              <span class="energy-value">${type.energy.stability}%</span>
            </div>
            <div class="energy-row">
              <span class="energy-label">풍요</span>
              <div class="energy-bar"><div class="energy-fill" style="width:${type.energy.abundance}%"></div></div>
              <span class="energy-value">${type.energy.abundance}%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="share-section">
        <button class="btn-primary" id="btn-try-mine" onclick="window.location.href=window.location.pathname">🔮 나도 우리 집 풍수 보기!</button>
      </div>
    `;

    document.getElementById('screen-intro').classList.remove('active');
    resultEl.classList.add('active');

    setTimeout(() => {
      resultEl.querySelectorAll('.energy-fill').forEach(bar => {
        bar.style.transition = 'width 1s ease';
      });
    }, 400);
  }
})();
