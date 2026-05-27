// 일간(日干) 10개 프로필 + 카테고리별 풀이 텍스트
// 사용자 중심 깔끔한 톤. 단정 표현 피하고 "경향이 있어요" 위주.

import type { Element } from "../saju";

export interface IlganProfile {
  ko: string;
  hanja: string;
  elem: Element;
  yin: boolean;
  symbol: string;
  core: string;
  keywords: string[];
  strength: string;
  weakness: string;
  bestField: string;
}

export const ILGAN: Record<string, IlganProfile> = {
  "갑": { ko: "갑", hanja: "甲", elem: "wood", yin: false,
    symbol: "우뚝 솟은 큰 나무",
    core: "곧고 진취적이며 처음을 여는 기운",
    keywords: ["리더십", "추진력", "정의감", "개척"],
    strength: "한번 결심하면 끝까지 밀어붙이는 의지가 있어요",
    weakness: "타협이 어려워 관계에서 부러질 수 있어요",
    bestField: "창업·기획·언론·정치",
  },
  "을": { ko: "을", hanja: "乙", elem: "wood", yin: true,
    symbol: "덩굴과 들풀",
    core: "유연하고 끈질긴 적응력",
    keywords: ["유연성", "협력", "인내", "조율"],
    strength: "어떤 환경에서도 살아남는 적응력과 인맥 형성 능력이 좋아요",
    weakness: "주변에 휘둘려 본인 색을 잃기 쉬워요",
    bestField: "외교·디자인·서비스·인사",
  },
  "병": { ko: "병", hanja: "丙", elem: "fire", yin: false,
    symbol: "한낮의 태양",
    core: "밝고 외향적이며 사방을 비추는 기운",
    keywords: ["열정", "표현력", "영향력", "정직"],
    strength: "타고난 카리스마와 자신을 드러내는 능력이 강해요",
    weakness: "감정 기복이 크고 한 번 식으면 빨리 꺼져요",
    bestField: "방송·강연·세일즈·교육",
  },
  "정": { ko: "정", hanja: "丁", elem: "fire", yin: true,
    symbol: "촛불과 별빛",
    core: "은은하고 깊이 있는 열정",
    keywords: ["섬세함", "직관", "예술성", "헌신"],
    strength: "조용히 빛나는 진정성이 사람을 끌어들여요",
    weakness: "혼자 끙끙 앓는 경향이 있어요",
    bestField: "예술·연구·상담·종교",
  },
  "무": { ko: "무", hanja: "戊", elem: "earth", yin: false,
    symbol: "넓은 들과 큰 산",
    core: "묵직하고 변하지 않는 안정감",
    keywords: ["신뢰", "포용", "중재", "끈기"],
    strength: "주변 사람들이 안심하고 기댈 수 있는 든든함이 있어요",
    weakness: "변화에 둔감하고 결정이 느릴 수 있어요",
    bestField: "공무·금융·부동산·경영",
  },
  "기": { ko: "기", hanja: "己", elem: "earth", yin: true,
    symbol: "기름진 논밭",
    core: "조용하고 살뜰한 양육의 기운",
    keywords: ["배려", "꼼꼼함", "실용", "겸손"],
    strength: "디테일을 챙기는 능력과 사람을 돌보는 마음이 좋아요",
    weakness: "지나치게 신중해서 기회를 놓치기 쉬워요",
    bestField: "교육·보건·회계·요식업",
  },
  "경": { ko: "경", hanja: "庚", elem: "metal", yin: false,
    symbol: "잘 벼린 칼과 도끼",
    core: "결단력과 단호함의 기운",
    keywords: ["결단", "정의", "추진", "원칙"],
    strength: "옳다고 판단하면 망설임 없이 실행해요",
    weakness: "융통성이 부족해 부딪힐 수 있어요",
    bestField: "법조·군경·엔지니어링·스포츠",
  },
  "신": { ko: "신", hanja: "辛", elem: "metal", yin: true,
    symbol: "세공된 보석과 장신구",
    core: "예리하고 섬세한 미감",
    keywords: ["완벽주의", "심미안", "분석", "자존심"],
    strength: "남들이 놓치는 디테일을 잡아내는 안목이 있어요",
    weakness: "자기 기준이 높아 스스로를 괴롭히기 쉬워요",
    bestField: "디자인·보석·의료·정밀공학",
  },
  "임": { ko: "임", hanja: "壬", elem: "water", yin: false,
    symbol: "큰 강과 바다",
    core: "넓고 깊은 지혜의 흐름",
    keywords: ["지혜", "포용", "유연", "탐구"],
    strength: "다양한 관점을 받아들이고 큰 그림을 보는 능력이 좋아요",
    weakness: "산만하거나 결단이 늦을 수 있어요",
    bestField: "학자·작가·기획·여행·무역",
  },
  "계": { ko: "계", hanja: "癸", elem: "water", yin: true,
    symbol: "샘물과 비",
    core: "맑고 차분한 지혜",
    keywords: ["감성", "직관", "통찰", "헌신"],
    strength: "타인의 마음을 읽고 조용히 흐름을 바꾸는 힘이 있어요",
    weakness: "감정에 휩쓸리고 우울에 빠지기 쉬워요",
    bestField: "상담·예술·작가·연구·교육",
  },
};

