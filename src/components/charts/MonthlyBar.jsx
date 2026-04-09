import { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { getMonthTxs, sumIncome, sumExpenses } from '../../utils';

export default function MonthlyBar({ txs }) {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const months = ['Feb', 'Mar', 'Apr'];
    const prefixes = ['2025-02', '2025-03', '2025-04'];
    const inc = prefixes.map((p) => sumIncome(getMonthTxs(txs, p)));
    const exp = prefixes.map((p) => sumExpenses(getMonthTxs(txs, p)));

    chartRef.current = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          { label: 'Income',   data: inc, backgroundColor: '#639922', borderRadius: 4 },
          { label: 'Expenses', data: exp, backgroundColor: '#E24B4A', borderRadius: 4 },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            ticks: { callback: (v) => '$' + v },
            grid: { color: 'rgba(0,0,0,0.04)' },
          },
          x: { grid: { display: false } },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [txs]);

  return (
    <>
      <div className="bar-legend">
        <span className="legend-item">
          <span className="legend-dot" style={{ background: '#639922' }} />
          <span className="legend-label">Income</span>
        </span>
        <span className="legend-item">
          <span className="legend-dot" style={{ background: '#E24B4A' }} />
          <span className="legend-label">Expenses</span>
        </span>
      </div>
      <div className="chart-wrap chart-wrap-180">
        <canvas ref={ref} role="img" aria-label="Bar chart comparing monthly income vs expenses">
          Monthly income vs expenses for Feb, Mar, Apr 2025.
        </canvas>
      </div>
    </>
  );
}
