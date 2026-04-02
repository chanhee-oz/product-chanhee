# 풍수지리 랜딩 페이지 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 오늘의집 고객이 탭 몇 번으로 자기 집의 풍수 유형을 진단받고, 결과를 SNS에 공유할 수 있는 인터랙티브 싱글 페이지 프로토타입을 만든다.

**Architecture:** HTML + CSS + Vanilla JS 싱글 페이지. 질문 카드를 슬라이드 전환하고, 입력 조합을 JSON 매핑 테이블로 12가지 유형에 매핑한다. html2canvas로 결과 카드 이미지를 생성하고, URL 파라미터로 결과를 공유한다.

**Tech Stack:** HTML5, CSS3 (트랜지션/애니메이션), Vanilla JS (ES6+), html2canvas (CDN), Geolocation API

---

## 파일 구조

```
product-chanhee/
├── index.html          # 전체 HTML 구조 (인트로, 질문 5개, 로딩, 결과)
├── style.css           # 모바일 퍼스트 반응형, 애니메이션, 톤앤매너
├── app.js              # 흐름 제어, 결과 매핑, 공유 기능
├── data.js             # 12개 풍수 유형 데이터 + 매핑 테이블 + 풍수 해설
└── docs/               # 스펙, 계획 문서
```

`app.js`와 `data.js`를 분리하는 이유: 데이터(유형 정의, 해설 텍스트, 매핑 룰)가 상당히 크고, 로직과 섞이면 파일이 비대해진다. 데이터만 수정할 때 로직을 건드릴 필요가 없다.

---

### Task 1: HTML 기본 구조 + 인트로 화면

**Files:**
- Create: `index.html`
- Create: `style.css`

- [ ] **Step 1: index.html 생성 — 전체 화면 컨테이너 구조**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🔮 우리 집 풍수 보기</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="app">
    <!-- 프로그레스 바 (인트로에서는 숨김) -->
    <div id="progress-bar" class="hidden">
      <div id="progress-fill"></div>
      <span id="progress-text"></span>
    </div>

    <!-- 인트로 화면 -->
    <div class="screen active" id="screen-intro">
      <div class="intro-content">
        <div class="intro-emoji">🔮</div>
        <h1>우리 집에 숨겨진 기운,<br>알고 있나요?</h1>
        <p class="intro-sub">탭 몇 번이면 끝!<br>풍수로 읽어보는 우리 집 에너지</p>
        <button class="btn-primary" id="btn-start">우리 집 기운 읽어보기 ✨</button>
      </div>
    </div>

    <!-- Q1: 위치 -->
    <div class="screen" id="screen-q1"></div>
    <!-- Q2: 집 형태 -->
    <div class="screen" id="screen-q2"></div>
    <!-- Q3: 층수 -->
    <div class="screen" id="screen-q3"></div>
    <!-- Q4: 방향 -->
    <div class="screen" id="screen-q4"></div>
    <!-- Q5: 함께 사는 존재 -->
    <div class="screen" id="screen-q5"></div>

    <!-- 로딩 화면 -->
    <div class="screen" id="screen-loading">
      <div class="loading-content">
        <div class="loading-emoji">🔮</div>
        <p id="loading-text">기운을 읽는 중...</p>
      </div>
    </div>

    <!-- 결과 화면 -->
    <div class="screen" id="screen-result"></div>
  </div>

  <script src="data.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

- [ ] **Step 2: style.css 생성 — 기본 스타일 + 인트로 화면**

```css
/* === Reset & Base === */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFAFA;
  color: #333;
  min-height: 100vh;
  overflow-x: hidden;
}

#app {
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
}

/* === Screen System === */
.screen {
  display: none;
  min-height: 100vh;
  padding: 24px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.screen.active {
  display: flex;
}

.hidden {
  display: none !important;
}

/* === Progress Bar === */
#progress-bar {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 480px;
  padding: 16px 20px 8px;
  background: #FAFAFA;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 12px;
}

#progress-fill {
  flex: 1;
  height: 4px;
  background: #E5E5E5;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
}

#progress-fill::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: var(--progress, 0%);
  background: #35C5F0;
  border-radius: 2px;
  transition: width 0.4s ease;
}

#progress-text {
  font-size: 13px;
  color: #999;
  white-space: nowrap;
}

/* === Intro Screen === */
.intro-content {
  text-align: center;
  padding: 40px 0;
}

.intro-emoji {
  font-size: 80px;
  margin-bottom: 32px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.intro-content h1 {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 16px;
  color: #222;
}

.intro-sub {
  font-size: 16px;
  color: #888;
  line-height: 1.6;
  margin-bottom: 48px;
}

/* === Buttons === */
.btn-primary {
  background: #35C5F0;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
  width: 100%;
  max-width: 320px;
}

.btn-primary:active {
  transform: scale(0.97);
  background: #2BB5E0;
}

/* === Loading Screen === */
.loading-content {
  text-align: center;
}

.loading-emoji {
  font-size: 64px;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
}

#loading-text {
  font-size: 18px;
  color: #666;
  margin-top: 24px;
  transition: opacity 0.3s;
}
```

- [ ] **Step 3: 브라우저에서 인트로 화면 확인**

Run: 브라우저에서 `index.html` 열기
Expected: 🔮 이모지가 둥실 떠다니고, 타이틀/서브/CTA 버튼이 중앙 정렬로 표시. 모바일 뷰포트(480px)에서 깔끔하게 보임.

