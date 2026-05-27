export function TrustStrip() {
  const stats = [
    { num: "12.4", suffix: "M+",    label: "누적 사주 풀이" },
    { num: "120",  suffix: "K",     label: "월 활성 사용자" },
    { num: "4.8",  suffix: "/5.0",  label: "평균 만족도" },
    { num: "1391", suffix: "→2050", label: "지원 음양력 범위" },
  ];
  return (
    <section className="trust-strip">
      <div className="container-x">
        <div className="trust-grid">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="trust-num">{s.num}<span className="suffix">{s.suffix}</span></div>
              <div className="trust-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
