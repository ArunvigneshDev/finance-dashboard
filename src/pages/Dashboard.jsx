import MetricCard from '../components/MetricCard';
import Pill from '../components/Pill';
import BalanceTrend from '../components/charts/BalanceTrend';
import SpendingPie from '../components/charts/SpendingPie';
import MonthlyBar from '../components/charts/MonthlyBar';
import { fmt, fmtDate, getMonthTxs, sumIncome, sumExpenses } from '../utils';

export default function Dashboard({ txs }) {
  const totalIncome  = sumIncome(txs);
  const totalExp     = sumExpenses(txs);
  const balance      = 3200 + totalIncome - totalExp;
  const savRate      = totalIncome > 0 ? Math.round(((totalIncome - totalExp) / totalIncome) * 100) : 0;

  const aprTxs  = getMonthTxs(txs, '2025-04');
  const aprInc  = sumIncome(aprTxs);
  const aprExp  = sumExpenses(aprTxs);

  const recent = [...txs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <>
      {/* Metric cards */}
      <div className="metrics-row">
        <MetricCard label="Total balance"  value={fmt(balance)} sub="All time"    color="#185FA5" />
        <MetricCard label="Apr income"     value={fmt(aprInc)}  sub="This month"  color="#3B6D11" />
        <MetricCard label="Apr expenses"   value={fmt(aprExp)}  sub="This month"  color="#A32D2D" />
        <MetricCard
          label="Savings rate"
          value={savRate + '%'}
          sub="Overall"
          color={savRate > 20 ? '#3B6D11' : '#854F0B'}
        />
      </div>

      {/* Charts grid */}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Balance trend</div>
          <BalanceTrend txs={txs} />
        </div>

        <div className="card">
          <div className="card-title">Spending by category</div>
          <SpendingPie txs={txs} />
        </div>

        <div className="card full-width">
          <div className="card-title">Monthly comparison</div>
          <MonthlyBar txs={txs} />
        </div>
      </div>

      {/* Recent transactions */}
      <div className="card mt-16">
        <div className="card-title">Recent transactions</div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th className="td-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((t) => (
              <tr key={t.id}>
                <td>{fmtDate(t.date)}</td>
                <td>{t.desc}</td>
                <td>
                  <Pill variant={t.type === 'income' ? 'green' : 'blue'}>{t.cat}</Pill>
                </td>
                <td className={`td-right ${t.amount < 0 ? 'amount-negative' : 'amount-positive'}`}>
                  {t.amount > 0 ? '+' : ''}{fmt(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
