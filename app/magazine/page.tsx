import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const POSTS = [
  { slug: "ilgan-overview", title: "10일간 완벽 가이드 — 갑·을·병·정·무·기·경·신·임·계", excerpt: "사주의 핵심인 일간 10가지를 한 페이지에 정리했습니다.", category: "기초" },
  { slug: "what-is-daewoon", title: "대운(大運)이 뭔가요? 10년 주기 인생 흐름의 이해", excerpt: "사주를 보면 자주 듣는 '대운'의 의미와 활용법을 풀어드립니다.", category: "기초" },
  { slug: "wealth-elements", title: "재물운에 좋은 오행은? 색·방향·습관으로 보완하기", excerpt: "사주에 부족한 오행을 일상에서 채우는 실용적 방법.", category: "실전" },
  { slug: "60gapja-list",   title: "60갑자 일주별 특징 한눈에 보기", excerpt: "갑자부터 계해까지 60일주의 핵심 키워드.", category: "참고" },
  { slug: "marriage-compat",title: "결혼 전 꼭 봐야 할 궁합 체크리스트 5가지", excerpt: "단순한 띠궁합 너머의 진짜 궁합 보는 법.", category: "실전" },
  { slug: "kasi-explained", title: "한국천문연구원 만세력이 정확한 이유", excerpt: "사주 계산의 기준이 되는 KASI 데이터 이야기.", category: "참고" },
];

export default function MagazinePage() {
  return (
    <>
      <Nav />
      <main className="container-x" style={{ padding: "60px 24px 80px" }}>
        <span className="eyebrow">MAGAZINE · 매거진</span>
        <h1 className="section-title" style={{ marginBottom: 30 }}>명리 매거진</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {POSTS.map((p) => (
            <Link key={p.slug} href={`/magazine/${p.slug}`} className="card" style={{ textDecoration: "none", color: "inherit" }}>
              <span className="chip" style={{ background: "var(--paper-2)" }}>{p.category}</span>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700, margin: "12px 0 8px" }}>{p.title}</h3>
              <p style={{ fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.7 }}>{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