- [ ] **Step 4: 커밋**

```bash
git add index.html style.css
git commit -m "feat: HTML 기본 구조 + 인트로 화면 스타일링"
```

---

### Task 2: 질문 카드 UI + 흐름 제어 엔진

**Files:**
- Modify: `index.html` (Q1~Q5 화면 내용 채우기)
- Modify: `style.css` (질문 카드 스타일)
- Create: `app.js` (화면 전환 로직)

- [ ] **Step 1: index.html — Q2~Q5 질문 카드 내용 채우기**

Q1(위치)은 Task 3에서 별도 구현. 먼저 선택형 질문 Q2~Q5를 채운다.

`screen-q2` 내용:

```html
<div class="screen" id="screen-q2">
  <div class="question-card">
    <div class="question-emoji">🏠</div>
    <h2>어떤 공간이<br>당신을 품고 있나요?</h2>
    <div class="options" data-question="houseType">
      <button class="option-btn" data-value="apartment">🏢 아파트</button>
      <button class="option-btn" data-value="villa">🏘️ 빌라·다세대</button>
      <button class="option-btn" data-value="house">🏡 단독주택</button>
      <button class="option-btn" data-value="officetel">🏙️ 오피스텔</button>
      <button class="option-btn" data-value="oneroom">🚪 원룸</button>
    </div>
  </div>
</div>
```

`screen-q3` 내용:

```html
<div class="screen" id="screen-q3">
  <div class="question-card">
    <div class="question-emoji">☁️</div>
    <h2>하늘과 얼마나 가까운 곳에서<br>살고 있나요?</h2>
    <div class="options" data-question="floor">
      <button class="option-btn" data-value="low">🌱 땅과 가까워요 (1~3층)</button>
      <button class="option-btn" data-value="mid">🏙️ 도시를 내려다봐요 (4~10층)</button>
      <button class="option-btn" data-value="high">☁️ 구름이 가까워요 (11~20층)</button>
      <button class="option-btn" data-value="sky">✨ 하늘 위에 살아요 (21층+)</button>
      <button class="option-btn" data-value="unknown">🤷 잘 모르겠어요</button>
    </div>
  </div>
</div>
```

`screen-q4` 내용:

```html
<div class="screen" id="screen-q4">
  <div class="question-card">
    <div class="question-emoji">☀️</div>
    <h2>아침에 햇살이<br>어디서 들어오나요?</h2>
    <div class="options" data-question="direction">
      <button class="option-btn" data-value="east">🌅 동쪽 — 아침 햇살 가득</button>
      <button class="option-btn" data-value="west">🌇 서쪽 — 노을이 예뻐요</button>
      <button class="option-btn" data-value="south">☀️ 남쪽 — 하루종일 따뜻해요</button>
      <button class="option-btn" data-value="north">🌙 북쪽 — 은은한 빛이 좋아요</button>
      <button class="option-btn" data-value="unknown">🤷 잘 모르겠어요</button>
    </div>
  </div>
</div>
```

`screen-q5` 내용:

```html
<div class="screen" id="screen-q5">
  <div class="question-card">
    <div class="question-emoji">💫</div>
    <p class="question-context">풍수에서는 공간의 기운이 함께 사는 존재들의 에너지와 섞인다고 해요 🌀</p>
    <h2>이 공간의 에너지를<br>함께 만드는 존재는?</h2>
    <div class="options multi" data-question="companion">
      <button class="option-btn" data-value="alone">🧘 나 홀로 충전 중</button>
      <button class="option-btn" data-value="partner">💑 파트너와 둘이서</button>
      <button class="option-btn" data-value="family">👨‍👩‍👧‍👦 아이와 함께 북적북적</button>
      <button class="option-btn" data-value="roommate">👯 친구·룸메이트와 함께</button>
      <button class="option-btn" data-value="pet">🐾 반려동물이 함께!</button>
    </div>
    <button class="btn-next hidden" id="btn-q5-next">다음으로 →</button>
  </div>
</div>
```

- [ ] **Step 2: style.css — 질문 카드 스타일 추가**

`style.css` 끝에 추가:

```css
/* === Question Card === */
.question-card {
  width: 100%;
  text-align: center;
  padding-top: 60px;
}

.question-emoji {
  font-size: 56px;
  margin-bottom: 20px;
}

.question-card h2 {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 32px;
  color: #222;
}

.question-context {
  font-size: 14px;
  color: #999;
  margin-bottom: 12px;
  line-height: 1.5;
}

/* === Option Buttons === */
.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.option-btn {
  background: white;
  border: 2px solid #E5E5E5;
  border-radius: 12px;
  padding: 16px 20px;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s, transform 0.15s, background 0.2s;
}

.option-btn:active {
  transform: scale(0.98);
}

.option-btn.selected {
  border-color: #35C5F0;
  background: #F0FBFF;
}

/* Q5 다음 버튼 */
.btn-next {
  margin-top: 24px;
  background: #35C5F0;
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  max-width: 320px;
  transition: transform 0.2s;
}

.btn-next:active {
  transform: scale(0.97);
}

/* === Screen Transition === */
.screen.slide-out-left {
  animation: slideOutLeft 0.3s ease forwards;
}

.screen.slide-in-right {
  animation: slideInRight 0.3s ease forwards;
}

@keyframes slideOutLeft {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(-100%); opacity: 0; }
}

@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
```

