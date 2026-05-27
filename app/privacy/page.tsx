import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="container-narrow" style={{ padding: "60px 24px 80px" }}>
        <h1 className="section-title" style={{ marginBottom: 30 }}>개인정보처리방침</h1>
        <div style={{ fontSize: 14.5, lineHeight: 1.85, color: "var(--ink-2)" }}>
          <h3 style={{ fontFamily: "var(--font-serif)", marginTop: 24 }}>1. 수집하는 개인정보</h3>
          <p>본 서비스는 회원가입을 받지 않으며, 사주 계산을 위한 생년월일·성별·이름은 브라우저에만 임시 저장됩니다. 서버에 저장하지 않습니다.</p>
          <h3 style={{ fontFamily: "var(--font-serif)", marginTop: 24 }}>2. 쿠키 및 광고</h3>
          <p>본 사이트는 Google AdSense 광고를 게재하며, Google 및 협력사가 쿠키를 사용해 광고를 표시할 수 있습니다. 사용자는 브라우저 설정에서 쿠키를 차단할 수 있습니다.</p>
          <h3 style={{ fontFamily: "var(--font-serif)", marginTop: 24 }}>3. 외부 API</h3>
          <p>사주 8자 계산을 위해 한국천문연구원(KASI) 공공데이터 API를 사용합니다. 생년월일은 KASI 서버로 전달되며, 식별 정보(이름·성별)는 전달되지 않습니다.</p>
          <h3 style={{ fontFamily: "var(--font-serif)", marginTop: 24 }}>4. 면책</h3>
          <p>본 서비스의 모든 풀이는 참고·재미 목적이며 의료·법률·재무 결정의 근거가 될 수 없습니다.</p>
          <p style={{ marginTop: 30, fontSize: 12, color: "var(--ink-3)" }}>최종 수정일: 2026년 5월 27일</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
