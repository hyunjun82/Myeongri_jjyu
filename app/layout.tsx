import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://myeongri.jjyu.co.kr"),
  title: {
    default: "명리 · MYEONGRI — 8자에 담긴 당신의 흐름",
    template: "%s | 명리 · MYEONGRI",
  },
  description:
    "한국천문연구원(KASI) 만세력 기반의 정확한 사주 8자 계산. 평생사주·궁합·타로·작명까지 모두 무료. 회원가입 없이 이용 가능합니다.",
  keywords: [
    "사주",
    "사주풀이",
    "명리학",
    "만세력",
    "궁합",
    "오늘의 운세",
    "월별 운세",
    "신년 운세",
    "타로",
    "토정비결",
    "작명",
    "꿈해몽",
    "별자리",
  ],
  openGraph: {
    title: "명리 · MYEONGRI",
    description: "8자에 담긴 당신의 흐름을 정확히 읽어드립니다.",
    url: "https://myeongri.jjyu.co.kr",
    siteName: "명리 · MYEONGRI",
    locale: "ko_KR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;900&family=Noto+Serif+KR:wght@400;500;700;900&family=Noto+Serif+TC:wght@500;700;900&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