- [ ] **Step 3: app.js 생성 — 화면 전환 + 질문 흐름 엔진**

```javascript
// === State ===
const answers = {
  location: null,     // { name: string, lat?: number, lng?: number }
  houseType: null,    // apartment | villa | house | officetel | oneroom
  floor: null,        // low | mid | high | sky | unknown
  direction: null,    // east | west | south | north | unknown
  companion: [],      // [alone | partner | family | roommate | pet]
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

  // Update progress bar
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

  // Animate transition
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

// === Event: Start Button ===
document.getElementById('btn-start').addEventListener('click', () => {
  goToScreen('screen-q1');
});

// === Event: Single-select Option Buttons (Q2, Q3, Q4) ===
document.querySelectorAll('.options:not(.multi) .option-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const options = btn.closest('.options');
    const questionKey = options.dataset.question;

    // Visual feedback
    options.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    // Save answer
    answers[questionKey] = btn.dataset.value;

    // Auto-advance after brief delay
    setTimeout(() => goToNextScreen(), 400);
  });
});

// === Event: Multi-select Option Buttons (Q5) ===
document.querySelectorAll('.options.multi .option-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value;

    // "alone" is exclusive — deselect others when selected
    if (value === 'alone') {
      btn.closest('.options').querySelectorAll('.option-btn').forEach(b => {
        if (b !== btn) b.classList.remove('selected');
      });
      btn.classList.toggle('selected');
    } else {
      // Deselect "alone" if selecting something else
      const aloneBtn = btn.closest('.options').querySelector('[data-value="alone"]');
      if (aloneBtn) aloneBtn.classList.remove('selected');
      btn.classList.toggle('selected');
    }

    // Update answers
    const selected = btn.closest('.options').querySelectorAll('.option-btn.selected');
    answers.companion = Array.from(selected).map(b => b.dataset.value);

    // Show/hide next button
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

// === Show Result (placeholder — completed in Task 5) ===
function showResult() {
  goToScreen('screen-result');
}
```

- [ ] **Step 4: 브라우저에서 흐름 테스트**

Run: 브라우저에서 `index.html` 열기
Expected:
1. 시작하기 클릭 → Q1으로 전환 (Q1은 아직 빈 화면)
2. Q2~Q5는 선택지가 표시되고, 탭하면 다음으로 자동 전환
3. Q5는 복수선택 가능, "alone" 선택 시 다른 선택 해제
4. Q5에서 "다음으로" 클릭 → 로딩 애니메이션 → 빈 결과 화면
5. 프로그레스 바가 1/5 ~ 5/5로 갱신됨

- [ ] **Step 5: 커밋**

```bash
git add index.html style.css app.js
git commit -m "feat: 질문 카드 UI + 흐름 제어 엔진 (Q2~Q5)"
```

---

### Task 3: Q1 위치 질문 (GPS + 동네 검색)

**Files:**
- Modify: `index.html` (Q1 화면 내용)
- Modify: `style.css` (위치 검색 스타일)
- Modify: `app.js` (GPS 로직, 검색 로직)

프로토타입 단계이므로 카카오 API 없이 구현한다. GPS는 Geolocation API로 좌표를 얻고, 역지오코딩은 무료 Nominatim API를 사용한다. 동네 검색은 주요 지역 목록에서 필터링하는 자체 검색으로 대체한다.

- [ ] **Step 1: index.html — Q1 화면 내용**

`screen-q1` 내용:

```html
<div class="screen" id="screen-q1">
  <div class="question-card">
    <div class="question-emoji">📍</div>
    <h2>풍수의 시작은 땅의 기운!<br>어디서 생활하고 있나요?</h2>
    <p class="question-hint">정확할수록 더 정밀한 풍수를 읽을 수 있어요!<br>하지만 대략적인 위치만으로도 충분해요 😊</p>

    <div class="location-methods">
      <button class="location-btn" id="btn-gps">
        <span class="location-btn-icon">📍</span>
        <span class="location-btn-text">현재 위치로 찾기</span>
        <span class="location-btn-sub">탭 한 번이면 끝!</span>
      </button>

      <div class="location-divider"><span>또는</span></div>

      <div class="location-search">
        <input
          type="text"
          id="location-input"
          placeholder="동네 이름을 입력해보세요 (예: 역삼동, 합정)"
          autocomplete="off"
        />
        <div id="location-suggestions" class="suggestions hidden"></div>
      </div>
    </div>

    <div id="location-result" class="location-result hidden">
      <p id="location-display"></p>
      <button class="btn-primary" id="btn-location-confirm">이 위치로 할게요! ✨</button>
    </div>
  </div>
</div>
```

- [ ] **Step 2: style.css — 위치 관련 스타일 추가**

