import { fmt, getMonthTxs, sumIncome, sumExpenses, groupByCategory } from '../utils';
import { CAT_COLORS } from '../data';

export default function Insights({ txs }) {
  const totalIncome = sumIncome(txs);
  const totalExp    = sumExpenses(txs);
  const savRate     = totalIncome > 0 ? Math.round(((totalIncome - totalExp) / totalIncome) * 100) : 0;

  const aprExp  = sumExpenses(getMonthTxs(txs, '2025-04'));
  const marExp  = sumExpenses(getMonthTxs(txs, '2025-03'));
  const aprTxs  = getMonthTxs(txs, '2025-04');
  const diff    = aprExp - marExp;

  const byCat   = groupByCategory(txs);
  const topCat  = byCat[0] ? byCat[0][0] : '—';
  const topAmt  = byCat[0] ? byCat[0][1] : 0;

  const avgDaily = aprExp > 0 ? Math.round(aprExp / 25) : 0;
  const expCount = aprTxs.filter((t) => t.type === 'expense').length;

  const housingPct = Math.round(
    ((byCat.find(([k]) => k === 'Housing')?.[1] || 0) / (totalExp || 1)) * 100
  );
  const incomeSources = txs.filter((t) => t.type === 'income').length;

  const observations = [
    {
      variant: diff > 0 ? 'red' : 'green',
      text: diff > 0
        ? `Spending increased by ${fmt(Math.abs(diff))} this month vs last`
        : `Spending decreased by ${fmt(Math.abs(diff))} vs last month`,
    },
    { variant: 'amber', text: `Housing is ${housingPct}% of total expenses` },
    { variant: 'blue',  text: `You have ${incomeSources} income transactions tracked` },
    {
      variant: savRate > 20 ? 'green' : 'amber',
      text: savRate > 20
        ? `Savings rate of ${savRate}% is healthy — keep it up!`
        : `Savings rate of ${savRate}% — try to reach 20%+`,
    },
  ];

  return (
    <>
      <div className="insights-grid">
        <div className="insight-card">
          <div className="insight-label">Top spending category</div>
          <div className="insight-value">{topCat}</div>
          <div className="insight-sub">{fmt(topAmt)} total spent</div>
        </div>

        <div className="insight-card">
          <div className="insight-label">Apr vs Mar spending</div>
          <div
            className="insight-value"
            style={{ color: diff > 0 ? '#A32D2D' : '#3B6D11' }}
          >
            {diff > 0 ? '↑' : '↓'} {fmt(Math.abs(diff))}
          </div>
          <div className="insight-sub">
            {diff > 0 ? 'More' : 'Less'} spent in April vs March
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-label">Savings rate</div>
          <div
            className="insight-value"
            style={{ color: savRate > 20 ? '#3B6D11' : '#854F0B' }}
          >
            {savRate}%
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: Math.min(savRate, 100) + '%',
                background: savRate > 20 ? '#639922' : '#EF9F27',
              }}
            />
          </div>
          <div className="insight-sub mt-8">
            {savRate > 20 ? 'On track — great job!' : 'Aim for 20% or higher'}
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-label">Avg daily spend (Apr)</div>
          <div className="insight-value">{fmt(avgDaily)}</div>
          <div className="insight-sub">
            Based on {expCount} expense transactions
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="card">
        <div className="card-title">Category breakdown — all time</div>
        {byCat.map(([cat, amt]) => {
          const pct = Math.round((amt / (totalExp || 1)) * 100);
          return (
            <div key={cat} className="category-row">
              <div className="category-row-header">
                <span>{cat}</span>
                <span style={{ fontWeight: 500 }}>
                  {fmt(amt)}{' '}
                  <span style={{ fontWeight: 400, color: '#999', fontSize: 12 }}>
                    ({pct}%)
                  </span>
                </span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: pct + '%', background: CAT_COLORS[cat] || '#888' }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Observations */}
      <div className="card mt-16">
        <div className="card-title">Observations</div>
        <ul className="observations-list">
          {observations.map((o, i) => (
            <li key={i} className="observation-item">
              <span className={`pill pill-${o.variant}`} style={{ flexShrink: 0, marginTop: 1 }}>
                ●
              </span>
              <span>{o.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
