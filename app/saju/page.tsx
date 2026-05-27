"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ZODIAC = ["쥐","소","호랑이","토끼","용","뱀","말","양","원숭이","닭","개","돼지"];

export default function SajuInputPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    gender: "F" as "M" | "F",
    calendar: "solar" as "solar" | "lunar",
    year: 1993,
    month: 6,
    day: 14,
    hour: 8,
    knowHour: true,
  });
  const STEPS = 3;

  const update = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));

  const handleNext = () => {
    if (step === STEPS - 1) {
      // 결과 페이지로 이동 — query string으로 전달
      const params = new URLSearchParams({
        name: form.name,
        gender: form.gender,
        calendar: form.calendar,
        year: String(form.year),
        month: String(form.month),
        day: String(form.day),
        hour: form.knowHour ? String(form.hour) : "12",
        knowHour: String(form.knowHour),
      });
      router.push(`/saju/result?${params.toString()}`);
    } else {
      setStep(step + 1);
    }
  };
  const handlePrev = () => (step === 0 ? router.push("/") : setStep(step - 1));

  return (
    <div className="input-shell">
      <header className="input-header">
        <Link href="/" className="brand">
          <div className="brand-mark"><span>命</span></div>
          <div className="brand-text">
            <div className="brand-name">명리</div>
            <div className="brand-sub">MYEONGRI · 命理</div>
          </div>
        </Link>
        <div className="input-progress-mini">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div key={i} className={`step-pill${i === step ? " active" : ""}${i < step ? " done" : ""}`}>
              <span className="step-pill-num">{i + 1}</span>
              <span className="step-pill-label">{["기본 정보", "생년월일", "태어난 시간"][i]}</span>
            </div>
          ))}
        </div>
        <Link href="/" className="input-close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </Link>
      </header>

      <div className="input-main">
        <aside className="input-aside">
          <div className="input-aside-card">
            <div style={{ fontFamily: "var(--font-hanja)", fontSize: 80, fontWeight: 900, color: "var(--gold)" }}>命</div>
            <div className="input-aside-quote">
              <div className="quote-mark">「</div>
              {step === 0 && <><h4>당신의 별을 찾는 시간</h4><p>먼저, 당신이 누구인지 알려주세요. 사주의 첫 글자는 당신의 정체성에서 시작됩니다.</p></>}
              {step === 1 && <><h4>하늘이 정한 날</h4><p>당신이 태어난 그날의 천간과 지지를 찾습니다. 이 날짜가 평생의 큰 흐름을 결정해요.</p></>}
              {step === 2 && <><h4>마지막 한 글자</h4><p>태어난 시간이 시주(時柱)가 됩니다. 모르시면 시주 없이 6자로도 풀이됩니다.</p></>}
            </div>
          </div>
        </aside>

        <section className="input-form-area">
          {step === 0 && (
            <>
              <h2 className="section-title" style={{ fontSize: 32, marginBottom: 24 }}>당신은 누구신가요?</h2>
              <div className="field-group" style={{ marginBottom: 18 }}>
                <label className="field-label">이름 또는 닉네임</label>
                <input className="field-input" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="홍길동" />
              </div>
              <div className="field-group" style={{ marginBottom: 18 }}>
                <label className="field-label">성별</label>
                <div className="toggle-row">
                  <button className={`toggle-btn${form.gender === "F" ? " active" : ""}`} onClick={() => update("gender", "F")}>여성</button>
                  <button className={`toggle-btn${form.gender === "M" ? " active" : ""}`} onClick={() => update("gender", "M")}>남성</button>
                </div>
              </div>
              <div className="field-group">
                <label className="field-label">양력 / 음력</label>
                <div className="toggle-row">
                  <button className={`toggle-btn${form.calendar === "solar" ? " active" : ""}`} onClick={() => update("calendar", "solar")}>양력</button>
                  <button className={`toggle-btn${form.calendar === "lunar" ? " active" : ""}`} onClick={() => update("calendar", "lunar")}>음력</button>
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="section-title" style={{ fontSize: 32, marginBottom: 24 }}>태어난 날짜</h2>
              <div className="form-row">
                <div className="field-group">
                  <label className="field-label">연</label>
                  <input type="number" className="field-input" value={form.year} onChange={(e) => update("year", Number(e.target.value))} min={1391} max={2050} />
                </div>
                <div className="field-group">
                  <label className="field-label">월</label>
                  <input type="number" className="field-input" value={form.month} onChange={(e) => update("month", Number(e.target.value))} min={1} max={12} />
                </div>
                <div className="field-group">
                  <label className="field-label">일</label>
                  <input type="number" className="field-input" value={form.day} onChange={(e) => update("day", Number(e.target.value))} min={1} max={31} />
                </div>
              </div>
              <p style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 8 }}>
                {form.calendar === "solar" ? "양력" : "음력"} {form.year}년 {form.month}월 {form.day}일
            </p>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="section-title" style={{ fontSize: 32, marginBottom: 24 }}>태어난 시간</h2>
              <div className="field-group" style={{ marginBottom: 18 }}>
                <label className="field-label">쓬쉱음 었솨요?</label>
                <div className="toggle-row">
                  <button className={`toggle-btn${form.knowHour ? " active" : ""}`} onClick={() => update("knowHour", true)}>알아요</button>
                  <button className={`toggle-btn${!form.knowHour ? " active" : ""}`} onClick={() => update("knowHour", false)}>몰라요 (시주 제외)</button>
                </div>
              </div>
              {form.knowHour && (
                <div className="field-group">
                  <label className="field-label">시진 선택</label>
                  <select className="field-input" value={form.hour} onChange={(e) => update("hour", Number(e.target.value))}>
                    {ZODIAC.map((z, i) => {
                      const lo = (i * 2 + 23) % 24;
                      const hi = (lo + 2) % 24;
                      const h = (lo + 1) % 24;
                      return <option key={i} value={h}>{z}시 ({String(lo).padStart(2,"0")}:00 ~ {String(hi).padStart(2,"0")}:00)</option>;
                    })}
                  </select>
                </div>
              )}
            </>
          )}

          <div className="input-nav">
            <button className="btn btn-secondary" onClick={handlePrev}>{step === 0 ? "취소" : "이전"}</button>
            <button className="btn btn-primary" onClick={handleNext} style={{ flex: 1 }}>
              {step === STEPS - 1 ? "사주 풀이 보기" : "다음"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