```css
/* === Q1: Location === */
.question-hint {
  font-size: 14px;
  color: #999;
  line-height: 1.5;
  margin-bottom: 32px;
}

.location-methods {
  width: 100%;
}

.location-btn {
  width: 100%;
  background: white;
  border: 2px solid #E5E5E5;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: border-color 0.2s;
}

.location-btn:active {
  border-color: #35C5F0;
}

.location-btn-icon {
  font-size: 32px;
}

.location-btn-text {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.location-btn-sub {
  font-size: 13px;
  color: #999;
}

.location-divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: #CCC;
  font-size: 13px;
}

.location-divider::before,
.location-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #E5E5E5;
}

.location-divider span {
  padding: 0 12px;
}

.location-search {
  position: relative;
}

.location-search input {
  width: 100%;
  padding: 16px;
  border: 2px solid #E5E5E5;
  border-radius: 12px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
}

.location-search input:focus {
  border-color: #35C5F0;
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E5E5E5;
  border-radius: 8px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 20;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.suggestion-item {
  padding: 12px 16px;
  cursor: pointer;
  font-size: 15px;
  border-bottom: 1px solid #F5F5F5;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:active {
  background: #F0FBFF;
}

.location-result {
  margin-top: 24px;
  text-align: center;
}

.location-result p {
  font-size: 18px;
  font-weight: 600;
  color: #35C5F0;
  margin-bottom: 16px;
}
```

- [ ] **Step 3: app.js — GPS + 동네 검색 로직 추가**

`app.js` 상단에 지역 데이터 추가, GPS/검색 이벤트 추가:

```javascript
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

// Hide suggestions on outside click
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
```

- [ ] **Step 4: 브라우저에서 Q1 테스트**

Run: 브라우저에서 `index.html` 열기, 시작하기 → Q1
Expected:
1. GPS 버튼 클릭 → 위치 권한 요청 → 동네 표시 → "이 위치로 할게요!" 클릭 → Q2로 이동
2. 검색창에 "역삼" 입력 → "서울 강남구 역삼동" 자동완성 표시 → 클릭 → 위치 확인 → Q2로 이동
3. 전체 Q1~Q5 흐름이 끝까지 작동

- [ ] **Step 5: 커밋**

```bash
git add index.html style.css app.js
git commit -m "feat: Q1 위치 질문 (GPS + 동네 검색)"
```

---

### Task 4: 풍수 유형 데이터 + 매핑 로직

**Files:**
- Create: `data.js` (12개 유형 정의, 매핑 테이블, 풍수 해설, 개선 팁)

- [ ] **Step 1: data.js 생성 — 12가지 풍수 유형 정의**

