import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://myeongri.jjyu.co.kr";
  const routes = ["", "/saju", "/today", "/monthly", "/sewoon", "/gunghap", "/tarot", "/naming", "/dream", "/zodiac", "/tojung", "/magazine", "/privacy", "/terms", "/contact"];
  const now = new Date();
  return routes.map((r) => ({
    url: base + r,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1.0 : 0.7,
  }));
}
