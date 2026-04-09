# Finance Dashboard

A clean, interactive finance dashboard built with React and Chart.js.

## Features

- **Dashboard Overview** — summary metric cards, balance trend line chart, spending donut chart, monthly income vs expenses bar chart, and recent transactions
- **Transactions** — searchable, filterable, sortable list of all transactions with category and type filters
- **Insights** — top spending category, month-over-month comparison, savings rate progress bar, category breakdown with progress bars, and auto-generated observations
- **Role-based UI** — switch between Viewer (read-only) and Admin (can add/delete transactions) via the dropdown in the header
- **Dark mode** — automatically follows system preference
- **Responsive** — works on mobile, tablet, and desktop

## Tech Stack

- React 18 (hooks only — no Redux/Zustand; plain `useState` + `useMemo`)
- Chart.js 4 via `chart.js/auto`
- Plain CSS (no Tailwind or UI library)

## Project Structure

```
src/
  data.js                    # Mock transactions + constants
  utils.js                   # Formatting and calculation helpers
  index.css                  # Global styles + dark mode
  App.jsx                    # Root component — state management + routing
  components/
    MetricCard.jsx            # Summary stat card
    Pill.jsx                  # Colour badge
    AddTransactionModal.jsx   # Admin: add new transaction
    charts/
      BalanceTrend.jsx        # Line chart — monthly balance
      SpendingPie.jsx         # Doughnut chart — category spending
      MonthlyBar.jsx          # Bar chart — income vs expenses
  pages/
    Dashboard.jsx             # Main overview page
    Transactions.jsx          # Filterable transaction list
    Insights.jsx              # Spending analysis page
```

## Setup

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Role-Based UI

Use the dropdown in the top-right corner to switch roles:

| Role   | Capabilities                        |
|--------|-------------------------------------|
| Viewer | View all data, charts, and insights |
| Admin  | All of the above + add/delete transactions |

No authentication is implemented — this is a frontend-only simulation using React state.

## State Management

All state lives in `App.jsx` and is passed down as props:

| State          | Type       | Purpose                       |
|----------------|------------|-------------------------------|
| `txs`          | Array      | All transaction records       |
| `role`         | String     | Current user role             |
| `tab`          | String     | Active page / navigation      |
| `showAdd`      | Boolean    | Modal visibility (admin only) |

Filtering and sorting state is local to the `Transactions` page component.

## Assumptions

- Starting balance is $3,200 (mock initial balance)
- Data covers Feb–Apr 2025 (40 mock transactions)
- "Apr" is treated as the current month for insights comparisons
- Daily average spend divides April expenses by 25 working days
