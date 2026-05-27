"use client";
import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { calcLocal, STEMS, BRANCHES, ELEMENT_NAME } from "@/lib/saju";

function sewoonOfYear(year: number) {
  const idx = ((year - 1984) % 60 + 60) % 60;
  return { stem: STEMS[idx % 10], branch: BRANCHES[idx % 12] };
}

const SEWOON_ADVICE: Record<string, string> = {
  sheng:   "한 해 흐름이 당신을 받쳐줍니다. 새로운 도전과 확장에 좋은 해.",
  shengMe: "주변의 도움과 지원이 들어옵니다. 협력 관계가 핵심.",
  same:    "안정적이지만 변화가 적은 해. 내실을 다지기에 적합.",
  ke:      "결단과 추진이 필요한 해. 정리해야 할 것들을 매듭짓기 좋아요.",
  keMe:    "마음의 여유를 가지고 천천히. 건강 관리와 휴식이 중요한 해.",
};

function relation(myElem: string, yearElem: string): string {
  const SHENG: Record<string, string> = { wood: "fire", fire: "earth", earth: "metal", metal: "water", water: "wood" };
  const KE:    Record<string, string> = { wood: "earth", fire: "metal", earth: "water", metal: "wood", water: "fire" };
  if (myElem === yearElem)         return "same";
  if (SHENG[myElem] === yearElem)  return "sheng";
  if (SHENG[yearElem] === myElem)  return "shengMe";
  if (KE[myElem] === yearElem)     return "ke";
  return                            "keMe";
}

export default function SewoonPage() {
  const currentYear = new Date().getFullYear();
  const sewoon = sewoonOfYear(currentYear);
  const [birth, setBirth] = useState({ year: 1993, month: 6, day: 14 });
  const [submitted, setSubmitted] = useState(false);
  const my = calcLocal({ ...birth, hour: 12, gender: "F", calendar: "solar" });
  const rel = relation(my.ilgan.elem, sewoon.stem.elem);

  return (
    <>
      <Nav />
      <main className="container-x" style={{ padding: "60px 24px 80px" }}>
        <span className="eyebrow">SEWOON · 신년 운세</span>
        <h1 className="section-title" style={{ marginBottom: 8 }}>
          {currentYear}년 한 해의 큰 그림
        </h1>
        <p style={{ color: "var(--ink-3)", marginBottom: 30 }}>올해 세운은 <strong>{sewoon.stem.hanja}{sewoon.branch.hanja} ({sewoon.stem.ko}{sewoon.branch.ko})</strong> — {ELEMENT_NAME[sewoon.stem.elem].ko}({ELEMENT_NAME[sewoon.stem.elem].hanja})의 해입니다.</p>

        <div className="card" style={{ marginBottom: 24 }}>
          <div className="form-row" style={{ marginBottom: 12 }}>
            <div className="field-group"><label className="field-label">연</label><input type="number" className="field-input" value={birth.year} onChange={(e) => setBirth({ ...birth, year: Number(e.target.value) })} /></div>
            <div className="field-group"><label className="field-label">월</label><input type="number" className="field-input" value={birth.month} onChange={(e) => setBirth({ ...birth, month: Number(e.target.value) })} /></div>
            <div className="field-group"><label className="field-label">일</label><input type="number" className="field-input" value={birth.day} onChange={(e) => setBirth({ ...birth, day: Number(e.target.value) })} /></div>
          </div>
          <button className="btn btn-primary" onClick={() => setSubmitted(true)}>신년 운세 보기</button>
        </div>

        {submitted && (
          <>
            <div className="card" style={{ background: "linear-gradient(135deg, #2A1F18, #1A1310)", color: "var(--paper)", marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em" }}>{currentYear}년 {my.ilgan.hanja} {my.ilgan.ko} 일간</div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 26, marginTop: 8 }}>
                {rel === "sheng" || rel === "shengMe" ? "흐름이 좋은 해" : rel === "same" ? "내실의 해" : rel === "ke" ? "결단의 해" : "조절의 해"}
              </h3>
              <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.8, color: "rgba(250,247,242,0.85)" }}>{SEWOON_ADVICE[rel]}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {[
                { k: "직장운", v: "성취와 인정의 시기" },
                { k: "재물운", v: "장기 자산 중심 운영" },
                { k: "인연운", v: "오래 갈 관계의 시작" },
              ].map((c, i) => (
                <div key={i} className="card">
                  <div style={{ fontSize: 12, color: "var(--gold)" }}>{c.k}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 18, marginTop: 6 }}>{c.v}</div>
                </div>
              ))}
            </div>
            <Link href="/tojung" className="btn btn-gold" style={{ marginTop: 20 }}>토정비결로 자세히 →</Link>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
