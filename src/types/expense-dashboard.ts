// Expense Dashboard Types - API response structure from personal-expense-manager

/** KPI Summary */
export type ExpenseKPISummary = {
  totalIncome: number;
  totalExpense: number;
  incomeCount: number;
  expenseCount: number;
  netBalance: number;
  monthKey: string;
};

/** Daily Trend for Area Chart */
export type DailyTrend = {
  date: string;
  income: number;
  expense: number;
};

/** Category Breakdown for Donut Chart */
export type CategoryBreakdown = {
  _id: string;
  name: string;
  icon: string;
  color: string;
  total: number;
};

/** Recent Transaction */
export type RecentTransaction = {
  _id: string;
  type: 'income' | 'expense';
  amount: number;
  currency: string;
  categoryId: {
    _id?: string;
    name: string;
    icon: string;
    color: string;
  };
  description?: string;
  date: string;
  walletId?: string;
};

/** Previous Month Comparison */
export type PreviousMonthData = {
  totalIncome: number;
  totalExpense: number;
  incomeCount: number;
  expenseCount: number;
  netBalance: number;
};

/** Full Dashboard Response */
export type ExpenseDashboardData = {
  summary: ExpenseKPISummary;
  dailyTrend: DailyTrend[];
  recentTransactions: RecentTransaction[];
  categoryBreakdown: CategoryBreakdown[];
  prevMonth: PreviousMonthData;
};

/** Wallet */
export type Wallet = {
  _id: string;
  name: string;
  type: 'bank' | 'cash' | 'e-wallet';
  balance: number;
  currency: string;
  cardNumber?: string;
  isPrimary?: boolean;
  isLowBalance?: boolean;
  color: string;
};

/** Budget Item */
export type BudgetItem = {
  _id: string;
  categoryId: {
    _id: string;
    name: string;
    icon: string;
    color: string;
  };
  budgetAmount: number;
  spentAmount: number;
  period: 'daily' | 'weekly' | 'monthly';
  isOverBudget?: boolean;
};

/** Saving Goal */
export type SavingGoal = {
  _id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  icon: string;
  color: string;
};

/** KPI Card Variant Colors */
export type KPICardColor = 'blue' | 'green' | 'red' | 'purple' | 'orange';

/** KPI Card Props */
export type KPICardProps = {
  label: string;
  value: number;
  icon: React.ReactNode;
  trend?: number;
  format?: 'currency' | 'number' | 'percent';
  color?: KPICardColor;
  isLoading?: boolean;
  sparklineData?: number[];
};

/** Trend Chart Props */
export type TrendChartProps = {
  data: DailyTrend[];
  currency?: string;
  isLoading?: boolean;
};

/** Category Donut Chart Props */
export type CategoryDonutChartProps = {
  data: CategoryBreakdown[];
  currency?: string;
  isLoading?: boolean;
  onCategoryClick?: (category: CategoryBreakdown) => void;
};

/** Income/Expense Bar Chart Props */
export type IncomeExpenseBarChartProps = {
  data: DailyTrend[];
  currency?: string;
  isLoading?: boolean;
};

/** Recent Transactions Props */
export type RecentTransactionsProps = {
  data: RecentTransaction[];
  currency?: string;
  maxItems?: number;
  isLoading?: boolean;
  onTransactionClick?: (transaction: RecentTransaction) => void;
};

/** Main Dashboard Props */
export type PersonalExpenseDashboardProps = {
  apiUrl?: string;
  currency?: string;
  dateRange?: { from: Date; to: Date } | null;
  onTransactionClick?: (transaction: RecentTransaction) => void;
  onCategoryClick?: (category: CategoryBreakdown) => void;
  onRefresh?: () => void;
  showTrendChart?: boolean;
  showCategoryChart?: boolean;
  showIncomeExpenseChart?: boolean;
  showRecentTransactions?: boolean;
  className?: string;
};
