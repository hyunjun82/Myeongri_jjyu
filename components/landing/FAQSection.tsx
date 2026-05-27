"use client";
import { useState } from "react";

const qa = [
  { q: "정말 모든 기능이 무료인가요?", a: "네. 평생사주·궁합·월별운세·타로 등 모든 카테고리를 회원가입 없이 무료로 이용할 수 있습니다. 사이트 운영은 광고 수익으로 이루어집니다." },
  { q: "사주 계산은 얼마나 정확한가요?", a: "한국천문연구원의 음양력 데이터(KASI)를 기반으로 정확하게 8자를 계산합니다. 절기 기준 월주까지 반영합니다." },
  { q: "태어난 시간을 모르는데 풀이가 가능한가요?", a: "가능합니다. 시주(時柱)를 제외한 6자만으로도 평생의 큰 흐름과 성격, 직업 성향을 살펴볼 수 있어요. 단 시간을 알면 더 정밀한 풀이가 나옵니다." },
  { q: "입력한 개인정보는 안전한가요?", a: "생년월일은 풀이 계산 후 서버에 저장되지 않으며 브라우저에만 임시 저장됩니다. 회원가입을 하지 않는 한 어떤 식별 정보도 수집하지 않습니다." },
  { q: "한자가 어려운데 한글로만 볼 수 있나요?", a: "결과 화면 상단의 표시 옵션에서 '한글만' 모드를 선택하시면 한글 + 한자 병기 또는 한글 단독 표시로 전환할 수 있습니다." },
  { q: "풀이를 그대로 믿어도 되나요?", a: "사주는 인생의 큰 흐름을 참고하는 도구입니다. 의료·법률·재무 등 중요한 결정은 반드시 전문가의 도움을 받으세요." },
];

export function FAQSection() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section className="section">
      <div className="container-narrow">
        <div className="section-header center">
          <span className="eyebrow">FAQ · 자주 묻는 질문</span>
          <h2 className="section-title" style={{ textAlign: "center" }}>궁금한 것들</h2>
        </div>
        <div className="faq-list">
          {qa.map((item, i) => (
            <div key={i} className={`faq-item${open === i ? " open" : ""}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="faq-q">
                <span>{item.q}</span>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
