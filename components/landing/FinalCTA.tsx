import Link from "next/link";

export function FinalCTA() {
  return (
    <section style={{ padding: "0 0 80px" }}>
      <div className="container-x">
        <div className="final-cta">
          <div className="final-cta-glyph">命</div>
          <div className="final-cta-inner">
            <h2>
              이제, <span className="accent">당신의 八字</span>가<br />
              어떤 그림을 그리는지<br />
              직접 확인할 시간.
            </h2>
            <Link href="/saju" className="btn btn-gold btn-lg">
              지금 무료로 시작하기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
