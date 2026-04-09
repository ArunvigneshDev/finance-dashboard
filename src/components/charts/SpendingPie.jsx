import { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { CAT_COLORS } from '../../data';
import { fmt, groupByCategory } from '../../utils';

export default function SpendingPie({ txs }) {
  const ref = useRef(null);
  const chartRef = useRef(null);

  const sorted = groupByCategory(txs).slice(0, 6);

  useEffect(() => {
    if (!ref.current) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ref.current, {
      type: 'doughnut',
      data: {
        labels: sorted.map(([k]) => k),
        datasets: [
          {
            data: sorted.map(([, v]) => v),
            backgroundColor: sorted.map(([k]) => CAT_COLORS[k] || '#888'),
            borderWidth: 2,
            borderColor: '#fff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: (ctx) => `${ctx.label}: ${fmt(ctx.raw)}` },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [txs]);

  return (
    <div className="pie-layout">
      <div className="pie-wrap">
        <canvas ref={ref} role="img" aria-label="Donut chart of spending by category">
          Spending breakdown by category.
        </canvas>
      </div>
      <div className="legend">
        {sorted.map(([k, v]) => (
          <div key={k} className="legend-item">
            <span className="legend-dot" style={{ background: CAT_COLORS[k] || '#888' }} />
            <span className="legend-label">{k}</span>
            <span style={{ fontWeight: 500 }}>{fmt(v)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
