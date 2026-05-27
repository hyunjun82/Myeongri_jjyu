"use client";
import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

interface Sign { name: string; hanja: string; range: [string, string]; trait: string; today: string; }

const SIGNS: Sign[] = [
  { name: "양자리",  hanja: "白羊", range: ["03-21", "04-19"], trait: "추진력과 도전",     today: "새로운 시도에 좋은 날. 추진력이 빛을 발합니다." },
  { name: "황소자리",hanja: "金牛", range: ["04-20", "05-20"], trait: "안정과 끈기",       today: "꾸준함이 보상받는 날. 작은 결과에 만족해도 좋아요." },
  { name: "쌍둥이자리",hanja:"雙子",range: ["05-21", "06-21"], trait: "지적 호기심",       today: "정보와 만남이 활발한 날. 가벼운 약속도 의미가 큽니다." },
  { name: "게자리",  hanja: "巨蟹", range: ["06-22", "07-22"], trait: "감수성과 보호본능", today: "가족과 가까운 이를 챙기기 좋아요. 감정 정리에도 좋은 날." },
  { name: "사자자리",hanja: "獅子", range: ["07-23", "08-22"], trait: "자신감과 표현",     today: "주목받기 좋은 날. 자신을 드러내는 데 망설이지 마세요." },
  { name: "처녀자리",hanja: "處女", range: ["08-23", "09-22"], trait: "분석과 완벽",       today: "디테일이 차이를 만드는 날. 점검과 정리에 집중하세요." },
  { name: "천칭자리",hanja: "天秤", range: ["09-23", "10-22"], trait: "균형과 조화",       today: "사람 사이의 균형이 잘 맞춰지는 날. 협상에도 유리." },
  { name: "전갈자리",hanja: "天蝎", range: ["10-23", "11-22"], trait: "통찰과 깊이",       today: "보이지 않는 것을 보는 직관이 강한 날. 결정 전 한 번 더 생각." },
  { name: "사수자리",hanja: "射手", range: ["11-23", "12-21"], trait: "자유와 모험",       today: "넓게 보는 시야가 도움이 됩니다. 멀리 떠나는 계획도 좋아요." },
  { name: "염소자리",hanja: "山羊", range: ["12-22", "01-19"], trait: "책임과 성취",       today: "장기 목표를 정리하기 좋은 날. 단단한 진전이 있어요." },
  { name: "물병자리",hanja: "水甁", range: ["01-20", "02-18"], trait: "독창성과 변화",     today: "새로운 아이디어가 떠오르는 날. 기록해두세요." },
  { name: "물고기자리",hanja:"雙魚",range:["02-19", "03-20"], trait: "직관과 공감",       today: "감정이 풍부해지는 날. 예술과 음악이 깊이 와닿습니다." },
];

function getZodiac(month: number, day: number): Sign {
  const mmdd = `${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
  for (const s of SIGNS) {
    if (s.range[0] <= s.range[1]) {
      if (mmdd >= s.range[0] && mmdd <= s.range[1]) return s;
    } else {
      if (mmdd >= s.range[0] || mmdd <= s.range[1]) return s;
    }
  }
  return SIGNS[0];
}

export default function ZodiacPage() {
  const [birth, setBirth] = useState({ month: 6, day: 14 });
  const [submitted, setSubmitted] = useState(false);
  const sign = getZodiac(birth.month, birth.day);

  return (
    <>
      <Nav />
      <main className="container-x" style={{ padding: "60px 24px 80px" }}>
        <span className="eyebrow">ZODIAC · 별자리</span>
        <h1 className="section-title" style={{ marginBottom: 24 }}>12별자리로 보는 오늘</h1>

        <div className="card" style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 12 }}>양력 생일 기준</p>
          <div className="form-row">
            <div className="field-group"><label className="field-label">월</label><input type="number" className="field-input" value={birth.month} onChange={(e) => setBirth({ ...birth, month: Number(e.target.value) })} /></div>
            <div className="field-group"><label className="field-label">일</label><input type="number" className="field-input" value={birth.day} onChange={(e) => setBirth({ ...birth, day: Number(e.target.value) })} /></div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setSubmitted(true)}>별자리 확인</button>
        </div>

        {submitted && (
          <div className="card" style={{ background: "linear-gradient(135deg, #2A1F18, #1A1310)", color: "var(--paper)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em" }}>YOUR SIGN</div>
                <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 900, fontSize: 48, color: "var(--gold)", margin: "8px 0" }}>{sign.name}</h2>
                <div style={{ fontFamily: "var(--font-hanja)", fontSize: 28, color: "rgba(255,255,255,0.7)" }}>{sign.hanja}</div>
              </div>
              <div style={{ fontFamily: "var(--font-hanja)", fontSize: 120, fontWeight: 900, color: "rgba(176,136,71,0.15)" }}>星</div>
            </div>
            <p style={{ marginTop: 20, fontSize: 14, color: "rgba(250,247,242,0.85)" }}><strong>성향:</strong> {sign.trait}</p>
            <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.7, color: "rgba(250,247,242,0.85)" }}><strong>오늘의 한 줄:</strong> {sign.today}</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
