export function AdSlot({
  label = "Google AdSense",
  size = "",
}: {
  label?: string;
  size?: string;
}) {
  return (
    <div className="ad-slot">
      <div className="ad-slot-body">
        <strong>광고 영역 · {label}</strong>
        {size && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-4)" }}>
            {size}
          </span>
        )}
      </div>
    </div>
  );
}
