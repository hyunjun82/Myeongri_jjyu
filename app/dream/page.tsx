"use client";
import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const DREAM_DICT: Record<string, { type: "길몽" | "흉몽" | "변동"; meaning: string }> = {
  "뱀":    { type: "길몽", meaning: "재물운 상승. 임신 또는 새 사업 기회를 암시합니다." },
  "용":    { type: "길몽", meaning: "큰 명예와 성취. 윗사람의 도움을 받게 됩니다." },
  "돼지":  { type: "길몽", meaning: "재물이 들어오는 강력한 길몽. 횡재수가 있어요." },
  "물":    { type: "변동", meaning: "감정의 변화. 맑은 물은 길조, 흐린 물은 주의." },
  "불":    { type: "변동", meaning: "큰 변화의 신호. 타오르는 불은 길조, 꺼지는 불은 흉조." },
  "치아":  { type: "흉몽", meaning: "건강 주의 또는 가까운 사람의 변화. 한 번 더 점검을." },
  "머리":  { type: "변동", meaning: "긴 머리는 장수, 잘리는 머리는 일의 매듭을 의미." },
  "돈":    { type: "변동", meaning: "줍는 돈은 손실, 잃는 돈은 오히려 재물이 들어옵니다." },
  "결혼":  { type: "변동", meaning: "관계의 큰 변화. 미혼은 인연, 기혼은 새 시작." },
  "죽음":  { type: "길몽", meaning: "오해와 달리 길몽입니다. 묵은 것이 끝나고 새 시작이 옵니다." },
  "별":    { type: "길몽", meaning: "희망과 영감. 자녀운 또는 명성과 연결됩니다." },
  "해":    { type: "길몽", meaning: "권위와 명예. 떠오르는 해는 강력한 길조." },
  "달":    { type: "변동", meaning: "감정의 흐름. 보름달은 길조, 일그러진 달은 주의." },
  "산":    { type: "길몽", meaning: "안정과 성취. 오르는 산은 발전, 내려오는 산은 마무리." },
  "강":    { type: "변동", meaning: "인생의 큰 흐름. 건너는 강은 큰 변화의 시작." },
  "꽃":    { type: "길몽", meaning: "기쁜 소식과 만남. 시드는 꽃은 마음의 정리를 권합니다." },
  "비":    { type: "변동", meaning: "감정 정화. 봄비는 길조, 폭우는 잠시 멈춤이 필요." },
  "나무":  { type: "길몽", meaning: "성장과 안정. 큰 나무는 든든한 후원자를 의미합니다." },
  "개":    { type: "변동", meaning: "충직한 관계 또는 다툼. 검은 개는 주의, 흰 개는 길조." },
  "고양이":{ type: "변동", meaning: "직관과 비밀. 검은 고양이는 경고, 흰 고양이는 행운." },
};

export default function DreamPage() {
  const [text, setText] = useState("");
  const [hits, setHits] = useState<Array<[string, { type: string; meaning: string }]>>([]);

  const analyze = () => {
    const found = Object.entries(DREAM_DICT).filter(([key]) => text.includes(key));
    setHits(found);
  };

  return (
    <>
      <Nav />
      <main className="container-x" style={{ padding: "60px 24px 80px" }}>
        <span className="eyebrow">DREAM · 꿈해몽</span>
        <h1 className="section-title" style={{ marginBottom: 24 }}>한국 전통 해몽으로 푸는 꿈</h1>
        <p style={{ color: "var(--ink-3)", maxWidth: 600, marginBottom: 30 }}>
          어젯밤 꾸었던 꿈의 내용을 적어주세요. 한국 전통 해몽 사전에서 핵심 상징을 찾아 풀이해드립니다.
        </p>

        <div className="card" style={{ marginBottom: 24 }}>
          <label className="field-label" style={{ marginBottom: 6, display: "block" }}>꿈 내용</label>
          <textarea
            className="field-input"
            style={{ width: "100%", minHeight: 140, fontFamily: "var(--font-sans)" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="예: 어머니가 큰 뱀에게 돈을 받는 꿈을 꿨어요"
          />
          <button className="btn btn-primary" style={{ marginTop: 14 }} onClick={analyze}>해석하기</button>
        </div>

        {hits.length > 0 && (
          <>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 22, marginBottom: 16 }}>발견된 상징 {hits.length}개</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
              {hits.map(([key, v], i) => (
                <div key={i} className="card">
                  <h4 style={{ fontFamily: "var(--font-serif)", fontSize: 18, marginBottom: 6 }}>{key}</h4>
                  <p style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.7 }}>{v.meaning}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {text && hits.length === 0 && (
          <p style={{ color: "var(--ink-3)", marginTop: 20 }}>해석할 만한 상징을 찾지 못했어요.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
