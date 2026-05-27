// Cloudflare Pages Function — KASI API 프록시
// 환경변수 KASI_API_KEY 필요
// 응답은 1년 캐싱 (같은 날짜는 동일 결과)

interface Env {
  KASI_API_KEY: string;
}

interface KasiItem {
  solYear: string;
  solMonth: string;
  solDay: string;
  lunYear: string;
  lunMonth: string;
  lunDay: string;
  lunSecha: string;     // 연주
  lunWolgeon: string;   // 월건
  lunIljin: string;     // 일주
  lunLeapmonth: string;
}

interface KasiApiResponse {
  response: {
    body: {
      items: { item: KasiItem };
      totalCount?: number;
    };
    header: { resultCode: string; resultMsg: string };
  };
}

const pad2 = (n: number | string) => String(n).padStart(2, "0");

export const onRequest: PagesFunction<Env> = async (ctx) => {
  const url = new URL(ctx.request.url);
  const year = url.searchParams.get("y");
  const month = url.searchParams.get("m");
  const day = url.searchParams.get("d");
  const calendar = url.searchParams.get("cal") || "solar";

  if (!year || !month || !day) {
    return new Response(JSON.stringify({ error: "missing parameters" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = ctx.env.KASI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "KASI_API_KEY not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const endpoint =
    calendar === "lunar"
      ? "getSolCalInfo"
      : "getLunCalInfo";

  const kasiUrl = new URL(
    `https://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService/${endpoint}`
  );
  kasiUrl.searchParams.set("ServiceKey", apiKey);
  kasiUrl.searchParams.set(calendar === "lunar" ? "lunYear" : "solYear", year);
  kasiUrl.searchParams.set(calendar === "lunar" ? "lunMonth" : "solMonth", pad2(month));
  kasiUrl.searchParams.set(calendar === "lunar" ? "lunDay" : "solDay", pad2(day));
  kasiUrl.searchParams.set("_type", "json");

  try {
    const res = await fetch(kasiUrl.toString());
    if (!res.ok) {
      return new Response(JSON.stringify({ error: "KASI API error", status: res.status }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }
    const data = (await res.json()) as KasiApiResponse;
    const item = data?.response?.body?.items?.item;
    if (!item) {
      return new Response(JSON.stringify({ error: "no data" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = {
      yearGanji:  item.lunSecha?.split("(")[0]?.trim() || "",
      monthGanji: item.lunWolgeon?.split("(")[0]?.trim() || "",
      dayGanji:   item.lunIljin?.split("(")[0]?.trim() || "",
      lunYear:    item.lunYear,
      lunMonth:   item.lunMonth,
      lunDay:     item.lunDay,
      solYear:    item.solYear,
      solMonth:   item.solMonth,
      solDay:     item.solDay,
      isLeap:     item.lunLeapmonth === "윤",
    };

    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "fetch failed", message: (err as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