```javascript
// === 12 Feng Shui Types ===
const FENGSHUI_TYPES = {
  sunrise: {
    id: 'sunrise',
    emoji: '🌅',
    name: '떠오르는 태양의 집',
    keywords: ['활력', '시작', '성장'],
    summary: '새로운 시작의 에너지가 가득한 공간이에요!',
    energy: { vitality: 85, stability: 55, abundance: 65 },
    tips: [
      '현관에 작은 초록 식물을 두면 들어오는 기운이 한층 맑아질 거예요 🌿',
      '아침 햇살이 닿는 곳에 밝은 색 소품을 놓으면 활력이 더 올라가요 ☀️',
    ],
  },
  water: {
    id: 'water',
    emoji: '🌊',
    name: '흐르는 물의 집',
    keywords: ['유연함', '풍요', '소통'],
    summary: '풍요와 소통의 기운이 자연스럽게 흐르는 공간이에요!',
    energy: { vitality: 60, stability: 65, abundance: 85 },
    tips: [
      '거실에 둥근 형태의 소품을 두면 기운의 흐름이 더 부드러워져요 🫧',
      '물과 관련된 그림이나 사진을 걸면 풍요의 에너지가 강해져요 💧',
    ],
  },
  mountain: {
    id: 'mountain',
    emoji: '🏔️',
    name: '단단한 산의 집',
    keywords: ['안정', '신뢰', '보호'],
    summary: '가족을 든든하게 감싸는 안정의 기운이 있는 공간이에요!',
    energy: { vitality: 55, stability: 90, abundance: 70 },
    tips: [
      '거실에 무거운 느낌의 도자기나 돌 소품을 놓으면 안정감이 더해져요 🪨',
      '따뜻한 색감의 러그를 깔면 보호의 기운이 한층 강해져요 🧡',
    ],
  },
  moon: {
    id: 'moon',
    emoji: '🌙',
    name: '고요한 달의 집',
    keywords: ['평온', '직관', '회복'],
    summary: '마음을 고요하게 채워주는 회복의 공간이에요!',
    energy: { vitality: 45, stability: 80, abundance: 60 },
    tips: [
      '은은한 간접 조명을 활용하면 공간의 치유 에너지가 올라가요 🕯️',
      '라벤더나 유칼립투스 같은 향이 있으면 회복의 기운이 더 깊어져요 🌿',
    ],
  },
  fire: {
    id: 'fire',
    emoji: '🔥',
    name: '타오르는 불꽃의 집',
    keywords: ['열정', '창의', '에너지'],
    summary: '창의와 열정이 불꽃처럼 피어나는 공간이에요!',
    energy: { vitality: 90, stability: 45, abundance: 60 },
    tips: [
      '붉은 계열의 포인트 소품을 하나 두면 창의 에너지가 더 강해져요 🎨',
      '작업 공간 근처에 식물을 두면 불꽃의 기운이 안정적으로 타올라요 🌱',
    ],
  },
  forest: {
    id: 'forest',
    emoji: '🌳',
    name: '깊은 숲의 집',
    keywords: ['치유', '성찰', '재생'],
    summary: '자연의 치유 에너지가 깊이 스며든 공간이에요!',
    energy: { vitality: 60, stability: 75, abundance: 65 },
    tips: [
      '반려 식물을 한 그루 더 들이면 숲의 기운이 더 풍성해져요 🪴',
      '나무 소재 가구나 소품을 활용하면 자연의 에너지가 강해져요 🪵',
    ],
  },
  wind: {
    id: 'wind',
    emoji: '💨',
    name: '바람길의 집',
    keywords: ['변화', '자유', '모험'],
    summary: '새로운 가능성의 바람이 불어오는 공간이에요!',
    energy: { vitality: 75, stability: 40, abundance: 70 },
    tips: [
      '창가에 바람에 살랑이는 커튼을 두면 기운의 순환이 좋아져요 🌬️',
      '모빌이나 윈드차임 같은 소품이 자유의 에너지를 더해줘요 🎐',
    ],
  },
  fertile: {
    id: 'fertile',
    emoji: '🌾',
    name: '옥토의 집',
    keywords: ['풍요', '결실', '나눔'],
    summary: '심은 것이 풍성하게 열매 맺는 풍요의 공간이에요!',
    energy: { vitality: 70, stability: 75, abundance: 90 },
    tips: [
      '식탁 위에 과일이나 꽃을 두면 풍요의 기운이 더 넘쳐요 🍎',
      '따뜻한 조명 아래 가족이 모이는 공간을 만들면 결실의 에너지가 강해져요 💛',
    ],
  },
  star: {
    id: 'star',
    emoji: '⭐',
    name: '별빛의 집',
    keywords: ['영감', '꿈', '가능성'],
    summary: '밤하늘의 별처럼 무한한 가능성이 빛나는 공간이에요!',
    energy: { vitality: 70, stability: 50, abundance: 75 },
    tips: [
      '창밖이 보이는 곳에 작은 책상을 두면 영감이 더 잘 떠올라요 📖',
      '반짝이는 소재의 소품이 별빛 에너지를 증폭시켜요 ✨',
    ],
  },
  mist: {
    id: 'mist',
    emoji: '🌫️',
    name: '새벽안개의 집',
    keywords: ['신비', '직관', '잠재력'],
    summary: '아직 드러나지 않은 잠재력이 깊이 숨쉬는 공간이에요!',
    energy: { vitality: 50, stability: 70, abundance: 65 },
    tips: [
      '은은한 블루 계열의 소품을 두면 직관의 에너지가 깨어나요 💙',
      '명상이나 요가를 할 수 있는 작은 코너를 만들어보세요 🧘',
    ],
  },
  stone: {
    id: 'stone',
    emoji: '🪨',
    name: '돌다리의 집',
    keywords: ['견고', '인내', '성실'],
    summary: '흔들리지 않는 견고한 기반의 공간이에요!',
    energy: { vitality: 55, stability: 90, abundance: 60 },
    tips: [
      '현관에 무거운 느낌의 소품을 하나 두면 안정의 기운이 더 단단해져요 ⚓',
      '따뜻한 톤의 조명을 더하면 견고함 속에 온기가 생겨요 🔆',
    ],
  },
  spring: {
    id: 'spring',
    emoji: '🌸',
    name: '봄바람의 집',
    keywords: ['새로움', '희망', '설렘'],
    summary: '봄바람처럼 설레는 새로운 에너지가 가득한 공간이에요!',
    energy: { vitality: 80, stability: 50, abundance: 70 },
    tips: [
      '생화나 꽃 그림을 두면 봄의 기운이 한층 살아나요 🌷',
      '밝고 가벼운 패브릭 소품이 설렘의 에너지를 더해줘요 🎀',
    ],
  },
};

// === Direction Explanations (풍수 해설) ===
const DIRECTION_EXPLANATIONS = {
  east: '☀️ 동향 — 풍수에서 동쪽은 \'새로운 시작\'을 뜻하는 방위예요. 아침 해가 가장 먼저 드는 이 방향은 성장과 활력의 기운을 품고 있어요.',
  west: '🌇 서향 — 풍수에서 서쪽은 \'결실과 완성\'의 방위예요. 노을빛이 드는 이 방향은 수확과 풍요의 에너지를 지니고 있어요.',
  south: '☀️ 남향 — 풍수에서 남쪽은 \'명예와 열정\'의 방위예요. 하루종일 따뜻한 빛이 드는 이 방향은 활발한 에너지를 가져다줘요.',
  north: '🌙 북향 — 풍수에서 북쪽은 \'지혜와 고요\'의 방위예요. 차분한 빛이 드는 이 방향은 깊은 사색과 회복의 기운을 품고 있어요.',
  unknown: '🧭 방향을 정확히 모르더라도 괜찮아요. 공간 자체가 가진 기운이 있으니까요!',
};

const FLOOR_EXPLANATIONS = {
  low: '🌱 저층 — 땅과 가까울수록 대지의 안정된 에너지를 직접 받아요. 풍수에서는 \'기가 뿌리내리기 좋은 위치\'라고 해요.',
  mid: '☁️ 중층 — 땅의 안정감과 하늘의 개방감이 균형을 이루는 위치예요. 풍수에서는 \'기가 머무르기 좋은 높이\'라고 해요.',
  high: '🌤️ 고층 — 높은 곳일수록 하늘의 기운을 가까이 받아요. 풍수에서는 \'시야가 트인 곳에 큰 기운이 모인다\'고 해요.',
  sky: '✨ 초고층 — 하늘과 가장 가까운 위치에서 광활한 기운을 받고 있어요. 전통 풍수에서 \'용이 하늘을 나는 형국\'으로 봐요.',
  unknown: '🏠 층수를 정확히 모르더라도, 공간의 기운은 층수만으로 결정되지 않아요!',
};

const HOUSE_EXPLANATIONS = {
  apartment: '🏢 아파트 — 많은 사람의 에너지가 모인 공간이에요. 풍수에서는 여러 세대의 기운이 모여 활기찬 에너지장을 만든다고 해요.',
  villa: '🏘️ 빌라·다세대 — 적당한 규모의 커뮤니티 에너지를 가진 공간이에요. 이웃과 적절한 거리감이 균형 잡힌 기운을 만들어요.',
  house: '🏡 단독주택 — 독립된 공간만의 고유한 기운이 있어요. 풍수에서는 대지의 에너지를 온전히 받는 형태로 봐요.',
  officetel: '🏙️ 오피스텔 — 일과 생활이 만나는 공간이에요. 두 가지 에너지가 어우러져 독특한 기운의 흐름을 만들어요.',
  oneroom: '🚪 원룸 — 하나의 공간에 에너지가 집중되어 있어요. 풍수에서는 기운이 응축된 형태로, 효율적인 에너지 흐름을 가져요.',
};

const COMPANION_EXPLANATIONS = {
  alone: '🧘 혼자 — 한 사람의 기운이 공간을 온전히 채우고 있어요. 자기 자신에게 집중하는 에너지가 강해요.',
  partner: '💑 둘이서 — 두 사람의 에너지가 만나 공간의 기운이 활발하게 순환돼요.',
  family: '👨‍👩‍👧‍👦 가족과 함께 — 다양한 세대의 기운이 어우러져 풍성한 에너지장을 만들어요.',
  roommate: '👯 룸메이트와 함께 — 서로 다른 에너지가 만나 새로운 가능성의 기운을 만들어요.',
  pet: '🐾 반려동물과 함께 — 동물의 자연스러운 에너지가 공간의 기운을 정화시켜줘요.',
};

// === Type Mapping Logic ===
// Primary mapping: direction + floor → base type
// Secondary factors: houseType, companion → energy adjustments
const TYPE_MAPPING = {
  // direction + floor combinations → type id
  'east_low': 'spring',
  'east_mid': 'sunrise',
  'east_high': 'wind',
  'east_sky': 'star',
  'east_unknown': 'sunrise',

  'west_low': 'stone',
  'west_mid': 'fertile',
  'west_high': 'star',
  'west_sky': 'wind',
  'west_unknown': 'fertile',

  'south_low': 'fertile',
  'south_mid': 'fire',
  'south_high': 'fire',
  'south_sky': 'star',
  'south_unknown': 'fire',

  'north_low': 'mist',
  'north_mid': 'mist',
  'north_high': 'moon',
  'north_sky': 'moon',
  'north_unknown': 'moon',

  'unknown_low': 'stone',
  'unknown_mid': 'water',
  'unknown_high': 'wind',
  'unknown_sky': 'star',
  'unknown_unknown': 'water',
};

// House type overrides — specific combinations that override the base mapping
const HOUSE_OVERRIDES = {
  'house_family': 'mountain',      // 단독주택 + 가족 → 단단한 산의 집
  'house_pet': 'forest',           // 단독주택 + 반려동물 → 깊은 숲의 집
  'oneroom_alone': 'moon',         // 원룸 + 1인 → 고요한 달의 집
};

// Companion energy modifiers
const COMPANION_MODIFIERS = {
  alone:    { vitality: -5, stability: +10, abundance: -5 },
  partner:  { vitality: +5, stability: +5, abundance: +5 },
  family:   { vitality: +5, stability: +10, abundance: +10 },
  roommate: { vitality: +10, stability: -5, abundance: +5 },
  pet:      { vitality: +5, stability: +5, abundance: 0 },
};

/**
 * Determine feng shui type from answers.
 * @param {Object} answers - { location, houseType, floor, direction, companion }
 * @returns {{ type: Object, energy: Object, explanations: string[] }}
 */
function calculateResult(answers) {
  // 1. Base type from direction + floor
  const mapKey = `${answers.direction}_${answers.floor}`;
  let typeId = TYPE_MAPPING[mapKey] || 'water';

  // 2. Check house + companion overrides
  const primaryCompanion = answers.companion[0] || 'alone';
  const overrideKey = `${answers.houseType}_${primaryCompanion}`;
  if (HOUSE_OVERRIDES[overrideKey]) {
    typeId = HOUSE_OVERRIDES[overrideKey];
  }

  const type = FENGSHUI_TYPES[typeId];

  // 3. Calculate energy with companion modifiers
  const energy = { ...type.energy };
  answers.companion.forEach(c => {
    const mod = COMPANION_MODIFIERS[c];
    if (mod) {
      energy.vitality = Math.min(100, Math.max(0, energy.vitality + mod.vitality));
      energy.stability = Math.min(100, Math.max(0, energy.stability + mod.stability));
      energy.abundance = Math.min(100, Math.max(0, energy.abundance + mod.abundance));
    }
  });

  // 4. Build explanations
  const explanations = [
    DIRECTION_EXPLANATIONS[answers.direction],
    FLOOR_EXPLANATIONS[answers.floor],
    HOUSE_EXPLANATIONS[answers.houseType],
    ...answers.companion.map(c => COMPANION_EXPLANATIONS[c]),
  ];

  return { type, energy, explanations };
}
```

