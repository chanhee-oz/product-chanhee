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
  'apartment_family': 'mountain',
  'villa_family': 'fertile',
};

const COMPANION_MODIFIERS = {
  alone:    { vitality: -5, stability: +10, abundance: -5 },
  partner:  { vitality: +5, stability: +5, abundance: +5 },
  family:   { vitality: +5, stability: +10, abundance: +10 },
  roommate: { vitality: +10, stability: -5, abundance: +5 },
  pet:      { vitality: +5, stability: +5, abundance: 0 },
};

// === Product Recommendations per Type ===
// 오늘의집 검색 URL 기반 — 항상 최신 상품 노출, 품절/이미지 깨짐 없음
// productUrl: ohou.se/search/index?query=... (CLAUDE.md 규칙 준수)
const PRODUCT_RECOMMENDATIONS = {
  sunrise: [
    { name: '미니 그린 식물 화분', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EB%AF%B8%EB%8B%88%ED%99%94%EB%B6%84+%EC%8B%9D%EB%AC%BC&utm_source=fengshui&utm_campaign=sunrise', story: '초록 생기가 아침 에너지를 한층 밝게 만들어요 🌿' },
    { name: '밝은 톤 쿠션·패브릭', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EB%B0%9D%EC%9D%80+%EC%BF%A0%EC%85%98&utm_source=fengshui&utm_campaign=sunrise', story: '밝은 색감이 성장의 기운을 증폭시켜요 ☀️' },
  ],
  water: [
    { name: '유리 화병·플라워 베이스', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EC%9C%A0%EB%A6%AC+%ED%99%94%EB%B3%91&utm_source=fengshui&utm_campaign=water', story: '투명한 유리가 풍요의 기운 흐름을 부드럽게 해요 💧' },
    { name: '라운드 인테리어 소품', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EB%9D%BC%EC%9A%B4%EB%93%9C+%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4&utm_source=fengshui&utm_campaign=water', story: '둥근 형태가 소통과 순환의 에너지를 만들어요 🫧' },
  ],
  mountain: [
    { name: '도자기·세라믹 오브제', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EB%8F%84%EC%9E%90%EA%B8%B0+%EC%98%A4%EB%B8%8C%EC%A0%9C&utm_source=fengshui&utm_campaign=mountain', story: '묵직한 도자기가 안정의 기운을 단단하게 해요 🪨' },
    { name: '따뜻한 톤 거실 러그', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EA%B1%B0%EC%8B%A4+%EB%9F%AC%EA%B7%B8+%EC%9B%9C&utm_source=fengshui&utm_campaign=mountain', story: '따뜻한 러그가 보호의 에너지를 감싸줘요 🧡' },
  ],
  moon: [
    { name: '간접 조명·무드등', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EB%AC%B4%EB%93%9C%EB%93%B1+%EA%B0%84%EC%A0%91%EC%A1%B0%EB%AA%85&utm_source=fengshui&utm_campaign=moon', story: '은은한 빛이 회복의 에너지를 깊게 해요 🕯️' },
    { name: '아로마 디퓨저·캔들', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EB%94%94%ED%93%A8%EC%A0%80+%EC%BA%94%EB%93%A4&utm_source=fengshui&utm_campaign=moon', story: '향이 공간의 치유 기운을 깨워줘요 🌿' },
  ],
  fire: [
    { name: '레드·오렌지 포인트 소품', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EB%A0%88%EB%93%9C+%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4+%EC%86%8C%ED%92%88&utm_source=fengshui&utm_campaign=fire', story: '붉은 색이 창의와 열정의 불꽃을 지펴요 🎨' },
    { name: '아트 포스터·프린트 액자', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EC%95%84%ED%8A%B8+%ED%8F%AC%EC%8A%A4%ED%84%B0+%EC%95%A1%EC%9E%90&utm_source=fengshui&utm_campaign=fire', story: '에너지 넘치는 작품이 영감을 자극해요 🔥' },
  ],
  forest: [
    { name: '반려 식물·플랜테리어', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EB%B0%98%EB%A0%A4%EC%8B%9D%EB%AC%BC+%ED%94%8C%EB%9E%9C%ED%85%8C%EB%A6%AC%EC%96%B4&utm_source=fengshui&utm_campaign=forest', story: '식물이 숲의 치유 에너지를 더 풍성하게 해요 🪴' },
    { name: '우드 소재 인테리어', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EC%9A%B0%EB%93%9C+%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4+%EC%86%8C%ED%92%88&utm_source=fengshui&utm_campaign=forest', story: '나무 소재가 자연의 재생 에너지를 불러와요 🪵' },
  ],
  wind: [
    { name: '쉬어 커튼·린넨 커튼', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EC%89%AC%EC%96%B4%EC%BB%A4%ED%8A%BC+%EB%A6%B0%EB%84%A8&utm_source=fengshui&utm_campaign=wind', story: '바람에 살랑이는 커튼이 기운의 순환을 도와요 🌬️' },
    { name: '모빌·윈드차임', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EB%AA%A8%EB%B9%8C+%EC%9C%88%EB%93%9C%EC%B0%A8%EC%9E%84&utm_source=fengshui&utm_campaign=wind', story: '움직이는 소품이 자유의 에너지를 만들어요 🎐' },
  ],
  fertile: [
    { name: '조화·플라워 데코', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EC%A1%B0%ED%99%94+%ED%94%8C%EB%9D%BC%EC%9B%8C+%EB%8D%B0%EC%BD%94&utm_source=fengshui&utm_campaign=fertile', story: '꽃과 열매가 풍요의 기운을 가득 채워요 🍎' },
    { name: '식탁 조명·펜던트', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EC%8B%9D%ED%83%81+%EC%A1%B0%EB%AA%85+%ED%8E%9C%EB%8D%98%ED%8A%B8&utm_source=fengshui&utm_campaign=fertile', story: '따뜻한 빛 아래 모이는 곳에 결실의 에너지가 쌓여요 💛' },
  ],
  star: [
    { name: '데스크 조명·스탠드', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EB%8D%B0%EC%8A%A4%ED%81%AC+%EC%A1%B0%EB%AA%85+%EC%8A%A4%ED%83%A0%EB%93%9C&utm_source=fengshui&utm_campaign=star', story: '집중의 빛이 영감과 가능성을 비춰줘요 📖' },
    { name: '골드·실버 인테리어 소품', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EA%B3%A8%EB%93%9C+%EC%8B%A4%EB%B2%84+%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4&utm_source=fengshui&utm_campaign=star', story: '반짝이는 소재가 별빛 에너지를 증폭시켜요 ✨' },
  ],
  mist: [
    { name: '블루 계열 인테리어', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EB%B8%94%EB%A3%A8+%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4+%EC%86%8C%ED%92%88&utm_source=fengshui&utm_campaign=mist', story: '블루 톤이 직관의 에너지를 깨워줘요 💙' },
    { name: '요가·명상 용품', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EC%9A%94%EA%B0%80+%EB%AA%85%EC%83%81+%EB%A7%A4%ED%8A%B8&utm_source=fengshui&utm_campaign=mist', story: '고요한 시간이 잠재력을 깨우는 열쇠예요 🧘' },
  ],
  stone: [
    { name: '스톤·마블 오브제', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%EC%8A%A4%ED%86%A4+%EB%A7%88%EB%B8%94+%EC%98%A4%EB%B8%8C%EC%A0%9C&utm_source=fengshui&utm_campaign=stone', story: '무게감 있는 소품이 안정의 기운을 굳건히 해요 ⚓' },
    { name: '따뜻한 톤 테이블 조명', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%ED%85%8C%EC%9D%B4%EB%B8%94+%EC%A1%B0%EB%AA%85+%EC%9B%9C&utm_source=fengshui&utm_campaign=stone', story: '따뜻한 빛이 견고함 속에 온기를 더해요 🔆' },
  ],
  spring: [
    { name: '튤립·벚꽃 조화', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%ED%8A%A4%EB%A6%BD+%EB%B2%9A%EA%BD%83+%EC%A1%B0%ED%99%94&utm_source=fengshui&utm_campaign=spring', story: '꽃이 봄의 설렘 에너지를 한층 살려줘요 🌷' },
    { name: '파스텔 패브릭 소품', price: '인기 상품 보기', productUrl: 'https://ohou.se/search/index?query=%ED%8C%8C%EC%8A%A4%ED%85%94+%EC%BF%A0%EC%85%98+%ED%8C%A8%EB%B8%8C%EB%A6%AD&utm_source=fengshui&utm_campaign=spring', story: '가벼운 패브릭이 새로움의 에너지를 더해요 🎀' },
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
      energy.vitality = Math.min(100, Math.max(50, energy.vitality + mod.vitality));
      energy.stability = Math.min(100, Math.max(50, energy.stability + mod.stability));
      energy.abundance = Math.min(100, Math.max(50, energy.abundance + mod.abundance));
    }
  });

  const explanations = [
    DIRECTION_EXPLANATIONS[answers.direction],
    FLOOR_EXPLANATIONS[answers.floor],
    HOUSE_EXPLANATIONS[answers.houseType],
    ...answers.companion.map(c => COMPANION_EXPLANATIONS[c]),
  ];

  // companion 기반 보조 상품 추천
  const bonusProducts = [];
  if (answers.companion.includes('pet')) {
    bonusProducts.push({
      name: '반려동물 인테리어 용품',
      price: '인기 상품 보기',
      productUrl: 'https://ohou.se/search/index?query=%EB%B0%98%EB%A0%A4%EB%8F%99%EB%AC%BC+%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4&utm_source=fengshui&utm_campaign=' + typeId,
      story: '반려동물과 함께하는 공간의 기운을 더 조화롭게 🐾',
    });
  }
  if (answers.companion.includes('family')) {
    bonusProducts.push({
      name: '안전한 키즈 인테리어',
      price: '인기 상품 보기',
      productUrl: 'https://ohou.se/search/index?query=%ED%82%A4%EC%A6%88+%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4+%EC%95%88%EC%A0%84&utm_source=fengshui&utm_campaign=' + typeId,
      story: '가족이 함께하는 공간을 더 안전하고 따뜻하게 👨‍👩‍👧‍👦',
    });
  }

  return { type, energy, explanations, bonusProducts };
}
