import { useState } from 'react';
import { INITIAL_TRANSACTIONS } from './data';
import AddTransactionModal from './components/AddTransactionModal';
import Pill from './components/Pill';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';

export default function App() {
  // ── State ────────────────────────────────────────────────────────────────
  const [txs,     setTxs]     = useState(INITIAL_TRANSACTIONS);
  const [role,    setRole]    = useState('viewer');   // 'viewer' | 'admin'
  const [tab,     setTab]     = useState('dashboard'); // 'dashboard' | 'transactions' | 'insights'
  const [showAdd, setShowAdd] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const addTransaction    = (tx)  => setTxs((prev) => [tx, ...prev]);
  const deleteTransaction = (id)  => setTxs((prev) => prev.filter((t) => t.id !== id));

  // ── Nav helper ────────────────────────────────────────────────────────────
  const NavBtn = ({ id, label }) => (
    <button className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>
      {label}
    </button>
  );

  return (
    <div className="app-wrap">
      {/* Accessibility heading */}
      <h1 className="sr-only">Finance Dashboard</h1>

      {/* Add Transaction Modal */}
      {showAdd && role === 'admin' && (
        <AddTransactionModal onAdd={addTransaction} onClose={() => setShowAdd(false)} />
      )}

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="header">
        <div className="header-left">
          <span className="brand">FinanceApp</span>
          <nav className="nav" aria-label="Main navigation">
            <NavBtn id="dashboard"    label="Dashboard"    />
            <NavBtn id="transactions" label="Transactions" />
            <NavBtn id="insights"     label="Insights"     />
          </nav>
        </div>

        <div className="header-right">
          {role === 'admin' && (
            <button className="btn-primary" onClick={() => setShowAdd(true)}>
              + Add
            </button>
          )}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            aria-label="Switch role"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
          <Pill variant={role === 'admin' ? 'blue' : 'amber'}>
            {role === 'admin' ? 'Admin' : 'Viewer'}
          </Pill>
        </div>
      </header>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <main className="main">
        {tab === 'dashboard'    && <Dashboard    txs={txs} />}
        {tab === 'transactions' && <Transactions txs={txs} role={role} onDelete={deleteTransaction} />}
        {tab === 'insights'     && <Insights     txs={txs} />}
      </main>
    </div>
  );
}