export type CategoryKey = "chong" | "wealth" | "love" | "career" | "health" | "study";

export const CATEGORY_LABEL: Record<CategoryKey, string> = {
  chong: "총운",
  wealth: "재물운",
  love: "애정운",
  career: "직장운",
  health: "건강운",
  study: "학업운",
};

// 카테고리별 풀이 생성 — 일간 프로필 + 오행 분포로 동적 생성
export function buildReading(
  ilganKo: string,
  category: CategoryKey,
  ctx: { dominant: Element; missing: Element[]; age: number },
): { title: string; paragraphs: string[]; keywords: string[] } {
  const p = ILGAN[ilganKo];
  if (!p) {
    return { title: "풀이 준비 중", paragraphs: ["데이터를 불러오는 중입니다."], keywords: [] };
  }

  const elemKo = { wood: "목", fire: "화", earth: "토", metal: "금", water: "수" };

  if (category === "chong") {
    return {
      title: `${p.symbol} — ${p.core}`,
      paragraphs: [
        `당신의 일간은 ${p.hanja} ${p.ko}, ${elemKo[p.elem]}(${ELEMENT_HANJA[p.elem]})의 기운을 타고났어요. ${p.core}으로, ${p.strength}.`,
        `다만 ${p.weakness}. 인생의 큰 줄기에서 이 부분을 의식하면 흐름이 훨씬 부드러워집니다.`,
        ctx.missing.length
          ? `사주에서 ${ctx.missing.map((m) => elemKo[m]).join("·")} 오행이 부족합니다. 색·방향·생활습관으로 보완하면 균형이 잡혀요.`
          : `오행이 비교적 고르게 분포되어 있어 큰 기복 없이 흐름을 탈 수 있어요.`,
        `${p.bestField} 분야에서 두각을 나타낼 가능성이 큽니다.`,
      ],
      keywords: p.keywords,
    };
  }

  if (category === "wealth") {
    return {
      title: "재물의 흐름",
      paragraphs: [
        wealthFirstPara(p),
        wealthMidPara(p, ctx.age),
        wealthAdvice(p, ctx.missing),
      ],
      keywords: wealthKeywords(p),
    };
  }

  if (category === "love") {
    return {
      title: "관계와 사랑",
      paragraphs: [
        loveFirstPara(p),
        loveCompatPara(p),
        loveAdvice(p, ctx.age),
      ],
      keywords: loveKeywords(p),
    };
  }

  if (category === "career") {
    return {
      title: "일과 진로",
      paragraphs: [
        careerFirstPara(p),
        careerMidPara(p, ctx.age),
        careerAdvice(p),
      ],
      keywords: ["성취", ...p.keywords.slice(0, 3)],
    };
  }

  if (category === "health") {
    return {
      title: "몸과 마음",
      paragraphs: [
        healthFirstPara(p),
        healthHabitPara(p),
        healthAdvice(p, ctx.missing),
      ],
      keywords: ["균형", "회복", "리듬", "수면"],
    };
  }

  // study
  return {
    title: "배움의 자세",
    paragraphs: [
      studyFirstPara(p),
      studyTypePara(p),
      studyAdvice(p),
    ],
    keywords: ["집중", "꾸준함", "호기심", "기록"],
  };
}

const ELEMENT_HANJA: Record<Element, string> = {
  wood: "木", fire: "火", earth: "土", metal: "金", water: "水",
};

