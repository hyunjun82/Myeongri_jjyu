import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="container-narrow" style={{ padding: "60px 24px 80px" }}>
        <span className="eyebrow">CONTACT · 문의</span>
        <h1 className="section-title" style={{ marginBottom: 30 }}>연락처</h1>
        <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--ink-2)" }}>
          서비스 관련 문의, 제휴, 광고 협의는 아래 이메일로 연락해주세요.
        </p>
        <p style={{ marginTop: 20, fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--accent)" }}>
          contact@jjyu.co.kr
        </p>
      </main>
      <Footer />
    </>
  );
}
