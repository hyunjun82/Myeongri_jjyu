"use client";
import Link from "next/link";

export function Nav() {
  return (
    <header className="nav">
      <div className="container-x nav-inner">
        <Link href="/" className="brand">
          <div className="brand-mark"><span>命</span></div>
          <div className="brand-text">
            <div className="brand-name">명리</div>
            <div className="brand-sub">MYEONGRI · 命理</div>
          </div>
        </Link>
        <nav className="nav-links">
          <Link href="/saju" className="nav-link">사주풀이</Link>
          <Link href="/today" className="nav-link">오늘의 운세</Link>
          <Link href="/monthly" className="nav-link">월별 운세</Link>
          <Link href="/gunghap" className="nav-link">궁합</Link>
          <Link href="/tarot" className="nav-link">타로</Link>
          <Link href="/magazine" className="nav-link">매거진</Link>
        </nav>
        <Link href="/saju" className="nav-cta">
          내 사주 보기
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
