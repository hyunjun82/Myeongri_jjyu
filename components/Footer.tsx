import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container-x">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="brand">
              <div className="brand-mark"><span>命</span></div>
              <div className="brand-text">
                <div className="brand-name">명리</div>
                <div className="brand-sub">MYEONGRI · 命理</div>
              </div>
            </div>
            <p className="footer-about">
              한국천문연구원(KASI) 만세력 기반의 정통 사주 명리 서비스.
              회원가입 없이 누구나 무료로 이용할 수 있습니다.
            </p>
          </div>
          <div className="footer-col">
            <h4>사주풀이</h4>
            <ul>
              <li><Link href="/saju">평생사주</Link></li>
              <li><Link href="/today">오늘의 운세</Link></li>
              <li><Link href="/sewoon">신년 운세</Link></li>
              <li><Link href="/monthly">월별 운세</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>추가 서비스</h4>
            <ul>
              <li><Link href="/gunghap">궁합</Link></li>
              <li><Link href="/tarot">타로</Link></li>
              <li><Link href="/naming">작명·개명</Link></li>
              <li><Link href="/dream">꿈해몽</Link></li>
              <li><Link href="/zodiac">별자리</Link></li>
              <li><Link href="/tojung">토정비결</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>회사</h4>
            <ul>
              <li><Link href="/magazine">매거진</Link></li>
              <li><Link href="/terms">이용약관</Link></li>
              <li><Link href="/privacy">개인정보처리방침</Link></li>
              <li><Link href="/contact">문의</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 MYEONGRI · 명리. 사주 계산 데이터는 KASI(한국천문연구원) 기반.</span>
          <span style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}>v0.1.0 · KST</span>
        </div>
      </div>
    </footer>
  );
}
