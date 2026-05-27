import Link from "next/link";

export function OracleBanner() {
  return (
    <section style={{ padding: "0 0 60px" }}>
      <div className="container-x">
        <div className="oracle-banner">
          <div className="oracle-banner-grid">
            <div>
              <span className="oracle-eyebrow">TAROT ORACLE · 오늘의 점사</span>
              <h2>
                오라클이 당신을<br />
                <span style={{ color: "#F4D17C" }}>기다리고 있어요.</span>
              </h2>
              <p>
                마음에 떠오르는 질문 하나를 들고, 카드 세 장만 골라보세요.
                과거·현재·미래의 흐름을 명리만의 동양 명리적 시선으로 풀어드립니다.
              </p>
              <div className="oracle-banner-feats">
                <div className="feat">
                  <span className="feat-num">78</span>
                  <span className="feat-label">라이더-웨이트 덱</span>
                </div>
                <div className="feat">
                  <span className="feat-num">3</span>
                  <span className="feat-label">과거·현재·미래</span>
                </div>
                <div className="feat">
                  <span className="feat-num">∞</span>
                  <span className="feat-label">무제한 무료</span>
                </div>
              </div>
              <Link href="/tarot" className="btn btn-gold btn-lg" style={{ marginTop: 28 }}>
                <span style={{ fontFamily: "var(--font-hanja)", fontWeight: 900 }}>塔</span>
                지금 카드 뽑기
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="oracle-banner-art">
              <OracleCharacter />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OracleCharacter() {
  return (
    <svg width="320" height="380" viewBox="0 0 320 380" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4E9D2" />
          <stop offset="1" stopColor="#E5D4AB" />
        </linearGradient>
      </defs>
      <rect width="320" height="380" rx="20" fill="url(#bg-grad)" />
      <text x="50%" y="38" textAnchor="middle" fontFamily="serif" fontSize="14" fill="#8C6B33" letterSpacing="6">美 人 圖</text>
      <ellipse cx="160" cy="135" rx="58" ry="68" fill="#1A1310" />
      <ellipse cx="160" cy="160" rx="46" ry="56" fill="#F5E6D3" />
      <path d="M 130 115 Q 160 105 190 115 L 190 145 L 130 145 Z" fill="#1A1310" />
      <circle cx="118" cy="125" r="4" fill="#C84B3A" />
      <circle cx="202" cy="125" r="4" fill="#C84B3A" />
      <ellipse cx="142" cy="160" rx="3" ry="1.5" fill="#1A1310" />
      <ellipse cx="178" cy="160" rx="3" ry="1.5" fill="#1A1310" />
      <ellipse cx="160" cy="185" rx="6" ry="2.5" fill="#C84B3A" />
      <path d="M 110 230 Q 160 215 210 230 L 215 285 Q 160 295 105 285 Z" fill="#E8A4B5" />
      <path d="M 145 235 Q 160 232 175 235 L 165 250 Q 160 252 155 250 Z" fill="#FFFFFF" />
      <path d="M 95 285 Q 160 290 225 285 L 235 360 L 85 360 Z" fill="#3A2A1F" />
      <rect x="142" y="335" width="22" height="22" rx="2" fill="#C84B3A" />
      <text x="153" y="350" textAnchor="middle" fontFamily="serif" fontSize="10" fontWeight="900" fill="#FAF7F2">命理</text>
    </svg>
  );
}
