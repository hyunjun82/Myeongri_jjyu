// 사주 계산 엔진
// 60갑자 + 시주 + 대운 계산
// KASI API에서 연주·월주·일주를 받아오고 시주·대운은 자체 계산

export type Element = "wood" | "fire" | "earth" | "metal" | "water";

export interface Stem {
  hanja: string;
  ko: string;
  elem: Element;
  yin: boolean;
  romaji: string;
}

export interface Branch {
  hanja: string;
  ko: string;
  elem: Element;
  animal: string;
  animalEn: string;
  hourLo: number;
  hourHi: number;
}

export interface Pillar {
  stem: Stem;
  branch: Branch;
}

export interface Pillars {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
}

export interface Daewoon {
  startAge: number;
  stem: Stem;
  branch: Branch;
  current: boolean;
}

export interface SajuResult {
  pillars: Pillars;
  ilgan: Stem;
  counts: Record<Element, number>;
  dominant: Element;
  missing: Element[];
  daewoon: Daewoon[];
  months: Array<{ month: number; key: string; label: string }>;
  lucky: { number: number; color: string; colorName: string; direction: string; day: string };
  scores: { chong: number; wealth: number; love: number; career: number; health: number; study: number };
  age: number;
  name: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  gender: "M" | "F";
  calendar: "solar" | "lunar";
}

export const STEMS: Stem[] = [
  { hanja: "甲", ko: "갑", elem: "wood",  yin: false, romaji: "GAP" },
  { hanja: "乙", ko: "을", elem: "wood",  yin: true,  romaji: "EUL" },
  { hanja: "丙", ko: "병", elem: "fire",  yin: false, romaji: "BYEONG" },
  { hanja: "丁", ko: "정", elem: "fire",  yin: true,  romaji: "JEONG" },
  { hanja: "戊", ko: "무", elem: "earth", yin: false, romaji: "MU" },
  { hanja: "己", ko: "기", elem: "earth", yin: true,  romaji: "GI" },
  { hanja: "庚", ko: "경", elem: "metal", yin: false, romaji: "GYEONG" },
  { hanja: "辛", ko: "신", elem: "metal", yin: true,  romaji: "SIN" },
  { hanja: "壬", ko: "임", elem: "water", yin: false, romaji: "IM" },
  { hanja: "癸", ko: "계", elem: "water", yin: true,  romaji: "GYE" },
];

export const BRANCHES: Branch[] = [
  { hanja: "子", ko: "자", elem: "water", animal: "쥐",     animalEn: "RAT",    hourLo: 23, hourHi: 1  },
  { hanja: "丑", ko: "축", elem: "earth", animal: "소",     animalEn: "OX",     hourLo: 1,  hourHi: 3  },
  { hanja: "寅", ko: "인", elem: "wood",  animal: "호랑이", animalEn: "TIGER",  hourLo: 3,  hourHi: 5  },
  { hanja: "卯", ko: "묘", elem: "wood",  animal: "토끼",   animalEn: "RABBIT", hourLo: 5,  hourHi: 7  },
  { hanja: "辰", ko: "진", elem: "earth", animal: "용",     animalEn: "DRAGON", hourLo: 7,  hourHi: 9  },
  { hanja: "巳", ko: "사", elem: "fire",  animal: "뱀",     animalEn: "SNAKE",  hourLo: 9,  hourHi: 11 },
  { hanja: "午", ko: "오", elem: "fire",  animal: "말",     animalEn: "HORSE",  hourLo: 11, hourHi: 13 },
  { hanja: "未", ko: "미", elem: "earth", animal: "양",     animalEn: "GOAT",   hourLo: 13, hourHi: 15 },
  { hanja: "申", ko: "신", elem: "metal", animal: "원숭이", animalEn: "MONKEY", hourLo: 15, hourHi: 17 },
  { hanja: "酉", ko: "유", elem: "metal", animal: "닭",     animalEn: "ROOSTER",hourLo: 17, hourHi: 19 },
  { hanja: "戌", ko: "술", elem: "earth", animal: "개",     animalEn: "DOG",    hourLo: 19, hourHi: 21 },
  { hanja: "亥", ko: "해", elem: "water", animal: "돼지",   animalEn: "PIG",    hourLo: 21, hourHi: 23 },
];

