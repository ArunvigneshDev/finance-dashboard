export default function MetricCard({ label, value, sub, color = '#185FA5' }) {
  return (
    <div className="metric-card">
      <div className="label">{label}</div>
      <div className="value" style={{ color }}>{value}</div>
      {sub && <div className="sub">{sub}</div>}
    </div>
  );
}