- [ ] **Step 2: 브라우저 콘솔에서 매핑 테스트**

Run: 브라우저 콘솔에서 실행

```javascript
// Test 1: 동향 + 중층 → 떠오르는 태양의 집
console.log(calculateResult({
  location: { name: '서울 마포구 합정동' },
  houseType: 'apartment', floor: 'mid', direction: 'east', companion: ['partner']
}).type.name);
// Expected: "떠오르는 태양의 집"

// Test 2: 단독주택 + 가족 → 단단한 산의 집 (override)
console.log(calculateResult({
  location: { name: '경기 용인시 수지구' },
  houseType: 'house', floor: 'low', direction: 'south', companion: ['family']
}).type.name);
// Expected: "단단한 산의 집"

// Test 3: 북향 + 1인 → 고요한 달의 집
console.log(calculateResult({
  location: { name: '서울 관악구 신림동' },
  houseType: 'oneroom', floor: 'mid', direction: 'north', companion: ['alone']
}).type.name);
// Expected: "고요한 달의 집"
```

- [ ] **Step 3: 커밋**

```bash
git add data.js
git commit -m "feat: 12가지 풍수 유형 데이터 + 매핑 로직 + 풍수 해설"
```

---

### Task 5: 결과 화면 렌더링

**Files:**
- Modify: `app.js` (`showResult` 함수 구현)
- Modify: `style.css` (결과 화면 스타일)