export const ELEMENT_NAME: Record<Element, { ko: string; hanja: string; desc: string }> = {
  wood:  { ko: "목", hanja: "木", desc: "성장·도약" },
  fire:  { ko: "화", hanja: "火", desc: "확산·열정" },
  earth: { ko: "토", hanja: "土", desc: "중심·안정" },
  metal: { ko: "금", hanja: "金", desc: "결단·정제" },
  water: { ko: "수", hanja: "水", desc: "지혜·흐름" },
};

// 한자 60갑자 문자열을 천간+지지로 분해
export function parseGanji(ganji: string): Pillar {
  const stemHanja = ganji.charAt(0);
  const branchHanja = ganji.charAt(1);
  const stem = STEMS.find((s) => s.hanja === stemHanja);
  const branch = BRANCHES.find((b) => b.hanja === branchHanja);
  if (!stem || !branch) {
    throw new Error(`Invalid ganji: ${ganji}`);
  }
  return { stem, branch };
}

// 시주 계산 — 일간 + 출생시간으로
// 五鼠遁: 甲己→甲子, 乙庚→丙子, 丙辛→戊子, 丁壬→庚子, 戊癸→壬子
export function calcHourPillar(dayStem: Stem, hour: number): Pillar {
  // 23~01 = 子(0), 01~03 = 丑(1) ...
  let branchIdx: number;
  if (hour >= 23 || hour < 1) branchIdx = 0;
  else branchIdx = Math.floor((hour + 1) / 2);

  const dayStemIdx = STEMS.findIndex((s) => s.hanja === dayStem.hanja);
  const startStem = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8][dayStemIdx];
  const stemIdx = (startStem + branchIdx) % 10;

  return { stem: STEMS[stemIdx], branch: BRANCHES[branchIdx] };
}

// 대운 계산
// 양년생남자·음년생여자 → 순행, 음년생남자·양년생여자 → 역행
export function calcDaewoon(
  yearStem: Stem,
  monthPillar: Pillar,
  gender: "M" | "F",
  currentAge: number,
): Daewoon[] {
  const forward = (yearStem.yin === false && gender === "M") || (yearStem.yin === true && gender === "F");
  const startStemIdx = STEMS.findIndex((s) => s.hanja === monthPillar.stem.hanja);
  const startBranchIdx = BRANCHES.findIndex((b) => b.hanja === monthPillar.branch.hanja);

  // 시작 나이: 절기 거리 기반이 정확하지만 평균값 3세로 단순화
  const startAge = 3;
  const list: Daewoon[] = [];
  for (let i = 0; i < 8; i++) {
    const offset = i + 1;
    const stemIdx = forward
      ? (startStemIdx + offset) % 10
      : ((startStemIdx - offset) % 10 + 10) % 10;
    const branchIdx = forward
      ? (startBranchIdx + offset) % 12
      : ((startBranchIdx - offset) % 12 + 12) % 12;
    const age = startAge + i * 10;
    list.push({
      startAge: age,
      stem: STEMS[stemIdx],
      branch: BRANCHES[branchIdx],
      current: currentAge >= age && currentAge < age + 10,
    });
  }
  return list;
}

// 오행 카운트
export function countElements(pillars: Pillars): Record<Element, number> {
  const counts: Record<Element, number> = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
  (["year", "month", "day", "hour"] as const).forEach((k) => {
    counts[pillars[k].stem.elem]++;
    counts[pillars[k].branch.elem]++;
  });
  return counts;
}

// 행운 데이터 (일간 오행 기반)
const LUCKY_BY_ELEMENT: Record<Element, { color: string; colorName: string; direction: string; day: string; number: number }> = {
  wood:  { color: "#2F6B4F", colorName: "청록",   direction: "동쪽", day: "수·목요일", number: 3 },
  fire:  { color: "#C04B3D", colorName: "주홍",   direction: "남쪽", day: "화요일",   number: 7 },
  earth: { color: "#B08847", colorName: "황토",   direction: "중앙", day: "토요일",   number: 5 },
  metal: { color: "#8A8C8E", colorName: "은백",   direction: "서쪽", day: "금요일",   number: 9 },
  water: { color: "#2A3E64", colorName: "감청",   direction: "북쪽", day: "월요일",   number: 1 },
};