function wealthFirstPara(p: IlganProfile) {
  const m: Record<Element, string> = {
    wood:  "재물을 모으는 방식이 직진형입니다. 한 분야에 집중해서 큰 흐름을 만들 때 빛을 발해요. 분산투자보다는 잘 아는 분야에 깊게 들어가는 게 맞아요.",
    fire:  "큰돈이 들고 나는 속도가 빠른 편이에요. 벌 때 잘 벌고 쓸 때 호쾌하게 쓰는 성향. 비상금을 별도로 묶어두는 습관이 필요합니다.",
    earth: "꾸준히 쌓아 올리는 재물운입니다. 부동산·예금 같은 장기 자산에서 결실을 보는 경우가 많아요. 급한 투자는 손해로 이어지기 쉽습니다.",
    metal: "원칙이 분명한 재테크에 강해요. 정해진 규칙대로 움직이는 분야(채권·배당·정기예금)에서 안정적으로 자산이 늘어갑니다.",
    water: "흐름을 읽는 감각이 좋아 시기를 잘 타면 큰 수익을 얻을 수 있어요. 다만 너무 많은 정보에 휘둘리지 않도록 자기 기준을 명확히 해야 합니다.",
  };
  return m[p.elem];
}
function wealthMidPara(p: IlganProfile, age: number) {
  if (age < 30) return "20대는 자산보다 경험과 인맥을 쌓는 시기. 작게라도 직접 벌어보는 경험이 30대 이후 재물 흐름의 토대가 됩니다.";
  if (age < 45) return "30~40대 초반은 본업의 전문성이 곧 재물입니다. 부업·투자보다 본업 깊이가 우선되어야 큰 흐름이 만들어져요.";
  if (age < 60) return "40대 후반부터는 자산 분산과 리스크 관리가 핵심. 이미 쌓은 것을 지키는 전략이 새로 버는 것보다 중요합니다.";
  return "60대 이후는 후학과 가족에게 흘려보내는 시기. 잘 흘려보낼수록 더 좋은 형태로 돌아옵니다.";
}
function wealthAdvice(p: IlganProfile, missing: Element[]) {
  if (missing.includes("earth")) return "토(土) 기운이 약해 자산이 흩어지기 쉬워요. 황색·갈색을 가까이 두고 안정적인 자산 비중을 늘리는 것이 도움이 됩니다.";
  if (missing.includes("metal")) return "금(金) 기운이 부족해 결단이 늦어지는 경우가 많아요. 흰색·실버 톤을 활용하고, 정해진 시점에 결단하는 훈련이 필요합니다.";
  return "지금의 흐름은 무리하지 않으면 충분히 좋은 결과로 이어집니다.";
}
function wealthKeywords(p: IlganProfile) {
  return { wood: ["집중", "장기"], fire: ["분배", "비상금"], earth: ["축적", "안정"], metal: ["원칙", "자동"], water: ["감각", "타이밍"] }[p.elem] ?? [];
}

function loveFirstPara(p: IlganProfile) {
  return `사랑할 때 ${p.core}이 그대로 나타나요. ${p.strength}는 관계에서도 큰 매력이지만, ${p.weakness}는 갈등의 씨앗이 되기도 합니다.`;
}
function loveCompatPara(p: IlganProfile) {
  const m: Record<Element, string> = {
    wood:  "당신을 받쳐주는 수(水) 일간(임·계)과 잘 어울려요. 충돌이 잦을 수 있는 금(金) 일간과는 서로의 거리감을 존중해야 합니다.",
    fire:  "기름을 부어주는 목(木) 일간(갑·을)과 잘 통해요. 같은 화(火) 일간끼리는 처음엔 뜨겁지만 빨리 식을 수 있습니다.",
    earth: "감정을 채워주는 화(火) 일간(병·정)과 좋아요. 같은 토(土) 일간과는 안정적이지만 단조로울 수 있어요.",
    metal: "당신을 단단하게 다듬는 토(土) 일간(무·기)과 잘 맞아요. 화(火) 일간과는 강대강으로 부딪힐 수 있습니다.",
    water: "방향을 잡아주는 금(金) 일간(경·신)과 좋습니다. 토(土) 일간과는 답답함을 느낄 수 있어요.",
  };
  return m[p.elem];
}
function loveAdvice(p: IlganProfile, age: number) {
  if (age < 30) return "20대의 연애는 결과보다 자기 자신을 아는 과정. 깊은 상처도 다음 관계의 자산이 됩니다.";
  if (age < 40) return "30대는 가치관이 맞는 사람과의 관계가 오래 갑니다. 외모·조건보다 일상 리듬이 맞는지가 더 중요해요.";
  return "안정된 관계 속에서도 작은 변화와 새로움을 잃지 않는 게 중요합니다.";
}
function loveKeywords(p: IlganProfile) {
  return { wood: ["직진", "헌신"], fire: ["열정", "표현"], earth: ["안정", "포용"], metal: ["원칙", "신의"], water: ["깊이", "이해"] }[p.elem] ?? [];
}

