export function Testimonials() {
  const items = [
    { body: "결혼 전에 궁합 보러 들어왔다가 평생사주까지 보고 갔어요. 무료라는 게 믿기지 않을 만큼 디테일하게 나와요.", name: "박지은", detail: "30대 · 마케터", avatar: "박" },
    { body: "월별 운세가 진짜 신기할 정도로 맞아요. 9월에 변동수 있다고 했는데 정말 이직 제안 받았습니다.", name: "김도현", detail: "20대 · 개발자", avatar: "김" },
    { body: "어머니께 보여드렸더니 한자도 같이 나와서 좋다고 하셨어요. 전통 명리학 그대로면서 보기 편해요.", name: "이수민", detail: "40대 · 자영업", avatar: "이" },
  ];
  return (
    <section className="section" style={{ background: "var(--paper-2)" }}>
      <div className="container-x">
        <div className="section-header center">
          <span className="eyebrow">REVIEWS · 사용자 후기</span>
          <h2 className="section-title" style={{ textAlign: "center" }}>12만 명이 매달 명리를 찾는 이유</h2>
        </div>
        <div className="testi-grid">
          {items.map((t, i) => (
            <article key={i} className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-body">&ldquo;{t.body}&rdquo;</p>
              <div className="testi-foot">
                <div className="testi-avatar">{t.avatar}</div>
                <div className="testi-meta">
                  <span className="testi-name">{t.name}</span>
                  <span className="testi-detail">{t.detail}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
