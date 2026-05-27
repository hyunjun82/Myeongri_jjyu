"use client";
import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { calcLocal, ELEMENT_NAME, type Element } from "@/lib/saju";

const NAME_CHAR_BY_ELEMENT: Record<Element, Array<{ hanja: string; ko: string; meaning: string }>> = {
  wood: [{ hanja: "林", ko: "림/임", meaning: "수풀" },{ hanja: "森", ko: "삼", meaning: "울창함" },{ hanja: "榮", ko: "영", meaning: "번영" },{ hanja: "茂", ko: "무", meaning: "무성" },{ hanja: "桐", ko: "동", meaning: "오동나무" }],
  fire: [{ hanja: "炫", ko: "현", meaning: "빛나다" },{ hanja: "燦", ko: "찬", meaning: "찬란" },{ hanja: "煌", ko: "황", meaning: "휘황" },{ hanja: "明", ko: "명", meaning: "밝음" },{ hanja: "陽", ko: "양", meaning: "햇볕" }],
  earth: [{ hanja: "坤", ko: "곤", meaning: "땅" },{ hanja: "城", ko: "성", meaning: "성벽" },{ hanja: "基", ko: "기", meaning: "터전" },{ hanja: "厚", ko: "후", meaning: "두터움" },{ hanja: "山", ko: "산", meaning: "산" }],
  metal: [{ hanja: "鎭", ko: "진", meaning: "굳세다" },{ hanja: "鉉", ko: "현", meaning: "솥귀" },{ hanja: "錫", ko: "석", meaning: "주석" },{ hanja: "鋼", ko: "강", meaning: "강철" },{ hanja: "銀", ko: "은", meaning: "은" }],
  water: [{ hanja: "潤", ko: "윤", meaning: "윤택" },{ hanja: "瀚", ko: "한", meaning: "넓은 물" },{ hanja: "海", ko: "해", meaning: "바다" },{ hanja: "泉", ko: "천", meaning: "샘" },{ hanja: "淵", ko: "연", meaning: "깊은 못" }],
};

export default function NamingPage() {
  const [birth, setBirth] = useState({ year: 2025, month: 1, day: 1, surname: "김" });
  const [submitted, setSubmitted] = useState(false);
  const my = calcLocal({ ...birth, hour: 12, gender: "F", calendar: "solar" });
  const needed: Element = my.missing[0] || (Object.entries(my.counts).sort((a,b) => a[1]-b[1])[0][0] as Element);
  const candidates = NAME_CHAR_BY_ELEMENT[needed];

  return (
    <>
      <Nav />
      <main className="container-x" style={{ padding: "60px 24px 80px" }}>
        <span className="eyebrow">NAMING · 작명·개명</span>
        <h1 className="section-title" style={{ marginBottom: 24 }}>사주를 보완하는 이름</h1>
        <p style={{ color: "var(--ink-3)", maxWidth: 600, marginBottom: 30 }}>
          아이의 사주에서 부족한 오행을 채워주는 한자를 제안해드려요.
        </p>

        <div className="card" style={{ marginBottom: 24 }}>
          <div className="field-group" style={{ marginBottom: 12 }}>
            <label className="field-label">성씨</label>
            <input className="field-input" value={birth.surname} onChange={(e) => setBirth({ ...birth, surname: e.target.value })} />
          </div>
          <div className="form-row">
            <div className="field-group"><label className="field-label">연</label><input type="number" className="field-input" value={birth.year} onChange={(e) => setBirth({ ...birth, year: Number(e.target.value) })} /></div>
            <div className="field-group"><label className="field-label">월</label><input type="number" className="field-input" value={birth.month} onChange={(e) => setBirth({ ...birth, month: Number(e.target.value) })} /></div>
            <div className="field-group"><label className="field-label">일</label><input type="number" className="field-input" value={birth.day} onChange={(e) => setBirth({ ...birth, day: Number(e.target.value) })} /></div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setSubmitted(true)}>이름 추천 받기</button>
        </div>

        {submitted && (
          <>
            <div className="card" style={{ marginBottom: 20 }}>
              <h3 style={{ fontFamily: "var(--font-serif)" }}>
                일간: <span style={{ color: "var(--accent)" }}>{my.ilgan.hanja} {my.ilgan.ko}</span> ·
                부족한 오행: <span style={{ color: `var(--${needed})` }}>{ELEMENT_NAME[needed].ko}({ELEMENT_NAME[needed].hanja})</span>
              </h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
              {candidates.map((c, i) => (
                <div key={i} className="card" style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-hanja)", fontSize: 56, fontWeight: 900, color: `var(--${needed})` }}>{c.hanja}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, marginTop: 6 }}>{birth.surname}{c.ko}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 6 }}>{c.meaning}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
