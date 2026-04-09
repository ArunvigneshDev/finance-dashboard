# 💰 Finance Dashboard

A clean and interactive finance dashboard built with **React** and **Chart.js**. Allows users to track their financial activity — view balance summaries, explore transactions, and understand spending patterns through visual charts.

Built as a frontend assignment to demonstrate component architecture, state management, data visualization, and role-based UI behavior — all without a backend.

## ✨ Features

- **Dashboard Overview** — summary metric cards (balance, income, expenses, savings rate), balance trend line chart, spending donut chart, and monthly income vs expenses bar chart
- **Transactions Page** — searchable, filterable, and sortable list of all transactions with category and type filters
- **Insights Page** — top spending category, month-over-month comparison, savings rate progress bar, full category breakdown, and auto-generated observations
- **Role-Based UI** — switch between Viewer and Admin roles via the header dropdown
  - `Viewer` — read-only access to all data and charts
  - `Admin` — can add and delete transactions
- **Dark Mode** — automatically follows system preference
- **Responsive Design** — works on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Tech | Usage |
|------|-------|
| React 18 | UI framework |
| Chart.js 4 | Data visualizations |
| Plain CSS | Styling + dark mode |
| React Scripts | Build tooling |

---

## 📁 Project Structure

```
src/
├── data.js                        # Mock transactions + category constants
├── utils.js                       # Formatting and calculation helpers
├── index.css                      # Global styles + dark mode
├── App.jsx                        # Root component — state + navigation
├── components/
│   ├── MetricCard.jsx             # Summary stat card
│   ├── Pill.jsx                   # Colour badge/tag
│   ├── AddTransactionModal.jsx    # Admin: add new transaction form
│   └── charts/
│       ├── BalanceTrend.jsx       # Line chart — monthly balance
│       ├── SpendingPie.jsx        # Doughnut chart — category spending
│       └── MonthlyBar.jsx         # Bar chart — income vs expenses
└── pages/
    ├── Dashboard.jsx              # Main overview page
    ├── Transactions.jsx           # Filterable transaction list
    └── Insights.jsx               # Spending analysis page
```

---

## ⚙️ Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS version recommended)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/ArunvigneshDev/finance-dashboard.git

# 2. Navigate into the project folder
cd finance-dashboard

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Role-Based UI

Use the dropdown in the top-right corner to switch roles:

| Role | Capabilities |
|------|-------------|
| Viewer | View all data, charts, and insights |
| Admin | All of the above + add and delete transactions |

No authentication is implemented — this is a frontend-only simulation using React state.

---

## 📊 State Management

All global state lives in `App.jsx` and is passed down as props:

| State | Purpose |
|-------|---------|
| `txs` | All transaction records |
| `role` | Current user role (viewer / admin) |
| `tab` | Active page / navigation |
| `showAdd` | Add transaction modal visibility |

Filtering and sorting state is local to the `Transactions` page component.

---

## 📌 Assumptions

- Starting balance is $3,200 (mock initial balance)
- Data covers Feb–Apr 2025 (40 mock transactions)
- April is treated as the current month for insights comparisons
- Daily average spend divides April expenses by 25 working days

---

## 👨‍💻 Author

**Arunvignesh** — [GitHub](https://github.com/ArunvigneshDev)
