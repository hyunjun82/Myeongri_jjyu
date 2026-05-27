"use client";
import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// 메이저 아르카나 22장 + 마이너 56장 = 78장
// 본문에서는 메이저 22장만 우선 출력 (확장 가능)
const MAJOR_ARCANA = [
  { id: 0,  name: "바보 The Fool",       up: "새로운 시작, 자유로운 모험", down: "무모함, 준비 부족" },
  { id: 1,  name: "마법사 The Magician",  up: "의지력, 창조, 능력의 발현", down: "조작, 미숙함" },
  { id: 2,  name: "여사제 The High Priestess", up: "직관, 내면의 지혜", down: "비밀, 감정 억압" },
  { id: 3,  name: "여황제 The Empress",   up: "풍요, 양육, 창조성", down: "의존, 정체" },
  { id: 4,  name: "황제 The Emperor",     up: "권위, 통제, 구조", down: "독선, 경직" },
  { id: 5,  name: "교황 The Hierophant",  up: "전통, 가르침, 신념", down: "교조주의, 반항" },
  { id: 6,  name: "연인 The Lovers",      up: "사랑, 조화, 선택", down: "관계 갈등, 망설임" },
  { id: 7,  name: "전차 The Chariot",     up: "의지, 추진력, 승禬", down: "통제 부족, 방향 상실" },
  { id: 8,  name: "힘 Strength",         up: "용기, 인내, 내면의 힘", down: "약함, 자기 의심" },
  { id: 9,  name: "은둔자 The Hermit",    up: "내성, 고독, 안내", down: "고립, 외면" },
  { id: 10, name: "운명의 수레바퀴",       up: "변화, 운명, 전환점", down: "지연, 통제 불가" },
  { id: 11, name: "정의 Justice",        up: "공정, 진실, 균형", down: "불공정, 회피" },
  { id: 12, name: "매달린 사람",          up: "희생, 새로운 관점", down: "정체, 무의미한 희생" },
  { id: 13, name: "주음 Death",          up: "끝과 시작, 변형", down: "변화 저항, 정체" },
  { id: 14, name: "절제 Temperance",     up: "균형, 조화, 자제", down: "불균형, 과도함" },
  { id: 15, name: "악마 The Devil",      up: "유혹, 집착, 제약", down: "해방, 깨달음" },
  { id: 16, name: "탑 The Tower",        up: "급변, 붕괴, 폭로", down: "회피된 변화, 잠재 위기" },
  { id: 17, name: "별 The Star",         up: "희망, 영감, 평화", down: "절망, 신뢰 상실" },
  { id: 18, name: "달 The Moon",         up: "환상, 무의식, 두려움", down: "혼란 해소, 진실" },
  { id: 19, name: "태양 The Sun",        up: "기쁨, 성공, 활력", down: "지연된 행복, 자만" },
  { id: 20, name: "심판 Judgement",      up: "각성, 부활, 새 단계", down: "후회, 미루기" },
  { id: 21, name: "세계 The World",      up: "완성, 성취, 통합", down: "미완성, 부족함" },
];

type Pick = { card: typeof MAJOR_ARCANA[0]; reversed: boolean; position: "past" | "present" | "future" };

