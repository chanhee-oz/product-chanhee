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
const TYPE_MAPPING = {
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

const HOUSE_OVERRIDES = {
  'house_family': 'mountain',
  'house_pet': 'forest',
  'oneroom_alone': 'moon',
};

const COMPANION_MODIFIERS = {
  alone:    { vitality: -5, stability: +10, abundance: -5 },
  partner:  { vitality: +5, stability: +5, abundance: +5 },
  family:   { vitality: +5, stability: +10, abundance: +10 },
  roommate: { vitality: +10, stability: -5, abundance: +5 },
  pet:      { vitality: +5, stability: +5, abundance: 0 },
};

// === Product Recommendations per Type ===
const PRODUCT_RECOMMENDATIONS = {
  sunrise: [
    { emoji: '🌿', name: '몬스테라 화분', story: '동쪽의 성장 기운과 초록 식물의 생명력이 만나면, 아침마다 새로운 에너지가 솟아나요', query: '몬스테라' },
    { emoji: '💡', name: '내추럴 스탠드 조명', story: '떠오르는 태양의 집에는 따뜻한 자연광을 닮은 조명이 활력을 더해줘요', query: '스탠드조명' },
    { emoji: '🪴', name: '미니 허브 화분', story: '성장의 기운을 가진 공간에 허브를 두면, 향기로운 에너지가 하루를 깨워줘요', query: '허브화분' },
  ],
  water: [
    { emoji: '🫧', name: '유리 꽃병', story: '흐르는 물의 기운을 담은 투명한 꽃병이 풍요의 에너지를 순환시켜요', query: '유리꽃병' },
    { emoji: '🐚', name: '자개 트레이', story: '물의 기운과 조개의 에너지가 만나 소통과 풍요를 더해줘요', query: '자개트레이' },
    { emoji: '🌊', name: '블루 쿠션', story: '물결을 닮은 블루 톤이 공간의 유연한 기운을 한층 살려줘요', query: '블루쿠션' },
  ],
  mountain: [
    { emoji: '🪨', name: '도자기 오브제', story: '산의 든든한 기운을 닮은 도자기가 공간의 안정감을 더해줘요', query: '도자기오브제' },
    { emoji: '🧡', name: '울 러그', story: '대지의 에너지를 품은 따뜻한 러그가 가족을 보호하는 기운을 강화해요', query: '울러그' },
    { emoji: '🕯️', name: '소이캔들', story: '산의 고요한 기운 속에서 은은한 불빛이 신뢰의 에너지를 밝혀줘요', query: '소이캔들' },
  ],
  moon: [
    { emoji: '🕯️', name: '아로마 캔들', story: '달의 고요한 기운과 은은한 향이 만나 깊은 회복의 시간을 만들어요', query: '아로마캔들' },
    { emoji: '🌙', name: '무드등', story: '달빛을 닮은 부드러운 조명이 평온한 기운을 공간에 채워줘요', query: '무드등' },
    { emoji: '🧘', name: '명상 쿠션', story: '고요한 달의 공간에서 명상 쿠션은 직관의 에너지를 깨워줘요', query: '명상쿠션' },
  ],
  fire: [
    { emoji: '🎨', name: '레드 포인트 쿠션', story: '불꽃의 열정을 담은 붉은 소품이 창의 에너지를 활활 타오르게 해요', query: '레드쿠션' },
    { emoji: '🪴', name: '선인장 화분', story: '불의 기운 속에서도 꿋꿋한 선인장이 열정에 안정감을 더해줘요', query: '선인장화분' },
    { emoji: '💡', name: '데스크 램프', story: '집중의 불꽃을 밝히는 조명이 창작 에너지를 극대화해요', query: '데스크램프' },
  ],
  forest: [
    { emoji: '🪴', name: '행잉 플랜트', story: '숲의 치유 기운을 닮은 늘어지는 식물이 공간을 자연으로 채워줘요', query: '행잉플랜트' },
    { emoji: '🪵', name: '우드 트레이', story: '나무의 에너지가 숲의 집에서 성찰과 재생의 기운을 강화해요', query: '우드트레이' },
    { emoji: '🌿', name: '디퓨저', story: '숲속 향기를 머금은 디퓨저가 치유의 에너지를 깊게 만들어줘요', query: '디퓨저' },
  ],
  wind: [
    { emoji: '🌬️', name: '린넨 커튼', story: '바람에 살랑이는 린넨이 새로운 가능성의 기운을 실어다줘요', query: '린넨커튼' },
    { emoji: '🎐', name: '모빌', story: '바람에 움직이는 모빌이 공간의 자유로운 에너지를 활성화해요', query: '인테리어모빌' },
    { emoji: '🪶', name: '패브릭 포스터', story: '가벼운 패브릭이 바람길의 변화와 모험의 기운을 담아줘요', query: '패브릭포스터' },
  ],
  fertile: [
    { emoji: '🍽️', name: '도자기 그릇 세트', story: '풍요로운 식탁을 완성하는 그릇이 결실과 나눔의 기운을 더해요', query: '도자기그릇세트' },
    { emoji: '💛', name: '펜던트 조명', story: '따뜻한 빛이 모이는 곳에 풍요의 에너지가 배로 커져요', query: '펜던트조명' },
    { emoji: '🌻', name: '화병 + 생화', story: '옥토의 결실을 상징하는 꽃이 풍요로운 기운을 한가득 채워줘요', query: '꽃병' },
  ],
  star: [
    { emoji: '✨', name: '크리스탈 무드등', story: '별빛처럼 반짝이는 크리스탈이 영감과 꿈의 에너지를 증폭시켜요', query: '크리스탈무드등' },
    { emoji: '🪞', name: '벽걸이 거울', story: '빛을 반사하는 거울이 별빛의 무한한 가능성을 공간에 퍼뜨려요', query: '벽걸이거울' },
    { emoji: '📖', name: '북엔드', story: '별빛 아래 책을 펼치는 공간이 영감의 에너지를 모아줘요', query: '북엔드' },
  ],
  mist: [
    { emoji: '💙', name: '블루 오브제', story: '새벽안개의 신비로운 기운을 닮은 블루 톤이 직관을 깨워줘요', query: '블루인테리어소품' },
    { emoji: '🧘', name: '요가 매트', story: '안개 속 고요함과 함께하는 명상이 숨겨진 잠재력을 일깨워요', query: '요가매트' },
    { emoji: '🌫️', name: '가습기', story: '안개처럼 부드러운 수증기가 공간의 잠재 에너지를 촉촉하게 채워줘요', query: '미니가습기' },
  ],
  stone: [
    { emoji: '⚓', name: '스톤 오브제', story: '돌의 견고한 기운을 닮은 소품이 흔들리지 않는 안정감을 줘요', query: '스톤오브제' },
    { emoji: '🔆', name: '테이블 램프', story: '따뜻한 불빛이 견고한 돌의 공간에 온기를 더해줘요', query: '테이블램프' },
    { emoji: '🪴', name: '다육이 화분', story: '돌 틈에서도 자라는 다육이처럼, 인내의 기운이 결실을 맺어요', query: '다육이화분' },
  ],
  spring: [
    { emoji: '🌷', name: '튤립 조화', story: '봄의 설렘을 담은 꽃이 새로운 시작의 에너지를 피워올려요', query: '튤립조화' },
    { emoji: '🎀', name: '파스텔 쿠션', story: '봄바람처럼 가벼운 파스텔 톤이 희망의 기운을 살려줘요', query: '파스텔쿠션' },
    { emoji: '🌸', name: '체리블라썸 디퓨저', story: '벚꽃 향기가 봄의 새로운 에너지를 공간 가득 퍼뜨려줘요', query: '체리블라썸디퓨저' },
  ],
};

function calculateResult(answers) {
  const mapKey = `${answers.direction}_${answers.floor}`;
  let typeId = TYPE_MAPPING[mapKey] || 'water';

  const primaryCompanion = answers.companion[0] || 'alone';
  const overrideKey = `${answers.houseType}_${primaryCompanion}`;
  if (HOUSE_OVERRIDES[overrideKey]) {
    typeId = HOUSE_OVERRIDES[overrideKey];
  }

  const type = FENGSHUI_TYPES[typeId];

  const energy = { ...type.energy };
  answers.companion.forEach(c => {
    const mod = COMPANION_MODIFIERS[c];
    if (mod) {
      energy.vitality = Math.min(100, Math.max(0, energy.vitality + mod.vitality));
      energy.stability = Math.min(100, Math.max(0, energy.stability + mod.stability));
      energy.abundance = Math.min(100, Math.max(0, energy.abundance + mod.abundance));
    }
  });

  const explanations = [
    DIRECTION_EXPLANATIONS[answers.direction],
    FLOOR_EXPLANATIONS[answers.floor],
    HOUSE_EXPLANATIONS[answers.houseType],
    ...answers.companion.map(c => COMPANION_EXPLANATIONS[c]),
  ];

  return { type, energy, explanations };
}
