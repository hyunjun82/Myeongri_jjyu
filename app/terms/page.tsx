import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="container-narrow" style={{ padding: "60px 24px 80px" }}>
        <h1 className="section-title" style={{ marginBottom: 30 }}>이용약관</h1>
        <div style={{ fontSize: 14.5, lineHeight: 1.85, color: "var(--ink-2)" }}>
          <h3 style={{ fontFamily: "var(--font-serif)", marginTop: 24 }}>제1조 (목적)</h3>
          <p>본 약관은 명리(MYEONGRI, 이하 &ldquo;서비스&rdquo;)의 이용 조건을 규정합니다.</p>
          <h3 style={{ fontFamily: "var(--font-serif)", marginTop: 24 }}>제2조 (서비스 내용)</h3>
          <p>본 서비스는 한국천문연구원(KASI) 공공데이터를 활용한 사주명리 풀이를 무료로 제공합니다.</p>
          <h3 style={{ fontFamily: "var(--font-serif)", marginTop: 24 }}>제3조 (면책)</h3>
          <p>모든 풀이는 참고·재미 목적이며 의료·법률·재무·연애 등의 중요한 결정은 사용자 본인의 책임 하에 이루어져야 합니다. 풀이 결과로 인한 일체의 손해에 대해 서비스 제공자는 책임지지 않습니다.</p>
          <h3 style={{ fontFamily: "var(--font-serif)", marginTop: 24 }}>제4조 (금지 행위)</h3>
          <p>서비스의 자동화된 무단 크롤링, 콘텐츠 무단 복제·재배포는 금지됩니다.</p>
          <p style={{ marginTop: 30, fontSize: 12, color: "var(--ink-3)" }}>시행일: 2026년 5월 27일</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