- [ ] **Step 1: app.js — showResult 함수 구현**

기존 `showResult` placeholder를 교체:

```javascript
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

    <div class="share-section">
      <button class="share-btn" id="btn-save-image">📸 결과 카드 저장하기</button>
      <button class="share-btn" id="btn-copy-link">🔗 나도 해보기 링크 복사</button>
      <button class="btn-primary" id="btn-retry">🔮 다시 해보기</button>
    </div>
  `;

  // Store type id for share URL
  resultEl.dataset.typeId = type.id;

  goToScreen('screen-result');

  // Animate energy bars after screen transition
  setTimeout(() => {
    resultEl.querySelectorAll('.energy-fill').forEach(bar => {
      bar.style.transition = 'width 1s ease';
    });
  }, 400);

  // Bind share buttons (implemented in Task 6)
  bindShareButtons();
}
```

- [ ] **Step 2: style.css — 결과 화면 스타일**

```css
/* === Result Screen === */
#screen-result {
  padding: 24px 20px 40px;
  justify-content: flex-start;
}

.result-content {
  width: 100%;
  background: white;
  border-radius: 20px;
  padding: 32px 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

.result-header {
  text-align: center;
  margin-bottom: 32px;
}

.result-label {
  font-size: 16px;
  color: #999;
  margin-bottom: 12px;
}

.result-emoji {
  font-size: 72px;
  margin-bottom: 16px;
}

.result-name {
  font-size: 26px;
  font-weight: 700;
  color: #222;
  margin-bottom: 12px;
}

.result-summary {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 16px;
}

.result-keywords {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.keyword {
  background: #F0FBFF;
  color: #35C5F0;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

/* === Result Sections === */
.result-section {
  margin-top: 28px;
  padding-top: 28px;
  border-top: 1px solid #F0F0F0;
}

.result-section h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

/* Explanations */
.explanation {
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 12px;
  padding-left: 4px;
}

/* Energy Bars */
.energy-bars {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.energy-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.energy-label {
  font-size: 15px;
  font-weight: 500;
  color: #555;
  width: 36px;
}

.energy-bar {
  flex: 1;
  height: 12px;
  background: #F0F0F0;
  border-radius: 6px;
  overflow: hidden;
}

.energy-fill {
  height: 100%;
  background: linear-gradient(90deg, #35C5F0, #7BE0FF);
  border-radius: 6px;
  width: 0;
  transition: width 0s;
}

.energy-value {
  font-size: 14px;
  font-weight: 600;
  color: #35C5F0;
  width: 40px;
  text-align: right;
}

/* Tips */
.tip {
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 12px;
  padding: 12px 16px;
  background: #FAFFF5;
  border-radius: 12px;
}

/* === Share Section === */
.share-section {
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.share-btn {
  width: 100%;
  padding: 14px;
  border: 2px solid #E5E5E5;
  border-radius: 12px;
  background: white;
  font-size: 16px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.share-btn:active {
  border-color: #35C5F0;
}

#btn-retry {
  margin-top: 8px;
}
```

- [ ] **Step 3: 브라우저에서 전체 흐름 테스트**

Run: 브라우저에서 전체 흐름 (인트로 → Q1~Q5 → 로딩 → 결과) 실행
Expected:
1. 유형 타이틀 + 이모지 + 요약이 표시됨
2. "어떻게 읽었냐면요" 풍수 해설이 입력 항목별로 표시됨
3. 에너지 바가 애니메이션과 함께 채워짐
4. 개선 팁이 부드러운 배경 카드 안에 표시됨
5. 하단에 공유 버튼들이 표시됨

- [ ] **Step 4: 커밋**

```bash
git add app.js style.css
git commit -m "feat: 결과 화면 렌더링 (유형/해설/에너지/팁)"
```

---

### Task 6: 공유 기능 (이미지 저장 + URL 공유 + 다시하기)

**Files:**
- Modify: `index.html` (html2canvas CDN 추가)
- Modify: `app.js` (공유 기능 구현)

- [ ] **Step 1: index.html — html2canvas CDN 추가**

`</body>` 직전, `<script src="data.js">` 앞에 추가:

```html
<script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
```

- [ ] **Step 2: app.js — bindShareButtons 함수 구현**

```javascript
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
      // Fallback: 입력필드로 복사
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
    // Reset answers
    answers.location = null;
    answers.houseType = null;
    answers.floor = null;
    answers.direction = null;
    answers.companion = [];

    // Reset UI
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    document.getElementById('btn-q5-next').classList.add('hidden');
    document.getElementById('location-result').classList.add('hidden');
    document.getElementById('location-input').value = '';
    document.querySelector('#btn-gps .location-btn-text').textContent = '현재 위치로 찾기';

    goToScreen('screen-intro');
  });
}
```

- [ ] **Step 3: app.js — URL 파라미터로 결과 직접 표시 (공유 링크 수신)**

`app.js` 맨 하단에 추가:

```javascript
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

    // Show result directly
    document.getElementById('screen-intro').classList.remove('active');
    resultEl.classList.add('active');

    setTimeout(() => {
      resultEl.querySelectorAll('.energy-fill').forEach(bar => {
        bar.style.transition = 'width 1s ease';
      });
    }, 400);
  }
})();
```

- [ ] **Step 4: 브라우저에서 공유 기능 테스트**

테스트:
1. 전체 흐름 완료 → "결과 카드 저장하기" 클릭 → PNG 파일 다운로드 확인
2. "나도 해보기 링크 복사" 클릭 → 클립보드에 `?type=xxx` 포함 URL 복사 확인
3. 복사된 URL을 새 탭에서 열기 → "친구의 집은..." 결과가 바로 표시, "나도 우리 집 풍수 보기!" 버튼 확인
4. "다시 해보기" 클릭 → 인트로로 돌아가고 모든 상태 초기화 확인

- [ ] **Step 5: 커밋**

```bash
git add index.html app.js
git commit -m "feat: 공유 기능 (이미지 저장 + URL 공유 + 다시하기)"
```

---

### Task 7: 반응형 디자인 + 마무리 폴리시

**Files:**
- Modify: `style.css` (반응형, 스크롤, 접근성)
- Modify: `index.html` (meta 태그 보강)

- [ ] **Step 1: index.html — Open Graph 메타 태그 추가**

`<head>` 안에 추가:

```html
<meta name="description" content="탭 몇 번이면 끝! 풍수로 읽어보는 우리 집 에너지">
<meta property="og:title" content="🔮 우리 집 풍수 보기">
<meta property="og:description" content="탭 몇 번이면 끝! 풍수로 읽어보는 우리 집 에너지">
<meta property="og:type" content="website">
```

- [ ] **Step 2: style.css — 반응형 + 접근성 스타일 추가**

```css
/* === Responsive: Desktop === */
@media (min-width: 481px) {
  body {
    background: #F0F0F0;
  }

  #app {
    background: #FAFAFA;
    box-shadow: 0 0 20px rgba(0,0,0,0.08);
  }
}

