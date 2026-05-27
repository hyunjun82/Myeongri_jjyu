export function HowItWorks() {
  const steps = [
    { num: "一", label: "STEP 01", title: "생년월일시 입력",
      desc: "양력·음력 선택 후 태어난 연·월·일·시를 입력합니다. 시간을 모르면 시주 없이도 풀이 가능해요." },
    { num: "二", label: "STEP 02", title: "8자 자동 계산",
      desc: "한국천문연구원 만세력으로 정확한 사주 8자, 일간, 오행 분포, 대운까지 한 번에 분석합니다." },
    { num: "三", label: "STEP 03", title: "맞춤 풀이 확인",
      desc: "총운·재물·애정·직장·건강·월별 운세까지. 카테고리별로 깊이 있는 해석을 무료로 제공해요." },
  ];

  return (
    <section className="section how-section">
      <div className="container-x">
        <div className="section-header center">
          <span className="eyebrow">HOW IT WORKS · 보는 법</span>
          <h2 className="section-title" style={{ textAlign: "center" }}>30초면 충분합니다</h2>
          <p className="section-desc" style={{ textAlign: "center", margin: "0 auto" }}>
            생년월일과 태어난 시간만 알려주세요. 나머지는 명리가 계산합니다.
          </p>
        </div>
        <div className="how-grid">
          {steps.map((s, i) => (
            <div className="how-step" key={i}>
              <div className="how-num"><span className="num-circle">{s.num}</span>{s.label}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
