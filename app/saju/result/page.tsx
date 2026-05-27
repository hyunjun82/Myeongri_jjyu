"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { AdSlot } from "@/components/AdSlot";
import { calcLocal, calcFromKasi, type SajuResult, ELEMENT_NAME } from "@/lib/saju";
import { buildReading, CATEGORY_LABEL, ILGAN, type CategoryKey } from "@/lib/content/ilgan";
import { fetchSajuFromKasi } from "@/lib/kasi";

function ResultContent() {
  const search = useSearchParams();
  const [data, setData] = useState<SajuResult | null>(null);
  const [tab, setTab] = useState<CategoryKey>("chong");
  const [source, setSource] = useState<"loading" | "kasi" | "local">("loading");

  useEffect(() => {
    const name = search.get("name") || "익명";
    const gender = (search.get("gender") || "F") as "M" | "F";
    const calendar = (search.get("calendar") || "solar") as "solar" | "lunar";
    const year = Number(search.get("year")) || 1993;
    const month = Number(search.get("month")) || 6;
    const day = Number(search.get("day")) || 14;
    const hour = Number(search.get("hour")) || 12;

    // 1차: KASI API 시도 → 실패 시 로컬 계산
    fetchSajuFromKasi({ year, month, day, calendar })
      .then((kasi) => {
        const r = calcFromKasi({
          year, month, day, hour, gender, calendar, name,
          yearGanji: kasi.yearGanji,
          monthGanji: kasi.monthGanji,
          dayGanji: kasi.dayGanji,
        });
        setData(r);
        setSource("kasi");
      })
      .catch(() => {
        const r = calcLocal({ year, month, day, hour, gender, calendar, name });
        setData(r);
        setSource("local");
      });
  }, [search]);

  if (!data) {
    return (
      <div style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
        <div style={{ fontFamily: "var(--font-hanja)", fontSize: 64, color: "var(--gold)" }}>命</div>
        <p style={{ color: "var(--ink-3)" }}>사주 8자를 계산하고 있어요...</p>
      </div>
    );
  }

  const reading = buildReading(data.ilgan.ko, tab, {
    dominant: data.dominant,
    missing: data.missing,
    age: data.age,
  });
  const ilganProfile = ILGAN[data.ilgan.ko];

  return (
    <div>
      <header className="nav">
        <div className="container-x nav-inner">
          <Link href="/" className="brand">
            <div className="brand-mark"><span>命</span></div>
            <div className="brand-text">
              <div className="brand-name">명리</div>
              <div className="brand-sub">MYEONGRI · 命理</div>
            </div>
          </Link>
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/saju" className="btn btn-secondary" style={{ padding: "8px 14px", fontSize: 13 }}>다시 풀이</Link>
            <Link href="/" className="nav-cta">홈으로</Link>
          </div>
        </div>
      </header>

      <section className="result-hero">
        <div className="container-x">
          <span className="eyebrow">평생사주 · 八字 풀이</span>
          <h1 className="result-name">{data.name}<span className="hon">님의 사주</span></h1>
          <div className="result-meta-row">
            <div className="item">
              <span className="k">생년월일</span>
              <span className="v">{data.year}년 {data.month}월 {data.day}일 · {data.calendar === "solar" ? "양력" : "음력"}</span>
            </div>
            <div className="item">
              <span className="k">현재 나이</span>
              <span className="v">{data.age}세</span>
            </div>
            <div className="item">
              <span className="k">일간 (日干)</span>
              <span className="v">
                <span style={{ fontFamily: "var(--font-hanja)", fontWeight: 700, color: "var(--accent)" }}>{data.ilgan.hanja}</span>
                {" "}{data.ilgan.ko} · {ELEMENT_NAME[data.ilgan.elem].ko} {ELEMENT_NAME[data.ilgan.elem].hanja}
              </span>
            </div>
            <div className="item">
              <span className="k">계산 출처</span>
              <span className="v">{source === "kasi" ? "KASI 만세력" : "내장 60갑자"}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-x">
        <div className="result-grid">
          <section className="r-card span-8">
            <div className="r-card-title">
              <h3>나의 사주 八字 <span className="hanja-aside">SAJU PILLARS</span></h3>
            </div>
            <div className="saju-display">
              {(["year","month","day","hour"] as const).map((k) => {
                const labels = { year: "年柱", month: "月柱", day: "日柱", hour: "時柱" };
                const p = data.pillars[k];
                return (
                  <div className="saju-col" key={k}>
                    <div className="saju-col-label">{labels[k]}</div>
                    <div className={`saju-cell elem-${p.stem.elem}`}>
                      {k === "day" && <div className="saju-master-mark">日干 · ME</div>}
                      <span className="ko">{p.stem.ko}</span>
                      <span className="glyph">{p.stem.hanja}</span>
                      <span className="top-tag">{p.stem.romaji}</span>
                    </div>
                    <div className={`saju-cell elem-${p.branch.elem}`}>
                      <span className="ko">{p.branch.ko}</span>
                      <span className="glyph">{p.branch.hanja}</span>
                      <span className="top-tag">{p.branch.animalEn}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {ilganProfile && (
              <div style={{ marginTop: 18, padding: "16px 18px", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>
                  당신의 일간은 <span className="hanja-inline" style={{ color: "var(--accent)" }}>{ilganProfile.hanja}</span> {ilganProfile.ko} —
                  {" "}<strong>{ilganProfile.symbol}</strong>
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 6 }}>{ilganProfile.core}</div>
              </div>
            )}
          </section>

          <section className="r-card span-4">
            <div className="r-card-title"><h3>오행 분포 <span className="hanja-aside">五行</span></h3></div>
            {(Object.keys(data.counts) as Array<keyof typeof data.counts>).map((el) => {
              const n = data.counts[el];
              return (
                <div key={el} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ width: 30, fontSize: 12, color: "var(--ink-3)" }}>{ELEMENT_NAME[el].ko}</span>
                  <div style={{ flex: 1, height: 8, background: "var(--paper-2)", borderRadius: 4 }}>
                    <div style={{ width: `${(n/8)*100}%`, height: "100%", background: `var(--${el})`, borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 12, color: "var(--ink-3)", width: 24, textAlign: "right" }}>{n}</span>
                </div>
              );
            })}
            {data.missing.length > 0 && (
              <div style={{ marginTop: 14, padding: 12, background: "var(--fire-soft)", borderRadius: 10, fontSize: 12.5, color: "var(--ink-2)" }}>
                <strong>{data.missing.map((m) => ELEMENT_NAME[m].ko).join("·")}</strong> 오행이 부족합니다.
              </div>
            )}
          </section>

          <section className="r-card span-8">
            <div className="r-card-title"><h3>분야별 풀이 <span className="hanja-aside">分野</span></h3></div>
            <div className="tabs">
              {(Object.keys(CATEGORY_LABEL) as CategoryKey[]).map((k) => (
                <button key={k} className={`tab${tab === k ? " active" : ""}`} onClick={() => setTab(k)}>
                  {CATEGORY_LABEL[k]} · {data.scores[k]}
                </button>
              ))}
            </div>
            <h4 style={{ fontFamily: "var(--font-serif)", fontSize: 18, marginBottom: 12 }}>{reading.title}</h4>
            {reading.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: 14.5, lineHeight: 1.8, color: "var(--ink-2)", marginBottom: 14 }}>{p}</p>
            ))}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 18 }}>
              {reading.keywords.map((kw, i) => (
                <span key={i} className="chip" style={{ background: "var(--paper-2)" }}>#{kw}</span>
              ))}
            </div>
          </section>

          <section className="r-card span-4">
            <div className="r-card-title"><h3>오늘의 행운 <span className="hanja-aside">幸運</span></h3></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--ink-3)" }}>행운 숫자</div>
                <div style={{ fontFamily: "var(--font-serif)", fontWeight: 900, fontSize: 28, color: "var(--ink)" }}>{data.lucky.number}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--ink-3)" }}>행운 색</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: data.lucky.color, border: "1px solid var(--line)" }} />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{data.lucky.colorName}</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--ink-3)" }}>길한 방향</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>{data.lucky.direction}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--ink-3)" }}>길한 요일</div>
                <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>{data.lucky.day}</div>
              </div>
            </div>
            <Link href="/gunghap" className="btn btn-gold" style={{ marginTop: 18, width: "100%", justifyContent: "center" }}>
              궁합도 보기 →
            </Link>
          </section>

          <div className="span-12">
            <AdSlot label="결과지 중간 디스플레이" size="1240 × 110" />
          </div>

          <section className="r-card span-12">
            <div className="r-card-title"><h3>대운 흐름 <span className="hanja-aside">大運 · 10년 단위</span></h3></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 8, overflowX: "auto" }}>
              {data.daewoon.map((d, i) => (
                <div key={i} style={{
                  padding: 14, borderRadius: 10,
                  background: d.current ? "var(--ink)" : "var(--paper-2)",
                  color: d.current ? "var(--paper)" : "var(--ink)",
                  textAlign: "center", minWidth: 80,
                }}>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>{d.startAge}–{d.startAge + 9}</div>
                  <div style={{ fontFamily: "var(--font-hanja)", fontWeight: 900, fontSize: 22, margin: "4px 0" }}>
                    {d.stem.hanja}{d.branch.hanja}
                  </div>
                  <div style={{ fontSize: 11 }}>{d.stem.ko}{d.branch.ko}</div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 16, fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.7 }}>
              대운은 10년 단위로 변하는 큰 흐름입니다. 검은색 칸이 현재 대운이에요.
            </p>
          </section>

          <div className="span-12">
            <AdSlot label="결과지 하단" size="1240 × 220" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>로딩 중...</div>}>
      <ResultContent />
    </Suspense>
  );
}
