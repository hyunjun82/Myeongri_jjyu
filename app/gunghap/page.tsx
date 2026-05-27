"use client";
import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { calcLocal, type SajuResult, ELEMENT_NAME } from "@/lib/saju";

// 오행 상생상극
function compatScore(e1: string, e2: string): { score: number; label: string; desc: string } {
  const SHENG: Record<string, string> = { wood: "fire", fire: "earth", earth: "metal", metal: "water", water: "wood" };
  const KE:    Record<string, string> = { wood: "earth", fire: "metal", earth: "water", metal: "wood", water: "fire" };

  if (e1 === e2)              return { score: 70, label: "비화(比和)", desc: "같은 기운이라 편안하지만 자극은 적어요." };
  if (SHENG[e1] === e2)       return { score: 90, label: "상생(相生)", desc: "당신이 상대를 키우는 관계. 헌신적인 사랑이 자연스러워요." };
  if (SHENG[e2] === e1)       return { score: 88, label: "상생(相生)", desc: "상대가 당신을 키우는 관계. 안정감 있는 사랑이에요." };
  if (KE[e1] === e2)          return { score: 60, label: "상극(相剋)", desc: "당신의 강한 기운이 상대를 누를 수 있어요. 한 발 양보가 필요." };
  return                        { score: 62, label: "상극(相剋)", desc: "상대의 기운이 당신을 누를 수 있어요. 자기 영역을 분명히." };
}

interface Person {
  name: string;
  gender: "M" | "F";
  year: number;
  month: number;
  day: number;
  hour: number;
  calendar: "solar" | "lunar";
}

const initial: Person = { name: "", gender: "F", year: 1993, month: 6, day: 14, hour: 12, calendar: "solar" };

export default function GunghapPage() {
  const [step, setStep] = useState<"input" | "result">("input");
  const [p1, setP1] = useState<Person>({ ...initial, name: "" });
  const [p2, setP2] = useState<Person>({ ...initial, name: "", gender: "M" });
  const [r1, setR1] = useState<SajuResult | null>(null);
  const [r2, setR2] = useState<SajuResult | null>(null);

  const calc = () => {
    setR1(calcLocal(p1));
    setR2(calcLocal(p2));
    setStep("result");
  };

  const compat = r1 && r2 ? compatScore(r1.ilgan.elem, r2.ilgan.elem) : null;

  return (
    <>
      <Nav />
      <main className="container-x" style={{ padding: "60px 24px 80px" }}>
        {step === "input" && (
          <>
            <span className="eyebrow">GUNGHAP · 궁합</span>
            <h1 className="section-title" style={{ marginBottom: 30 }}>두 사람의 8자가 만나는 자리</h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { person: p1, set: setP1, label: "첫 번째 사람" },
                { person: p2, set: setP2, label: "두 번째 사람" },
              ].map(({ person, set, label }, idx) => (
                <div key={idx} className="card">
                  <h3 style={{ fontFamily: "var(--font-serif)", marginBottom: 16 }}>{label}</h3>
                  <div className="field-group" style={{ marginBottom: 12 }}>
                    <label className="field-label">이름</label>
                    <input className="field-input" value={person.name} onChange={(e) => set({ ...person, name: e.target.value })} />
                  </div>
                  <div className="toggle-row" style={{ marginBottom: 12 }}>
                    <button className={`toggle-btn${person.gender === "F" ? " active" : ""}`} onClick={() => set({ ...person, gender: "F" })}>여성</button>
                    <button className={`toggle-btn${person.gender === "M" ? " active" : ""}`} onClick={() => set({ ...person, gender: "M" })}>남성</button>
                  </div>
                  <div className="form-row" style={{ marginBottom: 0 }}>
                    <div className="field-group">
                      <label className="field-label">연</label>
                      <input type="number" className="field-input" value={person.year} onChange={(e) => set({ ...person, year: Number(e.target.value) })} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">월</label>
                      <input type="number" className="field-input" value={person.month} onChange={(e) => set({ ...person, month: Number(e.target.value) })} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">일</label>
                      <input type="number" className="field-input" value={person.day} onChange={(e) => set({ ...person, day: Number(e.target.value) })} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary btn-lg" style={{ marginTop: 24 }} onClick={calc}>궁합 보기</button>
          </>
        )}

        {step === "result" && r1 && r2 && compat && (
          <>
            <span className="eyebrow">RESULT · 궁합 결과</span>
            <h1 className="section-title" style={{ marginBottom: 24 }}>
              {r1.name || "첫 분"} <span style={{ color: "var(--accent)" }}>×</span> {r2.name || "둘째 분"}
            </h1>

            <div className="card" style={{ background: "linear-gradient(135deg, #2A1F18, #1A1310)", color: "var(--paper)", marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em" }}>종합 궁합 점수</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontWeight: 900, fontSize: 64, color: "var(--gold)" }}>{compat.score}</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>{compat.label} · {compat.desc}</div>
                </div>
                <div style={{ fontFamily: "var(--font-hanja)", fontSize: 100, fontWeight: 900, color: "rgba(176,136,71,0.15)" }}>合</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[r1, r2].map((r, i) => (
                <div key={i} className="card">
                  <h3 style={{ fontFamily: "var(--font-serif)", marginBottom: 10 }}>{r.name || (i === 0 ? "첫 분" : "둘째 분")}</h3>
                  <div style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 12 }}>{r.year}년 {r.month}월 {r.day}일</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {(["year","month","day","hour"] as const).map((k) => (
                      <div key={k} className={`elem-${r.pillars[k].stem.elem}`} style={{ width: 48, height: 48, borderRadius: 8, display: "grid", placeItems: "center", fontFamily: "var(--font-hanja)", fontWeight: 900, fontSize: 22 }}>
                        {r.pillars[k].stem.hanja}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 12 }}>
                    일간: <strong>{r.ilgan.hanja} {r.ilgan.ko}</strong> ({ELEMENT_NAME[r.ilgan.elem].ko})
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ marginTop: 20 }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 20, marginBottom: 12 }}>관계 조언</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "var(--ink-2)" }}>
                {compat.label}의 관계에서는 서로의 차이를 인정하는 것이 첫걸음입니다.
                {r1.ilgan.ko} 일간({ELEMENT_NAME[r1.ilgan.elem].ko})과 {r2.ilgan.ko} 일간({ELEMENT_NAME[r2.ilgan.elem].ko})의 만남은
                {compat.score >= 80 ? " 자연스러운 흐름이 있어 함께하면 서로의 부족한 부분을 채워줍니다." : " 처음엔 부딪힐 수 있지만, 그 부딪힘이 오히려 서로를 성장시킵니다."}
                특히 갈등이 생겼을 때 감정보다 사실에 집중하는 대화가 도움이 됩니다.
              </p>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button className="btn btn-secondary" onClick={() => setStep("input")}>다시 보기</button>
              <Link href="/saju" className="btn btn-primary">내 사주도 보기 →</Link>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
