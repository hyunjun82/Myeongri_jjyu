"use client";
import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

function gwaeFor(birthYear: number, month: number): { num: number; title: string; desc: string } {
  const seed = (birthYear * 13 + month * 7) % 144;
  const titles = [
    "고생 끝 결실의 해", "물을 만난 용", "안정과 풍요", "변화의 바람",
    "묵묵히 쌓는 신뢰", "구름 사이 햇살", "마음의 정리", "새벽의 호흡",
    "흐름을 타는 배", "단단해지는 뿌리", "오랜 친구의 방문", "잠시 멈춤의 시간",
  ];
  const descs = [
    "올해는 오랫동안 쌓아온 노력이 결실로 돌아오는 해입니다. 큰 욕심보다 차곡차곡 정리하는 자세가 가장 좋은 결과를 만들어줍니다.",
    "큰 흐름이 당신 편에 있어요. 단, 지나친 추진은 오히려 일을 그르칠 수 있으니 한 박자 늦추는 지혜가 필요합니다.",
    "재물과 가정 모두 안정된 흐름. 새로 무언가를 시작하기보다 지금 있는 것을 잘 가꾸는 데 집중하세요.",
    "주변의 변화가 잦을 수 있어요. 변화를 두려워하지 말되, 큰 결정은 한 번 더 생각하고 움직이세요.",
    "당신의 진심이 알려지는 해. 평소 묵묵히 해온 일들이 윗사람의 눈에 들어옵니다.",
    "잠시 답답함이 있어도 곧 풀립니다. 길게 봤을 때 좋은 방향으로 가고 있어요.",
  ];
  const t = titles[seed % titles.length];
  const d = descs[seed % descs.length];
  return { num: seed + 1, title: t, desc: d };
}

export default function TojungPage() {
  const currentYear = new Date().getFullYear();
  const [birth, setBirth] = useState({ year: 1993, month: 6, day: 14 });
  const [submitted, setSubmitted] = useState(false);

  const months = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    gwae: gwaeFor(birth.year, i + 1),
  }));

  return (
    <>
      <Nav />
      <main className="container-x" style={{ padding: "60px 24px 80px" }}>
        <span className="eyebrow">TOJUNG · 토정비결</span>
        <h1 className="section-title" style={{ marginBottom: 8 }}>{currentYear}년 한 해의 신수</h1>
        <p style={{ color: "var(--ink-3)", maxWidth: 600, marginBottom: 30 }}>
          이지함의 토정비결로 정월부터 섣달까지 매월의 운기를 살펴봅니다.
        </p>

        <div className="card" style={{ marginBottom: 24 }}>
          <div className="form-row">
            <div className="field-group"><label className="field-label">연</label><input type="number" className="field-input" value={birth.year} onChange={(e) => setBirth({ ...birth, year: Number(e.target.value) })} /></div>
            <div className="field-group"><label className="field-label">월</label><input type="number" className="field-input" value={birth.month} onChange={(e) => setBirth({ ...birth, month: Number(e.target.value) })} /></div>
            <div className="field-group"><label className="field-label">일</label><input type="number" className="field-input" value={birth.day} onChange={(e) => setBirth({ ...birth, day: Number(e.target.value) })} /></div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setSubmitted(true)}>신수 보기</button>
        </div>

        {submitted && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
            {months.map((m) => (
              <div key={m.month} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--gold)", fontSize: 12 }}>{m.month}월 · 第{m.gwae.num}卦</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700, marginTop: 8 }}>{m.gwae.title}</h3>
                <p style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.7, marginTop: 8 }}>{m.gwae.desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