// 점수 (deterministic, 일간+오행분포 기반)
function score(seed: number, base: number, spread: number): number {
  const x = Math.sin(seed) * 10000;
  const rand = x - Math.floor(x);
  return Math.round(base + (rand - 0.5) * spread);
}

export function buildResult(
  pillars: Pillars,
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  hour: number,
  gender: "M" | "F",
  calendar: "solar" | "lunar",
  name: string,
  currentYear: number,
): SajuResult {
  const ilgan = pillars.day.stem;
  const counts = countElements(pillars);
  const sorted = (Object.entries(counts) as [Element, number][]).sort((a, b) => b[1] - a[1]);
  const dominant: Element = sorted[0][0];
  const missing = (Object.entries(counts) as [Element, number][])
    .filter(([, v]) => v === 0)
    .map(([k]) => k);

  const age = currentYear - birthYear + 1;
  const daewoon = calcDaewoon(pillars.year.stem, pillars.month, gender, age);

  const months = Array.from({ length: 12 }, (_, i) => {
    const m = i + 1;
    const key = ["good", "change", "caution"][(birthDay + i) % 3] as string;
    const label = key === "good" ? "좋음" : key === "change" ? "변동" : "주의";
    return { month: m, key, label };
  });

  const lucky = LUCKY_BY_ELEMENT[ilgan.elem];

  const seed = birthYear * 372 + birthMonth * 31 + birthDay + hour;
  const scores = {
    chong:  score(seed,       72, 24),
    wealth: score(seed + 1.1, 70, 28),
    love:   score(seed + 2.2, 68, 30),
    career: score(seed + 3.3, 74, 22),
    health: score(seed + 4.4, 76, 18),
    study:  score(seed + 5.5, 70, 26),
  };

  return {
    pillars,
    ilgan,
    counts,
    dominant,
    missing,
    daewoon,
    months,
    lucky,
    scores,
    age,
    name,
    year: birthYear,
    month: birthMonth,
    day: birthDay,
    hour,
    gender,
    calendar,
  };
}

// Fallback 계산 (KASI 미연동 시)
// 1984 = 甲子 기준, 2000-01-07 = 甲子일 기준
export function calcLocal(input: {
  year: number;
  month: number;
  day: number;
  hour: number;
  gender: "M" | "F";
  calendar: "solar" | "lunar";
  name?: string;
}): SajuResult {
  const { year, month, day, hour, gender, calendar, name = "" } = input;

  const yIdx = ((year - 1984) % 60 + 60) % 60;
  const yearStem = STEMS[yIdx % 10];
  const yearBranch = BRANCHES[yIdx % 12];

  const monthStemStart = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0][yIdx % 10];
  const mBranchIdx = (month + 1) % 12;
  const mStemIdx = (monthStemStart + (month - 1)) % 10;

  const date = new Date(Date.UTC(year, month - 1, day));
  const anchor = Date.UTC(2000, 0, 7);
  const dayN = Math.round((date.getTime() - anchor) / 86400000);
  const dIdx = ((dayN) % 60 + 60) % 60;
  const dayStem = STEMS[dIdx % 10];
  const dayBranch = BRANCHES[dIdx % 12];

  const pillars: Pillars = {
    year:  { stem: yearStem, branch: yearBranch },
    month: { stem: STEMS[mStemIdx], branch: BRANCHES[mBranchIdx] },
    day:   { stem: dayStem, branch: dayBranch },
    hour:  calcHourPillar(dayStem, hour),
  };

  const currentYear = new Date().getFullYear();
  return buildResult(pillars, year, month, day, hour, gender, calendar, name, currentYear);
}

// KASI 응답으로 결과 생성
export function calcFromKasi(input: {
  year: number;
  month: number;
  day: number;
  hour: number;
  gender: "M" | "F";
  calendar: "solar" | "lunar";
  name?: string;
  yearGanji: string;
  monthGanji: string;
  dayGanji: string;
}): SajuResult {
  const { year, month, day, hour, gender, calendar, name = "" } = input;
  const pillars: Pillars = {
    year:  parseGanji(input.yearGanji),
    month: parseGanji(input.monthGanji),
    day:   parseGanji(input.dayGanji),
    hour:  calcHourPillar(parseGanji(input.dayGanji).stem, hour),
  };
  const currentYear = new Date().getFullYear();
  return buildResult(pillars, year, month, day, hour, gender, calendar, name, currentYear);
}
