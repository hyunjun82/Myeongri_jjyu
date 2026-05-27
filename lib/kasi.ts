// KASI(한국천문연구원) 공공데이터 API 클라이언트
// 클라이언트에서 호출 시 Cloudflare Functions /api/saju 를 거침
// (KASI 키를 브라우저에 노출하지 않기 위해)

export interface KasiResponse {
  yearGanji: string;   // 연주 (예: 癸酉)
  monthGanji: string;  // 월건 (예: 戊午)
  dayGanji: string;    // 일주 (예: 庚辰)
  lunYear: string;
  lunMonth: string;
  lunDay: string;
  solYear: string;
  solMonth: string;
  solDay: string;
  isLeap: boolean;
}

export async function fetchSajuFromKasi(input: {
  year: number;
  month: number;
  day: number;
  calendar: "solar" | "lunar";
}): Promise<KasiResponse> {
  const { year, month, day, calendar } = input;
  const params = new URLSearchParams({
    y: String(year),
    m: String(month),
    d: String(day),
    cal: calendar,
  });
  const res = await fetch(`/api/saju?${params.toString()}`);
  if (!res.ok) throw new Error("KASI API request failed");
  return res.json();
}
