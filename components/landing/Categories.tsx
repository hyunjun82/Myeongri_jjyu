import Link from "next/link";
import { AdSlot } from "../AdSlot";

const cats = [
  { hanja: "命", label: "MENU 01", name: "평생사주", desc: "타고난 8자에 담긴 천명과 인생의 큰 흐름을 풀이합니다.", elem: "wood",  span: 4, dark: true,  href: "/saju" },
  { hanja: "日", label: "MENU 02", name: "오늘의 운세", desc: "오늘 하루 무엇에 집중하고 무엇을 피해야 할지.",       elem: "fire",  span: 4,                href: "/today" },
  { hanja: "月", label: "MENU 03", name: "월별 운세",   desc: "이번 달부터 12개월, 매월의 흐름을 미리 봅니다.",     elem: "earth", span: 4,                href: "/monthly" },
  { hanja: "歲", label: "MENU 04", name: "신년 운세",   desc: "올 한 해 세운(歲運)의 큰 그림. 직장·재물·인연.",     elem: "metal", span: 3,                href: "/sewoon" },
  { hanja: "合", label: "MENU 05", name: "궁합",       desc: "두 사람의 8자가 만나는 자리. 연인·부부·동업자.",     elem: "fire",  span: 3,                href: "/gunghap" },
  { hanja: "塔", label: "MENU 06", name: "타로",       desc: "78장 타로 카드로 보는 지금 이 순간의 답.",           elem: "water", span: 3,                href: "/tarot" },
  { hanja: "名", label: "MENU 07", name: "작명·개명",  desc: "사주 균형을 보완하는 이름. 아이·법인·예명.",          elem: "wood",  span: 3,                href: "/naming" },
  { hanja: "夢", label: "MENU 08", name: "꿈해몽",     desc: "한국 전통 해몽으로 푸는 꿈의 상징.",                  elem: "metal", span: 4,                href: "/dream" },
  { hanja: "星", label: "MENU 09", name: "별자리·서양", desc: "12별자리와 MBTI까지 — 오늘의 글로벌 운세.",         elem: "water", span: 4,                href: "/zodiac" },
  { hanja: "占", label: "MENU 10", name: "신년 토정비결", desc: "정월부터 섣달까지, 매월 운기와 신수.",            elem: "earth", span: 4, dark: true, href: "/tojung" },
];

export function Categories() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="section-header row">
          <div>
            <span className="eyebrow">CATEGORIES · 운세 카테고리</span>
            <h2 className="section-title">
              필요한 답이<br />
              <span className="hanja-inline">十</span>가지 모두 모여있습니다.
            </h2>
          </div>
          <p className="section-desc">
            평생사주부터 오늘의 운세, 궁합과 타로, 작명까지.
            모든 카테고리를 회원가입 없이 무료로 이용할 수 있어요.
          </p>
        </div>

        <div className="cat-grid">
          {cats.map((c, i) => (
            <Link
              key={i}
              href={c.href}
              className={`cat-card span-${c.span}${c.dark ? " dark" : ""}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="cat-top">
                <div className={`cat-icon elem-${c.elem}`}>{c.hanja}</div>
                <span className="cat-label">{c.label}</span>
              </div>
              <div>
                <div className="cat-name">{c.name}</div>
                <div className="cat-desc">{c.desc}</div>
                <div className="cat-cta">
                  바로 보기
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="cat-hanja">{c.hanja}</div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 32 }}>
          <AdSlot label="중간 디스플레이" size="1240 × 110" />
        </div>
      </div>
    </section>
  );
}