export default function TarotPage() {
  const [stage, setStage] = useState<"intro" | "draw" | "result">("intro");
  const [theme, setTheme] = useState<"love" | "career" | "wealth">("love");
  const [picks, setPicks] = useState<Pick[]>([]);

  const draw = () => {
    const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);
    const positions: Pick["position"][] = ["past", "present", "future"];
    const result: Pick[] = positions.map((pos, i) => ({
      card: shuffled[i],
      reversed: Math.random() < 0.4,
      position: pos,
    }));
    setPicks(result);
    setStage("result");
  };

  const positionLabel = { past: "과거", present: "현재", future: "미래" };
  const themeLabel = { love: "애정", career: "진로", wealth: "재물" };

  return (
    <>
      <Nav />
      <main className="container-x" style={{ padding: "60px 24px 80px" }}>
        {stage === "intro" && (
          <>
            <span className="eyebrow">TAROT · 타로 카드</span>
            <h1 className="section-title" style={{ marginBottom: 20 }}>마음에 떠오르는 질문 하나를 골라주세요</h1>
            <p style={{ color: "var(--ink-3)", marginBottom: 36, maxWidth: 600 }}>
              78장의 라이더-웨이트 덱에서 3장을 뽑아 과거·현재·미래를 살펴봅니다.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
              {(["love", "career", "wealth"] as const).map((t) => (
                <button key={t} className="card" onClick={() => setTheme(t)}
                  style={{ textAlign: "left", border: theme === t ? "2px solid var(--accent)" : "1px solid var(--line)", cursor: "pointer", background: theme === t ? "var(--paper-2)" : "var(--card)" }}>
                  <div style={{ fontFamily: "var(--font-hanja)", fontSize: 32, color: "var(--gold)" }}>
                    {t === "love" ? "情" : t === "career" ? "業" : "財"}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 20, margin: "10px 0 6px" }}>{themeLabel[t]}</h3>
                  <p style={{ fontSize: 13, color: "var(--ink-3)" }}>
                    {t === "love" ? "연애·결혼·가족 관계" : t === "career" ? "직업·진로·이직" : "재물·투자·사업"}
                  </p>
                </button>
              ))}
            </div>

            <button className="btn btn-primary btn-lg" onClick={() => setStage("draw")}>
              카드 뽑기 시작
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {stage === "draw" && (
          <div style={{ textAlign: "center" }}>
            <span className="eyebrow">DRAWING · 카드 섞는 중</span>
            <h2 className="section-title">3장을 직관으로 뽑아주세요</h2>
            <p style={{ color: "var(--ink-3)", marginTop: 8 }}>카드 등을 클릭하면 자동으로 펼쳐집니다.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 8, marginTop: 40 }}>
              {Array.from({ length: 22 }).map((_, i) => (
                <button key={i} onClick={draw}
                  style={{ aspectRatio: "2/3", borderRadius: 8, background: "linear-gradient(135deg, #2A1F18, #1A1310)", border: "1px solid var(--gold-2)", cursor: "pointer", color: "var(--gold)", fontFamily: "var(--font-hanja)", fontSize: 28, fontWeight: 900 }}>
                  塔
                </button>
              ))}
            </div>
          </div>
        )}

        {stage === "result" && (
          <>
            <span className="eyebrow">RESULT · {themeLabel[theme]} 점사</span>
            <h2 className="section-title" style={{ marginBottom: 30 }}>당신의 3장</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 40 }}>
              {picks.map((p, i) => (
                <article key={i} className="card">
                  <div style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.1em", marginBottom: 8 }}>{positionLabel[p.position]} · {p.position.toUpperCase()}</div>
                  <div style={{ aspectRatio: "2/3", background: "linear-gradient(135deg, #2A1F18, #1A1310)", borderRadius: 12, display: "grid", placeItems: "center", color: "var(--gold)", marginBottom: 12, transform: p.reversed ? "rotate(180deg)" : "none" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "var(--font-hanja)", fontSize: 48, fontWeight: 900 }}>塔</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, marginTop: 4 }}>No. {p.card.id}</div>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 18, marginBottom: 6 }}>
                    {p.card.name} {p.reversed && <span style={{ fontSize: 12, color: "var(--accent)" }}>· 역방향</span>}
                  </h3>
                  <p style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.7 }}>
                    {p.reversed ? p.card.down : p.card.up}
                  </p>
                </article>
              ))}
            </div>

            <div className="card" style={{ background: "var(--paper-2)" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 20, marginBottom: 10 }}>종합 해석</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.8, color: "var(--ink-2)" }}>
                <strong>{picks[0]?.card.name}</strong>에서 비롯된 흐름이 <strong>{picks[1]?.card.name}</strong>를 거쳐 <strong>{picks[2]?.card.name}</strong>로 향합니다.
                {themeLabel[theme]} 영역에서 지금의 자리가 명확하지 않다면, 첫 카드가 알려주는 자리부터 다시 살펴보세요.
                3장의 흐름이 모두 정방향이라면 자연스러운 진행이, 역방향이 섞여 있다면 잠시 멈추고 점검할 부분이 있다는 신호입니다.
              </p>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button className="btn btn-secondary" onClick={() => setStage("intro")}>다시 뽑기</button>
              <Link href="/saju" className="btn btn-primary">사주도 보기 →</Link>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
