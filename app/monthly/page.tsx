"use client";
import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { calcLocal } from "@/lib/saju";

const KEY_LABEL = { good: "좋음", change: "변동", caution: "주의" } as const;
const KEY_COLOR = { good: "var(--wood-soft)", change: "var(--earth-soft)", caution: "var(--fire-soft)" } as const;
const KEY_TEXT  = { good: "var(--wood)",     change: "var(--earth)",     caution: "var(--fire)" } as const;
const MONTH_ADVICE: Record<"good"|"change"|"caution", string> = {
  good:    "기회가 자연스럽게 열리는 달. 미루었던 일을 추진하기 좋아요.",
  change:  "흐름이 바뀌는 달. 큰 결정보다 작은 조정에 집중하세요.",
  caution: "감정 소비를 줄이고 건강과 휴식에 신경 쓰는 달입니다.",
};

export default function MonthlyPage() {
  const [birth, setBirth] = useState({ year: 1993, month: 6, day: 14 });
  const [submitted, setSubmitted] = useState(false);
  const my = calcLocal({ ...birth, hour: 12, gender: "F", calendar: "solar" });

  return (
    <>
      <Nav />
      <main className="container-x" style={{ padding: "60px 24px 80px" }}>
        <span className="eyebrow">MONTHLY · 월별 운세</span>
        <h1 className="section-title" style={{ marginBottom: 24 }}>이번 달부터 12개월의 흐름</h1>

        <div className="card" style={{ marginBottom: 24 }}>
          <div className="form-row" style={{ marginBottom: 12 }}>
            <div className="field-group"><label className="field-label">연</label><input type="number" className="field-input" value={birth.year} onChange={(e) => setBirth({ ...birth, year: Number(e.target.value) })} /></div>
            <div className="field-group"><label className="field-label">월</label><input type="number" className="field-input" value={birth.month} onChange={(e) => setBirth({ ...birth, month: Number(e.target.value) })} /></div>
            <div className="field-group"><label className="field-label">일</label><input type="number" className="field-input" value={birth.day} onChange={(e) => setBirth({ ...birth, day: Number(e.target.value) })} /></div>
          </div>
          <button className="btn btn-primary" onClick={() => setSubmitted(true)}>월별 운세 보기</button>
        </div>

        {submitted && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
              {my.months.map((m) => (
                <div key={m.month} className="card" style={{ background: KEY_COLOR[m.key as keyof typeof KEY_COLOR], padding: 16 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)" }}>{m.month}월</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 700, color: KEY_TEXT[m.key as keyof typeof KEY_TEXT], marginTop: 4 }}>{m.label}</div>
                  <p style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.6, marginTop: 8 }}>
                    {MONTH_ADVICE[m.key as keyof typeof MONTH_ADVICE]}
                  </p>
                </div>
              ))}
            </div>
            <Link href="/saju" className="btn btn-gold">평생사주 보기 →</Link>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
