import type { Pillars } from "@/lib/saju";

const SAMPLE: Pillars = {
  year:  { stem: { hanja: "甲", ko: "갑", elem: "wood",  yin: false, romaji: "GAP" },     branch: { hanja: "子", ko: "자", elem: "water", animal: "쥐", animalEn: "RAT",    hourLo: 23, hourHi: 1 } },
  month: { stem: { hanja: "丙", ko: "병", elem: "fire",  yin: false, romaji: "BYEONG" },  branch: { hanja: "寅", ko: "인", elem: "wood",  animal: "호랑이", animalEn: "TIGER",  hourLo: 3,  hourHi: 5 } },
  day:   { stem: { hanja: "庚", ko: "경", elem: "metal", yin: false, romaji: "GYEONG" },  branch: { hanja: "辰", ko: "진", elem: "earth", animal: "용", animalEn: "DRAGON", hourLo: 7,  hourHi: 9 } },
  hour:  { stem: { hanja: "壬", ko: "임", elem: "water", yin: false, romaji: "IM" },      branch: { hanja: "午", ko: "오", elem: "fire",  animal: "말", animalEn: "HORSE",  hourLo: 11, hourHi: 13 } },
};

const ELEM_HAN = { wood: "木", fire: "火", earth: "土", metal: "金", water: "水" } as const;

export function PillarsVisual({
  data,
  includeSeal = true,
}: {
  data?: Pillars;
  includeSeal?: boolean;
}) {
  const pillars = data || SAMPLE;
  const order = ["year", "month", "day", "hour"] as const;
  const labels = { year: "年柱", month: "月柱", day: "日柱", hour: "時柱" };

  return (
    <div className="pillars">
      <div className="pillars-header">
        <div className="pillars-title">命 · 八字</div>
        <div className="pillars-sub">SAJU · LIVE</div>
      </div>
      <div className="pillars-grid">
        {order.map((k) => (
          <div className="pillar-col" key={k}>
            <div className="pillar-label">{labels[k]}</div>
            <div className={`pillar-cell elem-${pillars[k].stem.elem}`}>
              <span className="ko">{pillars[k].stem.ko}</span>
              {pillars[k].stem.hanja}
              <span className="romanize">{pillars[k].stem.romaji}</span>
            </div>
            <div className={`pillar-cell elem-${pillars[k].branch.elem}`}>
              <span className="ko">{pillars[k].branch.ko}</span>
              {pillars[k].branch.hanja}
              <span className="romanize">{pillars[k].branch.animalEn}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="pillars-footer">
        <div>
          <div className="pf-label">日干 · 일간</div>
          <div className="pf-val">
            <span className="accent">{pillars.day.stem.hanja}</span>
            {" "}{pillars.day.stem.ko}
            <span style={{ opacity: 0.6 }}> · {ELEM_HAN[pillars.day.stem.elem]}</span>
          </div>
        </div>
        <div>
          <div className="pf-label">用神 · 용신</div>
          <div className="pf-val"><span className="accent">財</span> 재성 · 정재</div>
        </div>
        <div>
          <div className="pf-label">大運 · 대운</div>
          <div className="pf-val">37 → 47세 <span className="accent">癸亥</span></div>
        </div>
      </div>
      {includeSeal && <div className="seal">命<br />理</div>}
    </div>
  );
}
