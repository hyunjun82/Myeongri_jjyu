import Link from "next/link";
import { PillarsVisual } from "../PillarsVisual";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-glyph tl">命</div>
      <div className="hero-bg-glyph br">理</div>
      <div className="container-x">
        <div className="hero-grid">
          <div>
            <span className="chip">
              <span className="chip-dot pulse" style={{ background: "var(--wood)", color: "var(--wood)" }} />
              오늘 23,418명이 운세를 확인했어요
            </span>
            <h1>
              <span className="hanja-inline">八字</span>에 담긴<br />
              나의 흐름을<br />
              <span className="accent">정확히</span> 읽어드립니다.
            </h1>
            <p className="hero-sub">
              한국천문연구원 만세력 기반으로 정확한 사주 8자를 계산합니다.
              총운·재물운·애정운·월별 운세까지 — 가장 신뢰받는 명리학 도구를
              완전 무료로 만나보세요.
            </p>
            <div className="hero-cta-row">
              <Link href="/saju" className="btn btn-primary btn-lg">
                무료로 사주 보기
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/tarot" className="btn btn-secondary btn-lg">
                <span style={{ fontFamily: "var(--font-hanja)", fontWeight: 900 }}>塔</span>
                타로 카드 뽑기
              </Link>
            </div>
            <div className="hero-meta">
              <div>
                <div className="hero-meta-num">12,400,000<span style={{ color: "var(--gold)", fontSize: 18 }}>+</span></div>
                <div className="hero-meta-label">누적 사주 풀이</div>
              </div>
              <div className="hero-divider" />
              <div>
                <div className="hero-meta-num">4.8<span style={{ color: "var(--gold)", fontSize: 18 }}>/5</span></div>
                <div className="hero-meta-label">평균 만족도</div>
              </div>
              <div className="hero-divider" />
              <div>
                <div className="hero-meta-num">100<span style={{ color: "var(--gold)", fontSize: 18 }}>%</span></div>
                <div className="hero-meta-label">완전 무료</div>
              </div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <PillarsVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
