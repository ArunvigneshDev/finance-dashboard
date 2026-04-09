import { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { getMonthTxs } from '../../utils';

export default function BalanceTrend({ txs }) {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const months = ['Feb', 'Mar', 'Apr'];
    const prefixes = ['2025-02', '2025-03', '2025-04'];
    const net = prefixes.map((p) =>
      getMonthTxs(txs, p).reduce((a, t) => a + t.amount, 0)
    );
    const cumBalance = [
      3200 + net[0],
      3200 + net[0] + net[1],
      3200 + net[0] + net[1] + net[2],
    ];

    chartRef.current = new Chart(ref.current, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Balance',
            data: cumBalance,
            borderColor: '#185FA5',
            backgroundColor: 'rgba(24,95,165,0.08)',
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: '#185FA5',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            ticks: { callback: (v) => '$' + Math.round(v / 1000) + 'k' },
            grid: { color: 'rgba(0,0,0,0.04)' },
          },
          x: { grid: { display: false } },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [txs]);

  return (
    <div className="chart-wrap chart-wrap-200">
      <canvas ref={ref} role="img" aria-label="Line chart showing monthly balance trend">
        Balance trend over Feb, Mar, Apr 2025.
      </canvas>
    </div>
  );
}
