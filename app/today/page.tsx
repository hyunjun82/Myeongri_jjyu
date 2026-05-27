"use client";
import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { calcLocal, ELEMENT_NAME, STEMS, BRANCHES } from "@/lib/saju";

function todayGanji() {
  const today = new Date();
  const anchor = Date.UTC(2000, 0, 7);
  const dayN = Math.round((today.getTime() - anchor) / 86400000);
  const idx = ((dayN) % 60 + 60) % 60;
  return { stem: STEMS[idx % 10], branch: BRANCHES[idx % 12], date: today };
}

const TONE_BY_RELATION: Record<string, { mood: string; advice: string }> = {
  same:    { mood: "안정",   advice: "익숙한 일에 집중하기 좋은 날. 새 시도는 다음으로." },
  sheng:   { mood: "상승",   advice: "새로운 시도가 빛을 발하는 날. 미루었던 일을 꺼내세요." },
  shengMe: { mood: "지원",   advice: "주변의 도움이 들어오는 날. 부탁할 일이 있다면 오늘." },
  ke:      { mood: "추진",   advice: "결단력이 필요한 일에 좋아요. 단, 강하게 부딪히지 않게." },
  keMe:    { mood: "주의",   advice: "감정 소비를 줄이고 작은 일에 집중하세요." },
};

function relation(myElem: string, todayElem: string): keyof typeof TONE_BY_RELATION {
  const SHENG: Record<string, string> = { wood: "fire", fire: "earth", earth: "metal", metal: "water", water: "wood" };
  const KE:    Record<string, string> = { wood: "earth", fire: "metal", earth: "water", metal: "wood", water: "fire" };
  if (myElem === todayElem)             return "same";
  if (SHENG[myElem] === todayElem)      return "sheng";
  if (SHENG[todayElem] === myElem)      return "shengMe";
  if (KE[myElem] === todayElem)         return "ke";
  return                                 "keMe";
}

export default function TodayPage() {
  const today = todayGanji();
  const [birth, setBirth] = useState({ year: 1993, month: 6, day: 14 });
  const [submitted, setSubmitted] = useState(false);
  const my = calcLocal({ ...birth, hour: 12, gender: "F", calendar: "solar" });
  const rel = relation(my.ilgan.elem, today.stem.elem);
  const tone = TONE_BY_RELATION[rel];

  return (
    <>
      <Nav />
      <main className="container-x" style={{ padding: "60px 24px 80px" }}>
        <span className="eyebrow">TODAY · 오늘의 운세</span>
        <h1 className="section-title" style={{ marginBottom: 24 }}>
          오늘의 일진 <span className="hanja-aside">{today.stem.hanja}{today.branch.hanja} · {today.stem.ko}{today.branch.ko}일</span>
        </h1>
        <div className="card" style={{ background: "linear-gradient(135deg, #FAF7F2, #F3EEE3)", marginBottom: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{today.date.toLocaleDateString("ko-KR")}</div>
              <div style={{ fontFamily: "var(--font-hanja)", fontSize: 64, fontWeight: 900, color: "var(--ink)", margin: "8px 0" }}>{today.stem.hanja}{today.branch.hanja}</div>
              <div style={{ fontSize: 14, color: "var(--ink-2)" }}>{today.stem.ko}{today.branch.ko}일 · {ELEMENT_NAME[today.stem.elem].ko}{ELEMENT_NAME[today.branch.elem].ko}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", letterSpacing: "0.1em" }}>오늘의 무드</div>
              <div style={{ fontFamily: "var(--font-serif)", fontWeight: 900, fontSize: 32, color: "var(--accent)", margin: "6px 0" }}>{tone.mood}</div>
              <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.7 }}>{tone.advice}</p>
            </div>
          </div>
        </div>
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 18, marginBottom: 14 }}>당신의 오늘은? — 생년월일만 알려주세요</h3>
          <div className="form-row" style={{ marginBottom: 12 }}>
            <div className="field-group"><label className="field-label">연</label><input type="number" className="field-input" value={birth.year} onChange={(e) => setBirth({ ...birth, year: Number(e.target.value) })} /></div>
            <div className="field-group"><label className="field-label">월</label><input type="number" className="field-input" value={birth.month} onChange={(e) => setBirth({ ...birth, month: Number(e.target.value) })} /></div>
            <div className="field-group"><label className="field-label">일</label><input type="number" className="field-input" value={birth.day} onChange={(e) => setBirth({ ...birth, day: Number(e.target.value) })} /></div>
          </div>
          <button className="btn btn-primary" onClick={() => setSubmitted(true)}>오늘 운세 보기</button>
        </div>
        {submitted && (
          <div className="card">
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 18, marginBottom: 14 }}>
              {my.ilgan.hanja} {my.ilgan.ko} 일간 — {ELEMENT_NAME[my.ilgan.elem].ko}({ELEMENT_NAME[my.ilgan.elem].hanja})
            </h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "var(--ink-2)", marginBottom: 12 }}>
              오늘의 일진 <strong>{today.stem.hanja}{today.branch.hanja}</strong>과 당신의 일간 <strong>{my.ilgan.hanja}</strong>의 관계는
              <strong> {rel === "sheng" ? "상생" : rel === "shengMe" ? "도움" : rel === "ke" ? "추진" : rel === "keMe" ? "주의" : "비화"}</strong> 입니다.
              {tone.advice}
            </p>
            <Link href="/saju" className="btn btn-gold" style={{ marginTop: 18 }}>평생사주도 보기 →</Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
