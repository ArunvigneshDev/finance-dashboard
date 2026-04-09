export function fmt(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

export function fmtDate(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getMonthTxs(txs, prefix) {
  return txs.filter((t) => t.date.startsWith(prefix));
}

export function sumIncome(txs) {
  return txs.filter((t) => t.type === 'income').reduce((a, t) => a + t.amount, 0);
}

export function sumExpenses(txs) {
  return txs.filter((t) => t.type === 'expense').reduce((a, t) => a + Math.abs(t.amount), 0);
}

export function groupByCategory(txs) {
  const map = {};
  txs
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      map[t.cat] = (map[t.cat] || 0) + Math.abs(t.amount);
    });
  return Object.entries(map).sort((a, b) => b[1] - a[1]);
}
