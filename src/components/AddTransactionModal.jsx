import { useState } from 'react';
import { CATEGORIES } from '../data';

export default function AddTransactionModal({ onAdd, onClose }) {
  const [form, setForm] = useState({
    date: '',
    desc: '',
    amount: '',
    cat: 'Food',
    type: 'expense',
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = () => {
    if (!form.date || !form.desc || !form.amount) return;
    const amt = parseFloat(form.amount);
    onAdd({
      ...form,
      amount: form.type === 'expense' ? -Math.abs(amt) : Math.abs(amt),
      id: Date.now(),
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-title">Add transaction</span>
          <button onClick={onClose} style={{ padding: '4px 8px', fontSize: 16 }}>✕</button>
        </div>
        <div className="modal-form">
          <input type="date" value={form.date} onChange={set('date')} />
          <input placeholder="Description" value={form.desc} onChange={set('desc')} />
          <input type="number" placeholder="Amount (positive number)" value={form.amount} onChange={set('amount')} />
          <select value={form.cat} onChange={set('cat')}>
            {CATEGORIES.filter((c) => c !== 'Income').map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select value={form.type} onChange={set('type')}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <button className="btn-primary" onClick={handleSubmit} style={{ padding: 9 }}>
            Add transaction
          </button>
        </div>
      </div>
    </div>
  );
}
