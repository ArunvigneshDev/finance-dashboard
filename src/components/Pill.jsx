export default function Pill({ children, variant = 'blue' }) {
  return <span className={`pill pill-${variant}`}>{children}</span>;
}
