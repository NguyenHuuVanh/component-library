// Expense Dashboard Components - Export barrel file

// Layout
export { DashboardLayout, useDashboard } from './dashboard-layout';
export { Sidebar } from './sidebar';
export { TopBar } from './topbar';
export { RightPanel } from './right-panel';
export { MainContent } from './main-content';

// Components
export { BalanceCard, QuickLinks } from './balance-card';
export { IncomeExpenseBarChart, TrendLineChart } from './charts';
export { BudgetTracker } from './budget-tracker';
export { ComparisonChart, Heatmap } from './comparison-heatmap';
export { ForecastChart } from './forecast-chart';
export { TransactionsTable } from './transactions-table';

// Old components (for backwards compatibility)
export { KPICard } from './kpi-card';
export { TrendChart } from './trend-chart';
export { CategoryDonutChart } from './category-donut-chart';
export { IncomeExpenseBarChart as OldIncomeExpenseBarChart } from './income-expense-bar-chart';
export { RecentTransactions } from './recent-transactions';
export { PersonalExpenseDashboard } from './personal-expense-dashboard';