/* === Scrollable Result Screen === */
#screen-result {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* === Accessibility === */
.option-btn:focus-visible,
.btn-primary:focus-visible,
.share-btn:focus-visible {
  outline: 3px solid #35C5F0;
  outline-offset: 2px;
}

/* === Toast Notification (for copy feedback) === */
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 100;
}

.toast.show {
  opacity: 1;
}

/* === Safe Area (노치 대응) === */
@supports (padding-top: env(safe-area-inset-top)) {
  #progress-bar {
    padding-top: calc(16px + env(safe-area-inset-top));
  }

  .share-section {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
```

- [ ] **Step 3: 최종 브라우저 테스트**

테스트 체크리스트:
1. 모바일 뷰포트 (375px) — 전체 흐름 정상 작동, 버튼 터치 영역 충분
2. 데스크톱 뷰포트 (1024px) — 480px 중앙 정렬, 배경 구분
3. 결과 화면이 길어도 스크롤 가능
4. GPS 거부 시 에러 메시지 정상 표시
5. 공유 URL로 직접 접속 시 결과 화면 정상 표시
6. "다시 해보기" 후 전체 흐름 재시작 정상

- [ ] **Step 4: 커밋**

```bash
git add index.html style.css
git commit -m "feat: 반응형 디자인 + OG 메타 태그 + 접근성 마무리"
```

---

## 구현 순서 요약

| Task | 내용 | 산출물 |
|------|------|--------|
| 1 | HTML 구조 + 인트로 화면 | index.html, style.css |
| 2 | 질문 카드 UI + 흐름 엔진 | Q2~Q5 HTML, app.js |
| 3 | Q1 위치 (GPS + 검색) | Q1 HTML/CSS/JS |
| 4 | 풍수 유형 데이터 + 매핑 | data.js |
| 5 | 결과 화면 렌더링 | 결과 HTML/CSS/JS |
| 6 | 공유 기능 | 이미지/URL/다시하기 |
| 7 | 반응형 + 마무리 | OG태그, 접근성, 반응형 |
