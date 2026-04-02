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

// === Show Result (placeholder — completed in Task 5) ===
function showResult() {
  goToScreen('screen-result');
}
