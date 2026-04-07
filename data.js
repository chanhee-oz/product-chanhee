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
// productUrl은 store.ohou.se/goods/{id} 형식
// TODO: 각 풍수 유형에 맞는 실제 상품으로 개별 교체 예정 (현재는 데모용 2개 상품 공통 적용)
const DEMO_PRODUCTS = [
  {
    name: '생화같은 튤립 조화 10P 화병 세트',
    price: '9,900원',
    image: 'https://image.ohou.se/image/central_crop/bucketplace-v2-development/uploads-productions-164747533706495163.jpg/2560/2560',
    productUrl: 'https://store.ohou.se/goods/277476',
    story: '공간에 생기를 불어넣는 튤립이 풍수 에너지를 한층 밝게 만들어요',
  },
  {
    name: '브렐로 LED 인테리어 무드등 테이블램프',
    price: '44,900원',
    image: 'https://prs.ohousecdn.com/apne2/any/uploads/productions/images/v1-311980547129344.jpg?w=640&h=640&c=c',
    productUrl: 'https://store.ohou.se/goods/3213320',
    story: '은은한 빛이 공간의 기운을 따뜻하게 감싸줘요',
  },
];

const PRODUCT_RECOMMENDATIONS = Object.fromEntries(
  Object.keys(FENGSHUI_TYPES).map(typeId => [typeId, DEMO_PRODUCTS])
);

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