function careerFirstPara(p: IlganProfile) {
  return `${p.bestField} 분야에서 가장 자연스럽게 발휘됩니다. ${p.core}이 일에서는 ${p.strength}로 나타나요.`;
}
function careerMidPara(p: IlganProfile, age: number) {
  if (age < 30) return "20대는 한 분야에 깊이 들어가는 게 우선. 잦은 이직보다 3년 이상 진득하게 한 자리에서 배운 것이 평생 자산이 됩니다.";
  if (age < 45) return "30~40대 초반은 본인의 분야에서 영향력을 만들어가는 시기. 사람을 이끄는 자리에 점점 가까워집니다.";
  return "40대 중반 이후는 자기 이름을 걸고 일하는 시기. 회사보다 자신의 브랜드와 네트워크가 더 큰 자산이 됩니다.";
}
function careerAdvice(p: IlganProfile) {
  return `${p.weakness} 이 부분을 의식적으로 관리하면 한 단계 더 올라설 수 있어요.`;
}

function healthFirstPara(p: IlganProfile) {
  const organ: Record<Element, string> = {
    wood: "간·담", fire: "심장·소장", earth: "비위·소화기", metal: "폐·대장", water: "신장·방광",
  };
  return `${p.elem === "wood" ? "목" : p.elem === "fire" ? "화" : p.elem === "earth" ? "토" : p.elem === "metal" ? "금" : "수"} 일간은 ${organ[p.elem]} 계통에 약점이 생기기 쉬워요. 평상시 가볍게 챙기는 정도로 충분합니다.`;
}
function healthHabitPara(p: IlganProfile) {
  const m: Record<Element, string> = {
    wood:  "유산소와 스트레칭이 잘 맞아요. 분노·답답함이 쌓이지 않게 정기적인 휴식이 필요합니다.",
    fire:  "지나친 흥분과 늦은 밤 활동을 줄이세요. 심장 부담을 줄이는 명상·호흡이 도움이 됩니다.",
    earth: "과식과 좌식 생활이 가장 큰 적. 매일 30분이라도 걷는 습관이 평생을 좌우합니다.",
    metal: "건조한 환경에 약해요. 물을 충분히 마시고 호흡기 관리에 신경 쓰세요.",
    water: "차가운 음식과 피로 누적에 약합니다. 따뜻한 음식과 규칙적인 수면이 회복의 핵심.",
  };
  return m[p.elem];
}
function healthAdvice(p: IlganProfile, missing: Element[]) {
  if (missing.length === 0) return "오행이 비교적 고른 편이라 큰 무리만 없으면 건강 흐름은 안정적입니다.";
  const elemKo = { wood: "목", fire: "화", earth: "토", metal: "금", water: "수" };
  return `${missing.map((m) => elemKo[m]).join("·")} 기운이 부족해 그쪽 관련 기관이 약할 수 있어요. 색·식습관으로 보완하세요.`;
}

function studyFirstPara(p: IlganProfile) {
  const m: Record<Element, string> = {
    wood:  "큰 그림을 먼저 보고 세부로 내려가는 학습이 맞아요. 목차를 먼저 머리에 넣으세요.",
    fire:  "흥미가 동력입니다. 좋아하는 주제부터 파고들면 깊이 들어가고, 흥미가 없으면 진도가 안 나가요.",
    earth: "꾸준한 반복과 정리가 강점. 노트 정리·복습 사이클이 시험에서 큰 차이를 만듭니다.",
    metal: "정확하고 체계적인 학습에 강해요. 문제 풀이와 오답 노트가 가장 효과적인 방법입니다.",
    water: "넓게 읽고 연결하는 능력이 뛰어나요. 한 분야 깊이보다 여러 분야 연계가 더 잘 맞습니다.",
  };
  return m[p.elem];
}
function studyTypePara(p: IlganProfile) {
  return p.yin
    ? "조용한 환경에서 혼자 깊게 파고드는 스타일이 잘 맞아요."
    : "토론·발표·그룹 학습에서 더 많이 흡수하는 스타일입니다.";
}
function studyAdvice(p: IlganProfile) {
  return `스스로의 리듬을 알면 효율이 두 배로 오릅니다. ${p.weakness} 시험·중요한 결정 앞에서는 특히 의식하세요.`;
}
