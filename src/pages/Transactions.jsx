import { useState, useMemo } from 'react';
import Pill from '../components/Pill';
import { CATEGORIES } from '../data';
import { fmt, fmtDate } from '../utils';

export default function Transactions({ txs, role, onDelete }) {
  const [search,     setSearch]     = useState('');
  const [filterCat,  setFilterCat]  = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [sortKey,    setSortKey]    = useState('date');
  const [sortDir,    setSortDir]    = useState('desc');

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
  };

  const sortIndicator = (key) => {
    if (sortKey !== key) return ' ↕';
    return sortDir === 'asc' ? ' ↑' : ' ↓';
  };

  const filtered = useMemo(() => {
    let r = [...txs];
    if (search)
      r = r.filter(
        (t) =>
          t.desc.toLowerCase().includes(search.toLowerCase()) ||
          t.cat.toLowerCase().includes(search.toLowerCase())
      );
    if (filterCat  !== 'All') r = r.filter((t) => t.cat  === filterCat);
    if (filterType !== 'All') r = r.filter((t) => t.type === filterType);
    r.sort((a, b) => {
      let v = 0;
      if (sortKey === 'date')   v = new Date(a.date) - new Date(b.date);
      if (sortKey === 'amount') v = a.amount - b.amount;
      if (sortKey === 'desc')   v = a.desc.localeCompare(b.desc);
      return sortDir === 'desc' ? -v : v;
    });
    return r;
  }, [txs, search, filterCat, filterType, sortKey, sortDir]);

  return (
    <>
      <div className="filters-row">
        <input
          placeholder="Search by name or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="All">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="card">
        {filtered.length === 0 ? (
          <div className="empty-state">No transactions match your filters.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ minWidth: 480 }}>
              <thead>
                <tr>
                  <th onClick={() => toggleSort('date')}>Date{sortIndicator('date')}</th>
                  <th onClick={() => toggleSort('desc')}>Description{sortIndicator('desc')}</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th className="td-right" onClick={() => toggleSort('amount')}>Amount{sortIndicator('amount')}</th>
                  {role === 'admin' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id}>
                    <td>{fmtDate(t.date)}</td>
                    <td>{t.desc}</td>
                    <td><Pill variant={t.type === 'income' ? 'green' : 'blue'}>{t.cat}</Pill></td>
                    <td><Pill variant={t.type === 'income' ? 'green' : 'red'}>{t.type}</Pill></td>
                    <td className={`td-right ${t.amount < 0 ? 'amount-negative' : 'amount-positive'}`}>
                      {t.amount > 0 ? '+' : ''}{fmt(t.amount)}
                    </td>
                    {role === 'admin' && (
                      <td>
                        <button className="btn-danger" onClick={() => onDelete(t.id)}>
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="table-meta">{filtered.length} transaction{filtered.length !== 1 ? 's' : ''} shown</div>
    </>
  );
}
