// Mock Data cho Expense Dashboard - Static values (no Math.random() or new Date())
// Để tránh hydration mismatch

import type {
  ExpenseDashboardData,
  DailyTrend,
  CategoryBreakdown,
  RecentTransaction,
  BudgetItem,
  Wallet,
  SavingGoal,
} from '@/types/expense-dashboard';

// Format helpers - chạy client-side only
export function formatCurrency(amount: number, currency: string = 'VND'): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompactCurrency(amount: number): string {
  if (amount >= 1000000000) return `${(amount / 1000000000).toFixed(1)}B`;
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
  return amount.toString();
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

// Calculate trend percentage
export function calculateTrend(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

// =====================
// STATIC DATA - No dynamic generation
// =====================

/** Wallets */
export const MOCK_WALLETS: Wallet[] = [
  {
    _id: 'wallet-1',
    name: 'VCB – Tài khoản chính',
    type: 'bank',
    balance: 12000000,
    currency: 'VND',
    cardNumber: '**** **** **** 5420',
    isPrimary: true,
    color: '#827BF2',
  },
  {
    _id: 'wallet-2',
    name: 'Momo',
    type: 'e-wallet',
    balance: 3000000,
    currency: 'VND',
    isLowBalance: false,
    color: '#F66PAC',
  },
  {
    _id: 'wallet-3',
    name: 'Tiền mặt',
    type: 'cash',
    balance: 500000,
    currency: 'VND',
    isLowBalance: true,
    color: '#21AE5A',
  },
  {
    _id: 'wallet-4',
    name: 'ZaloPay',
    type: 'e-wallet',
    balance: 200000,
    currency: 'VND',
    isLowBalance: true,
    color: '#38BDF8',
  },
];

/** Categories */
export const MOCK_CATEGORIES: CategoryBreakdown[] = [
  { _id: 'cat-1', name: 'Ăn uống', icon: '🍜', color: '#F89C34', total: 800000 },
  { _id: 'cat-2', name: 'Di chuyển', icon: '🚗', color: '#827BF2', total: 250000 },
  { _id: 'cat-3', name: 'Mua sắm', icon: '🛍️', color: '#F66PAC', total: 500000 },
  { _id: 'cat-4', name: 'Sức khỏe', icon: '💊', color: '#21AE5A', total: 150000 },
  { _id: 'cat-5', name: 'Giải trí', icon: '🎮', color: '#F2CC00', total: 300000 },
  { _id: 'cat-6', name: 'Khác', icon: '📦', color: '#9EA3B8', total: 300000 },
];

/** Recent Transactions */
export const MOCK_TRANSACTIONS: RecentTransaction[] = [
  {
    _id: 'txn-1',
    type: 'income',
    amount: 15000000,
    currency: 'VND',
    categoryId: { name: 'Lương', icon: '💰', color: '#21AE5A' },
    description: 'Lương tháng 4/2026',
    date: '2026-04-01',
    walletId: 'wallet-1',
  },
  {
    _id: 'txn-2',
    type: 'expense',
    amount: 50000,
    currency: 'VND',
    categoryId: { name: 'Ăn uống', icon: '🍜', color: '#F89C34' },
    description: 'Bún bò Huế',
    date: '2026-04-14',
    walletId: 'wallet-2',
  },
  {
    _id: 'txn-3',
    type: 'expense',
    amount: 450000,
    currency: 'VND',
    categoryId: { name: 'Di chuyển', icon: '🚗', color: '#827BF2' },
    description: 'Xăng xe máy',
    date: '2026-04-13',
    walletId: 'wallet-1',
  },
  {
    _id: 'txn-4',
    type: 'expense',
    amount: 350000,
    currency: 'VND',
    categoryId: { name: 'Mua sắm', icon: '🛍️', color: '#F66PAC' },
    description: 'Shopee order',
    date: '2026-04-12',
    walletId: 'wallet-2',
  },
  {
    _id: 'txn-5',
    type: 'expense',
    amount: 85000,
    currency: 'VND',
    categoryId: { name: 'Sức khỏe', icon: '💊', color: '#21AE5A' },
    description: 'Nhà thuốc',
    date: '2026-04-11',
    walletId: 'wallet-3',
  },
  {
    _id: 'txn-6',
    type: 'income',
    amount: 2000000,
    currency: 'VND',
    categoryId: { name: 'Thưởng', icon: '🎁', color: '#F2CC00' },
    description: 'Thưởng dự án',
    date: '2026-03-28',
    walletId: 'wallet-1',
  },
];

/** Budget Items */
export const MOCK_BUDGET_ITEMS: BudgetItem[] = [
  {
    _id: 'budget-1',
    categoryId: { _id: 'cat-1', name: 'Ăn uống', icon: '🍜', color: '#F89C34' },
    budgetAmount: 1000000,
    spentAmount: 800000,
    period: 'monthly',
  },
  {
    _id: 'budget-2',
    categoryId: { _id: 'cat-2', name: 'Di chuyển', icon: '🚗', color: '#827BF2' },
    budgetAmount: 500000,
    spentAmount: 250000,
    period: 'monthly',
  },
  {
    _id: 'budget-3',
    categoryId: { _id: 'cat-3', name: 'Mua sắm', icon: '🛍️', color: '#F66PAC' },
    budgetAmount: 500000,
    spentAmount: 500000,
    period: 'monthly',
    isOverBudget: true,
  },
  {
    _id: 'budget-4',
    categoryId: { _id: 'cat-4', name: 'Sức khỏe', icon: '💊', color: '#21AE5A' },
    budgetAmount: 500000,
    spentAmount: 150000,
    period: 'monthly',
  },
  {
    _id: 'budget-5',
    categoryId: { _id: 'cat-5', name: 'Giải trí', icon: '🎮', color: '#F2CC00' },
    budgetAmount: 500000,
    spentAmount: 350000,
    period: 'monthly',
  },
];

/** Saving Goals */
export const MOCK_SAVING_GOALS: SavingGoal[] = [
  {
    _id: 'goal-1',
    name: 'Mua nhà',
    targetAmount: 50000000,
    currentAmount: 20000000,
    deadline: '2027-10-01',
    icon: '🏠',
    color: '#827BF2',
  },
  {
    _id: 'goal-2',
    name: 'Du lịch Nhật',
    targetAmount: 10000000,
    currentAmount: 2800000,
    deadline: '2026-10-01',
    icon: '✈️',
    color: '#F66PAC',
  },
  {
    _id: 'goal-3',
    name: 'Mua xe',
    targetAmount: 50000000,
    currentAmount: 6000000,
    deadline: '2029-04-01',
    icon: '🚗',
    color: '#21AE5A',
  },
];

/** Weekly Income/Expense Data for Bar Chart */
export const MOCK_WEEKLY_DATA = [
  { week: 'Tuần 1', income: 15000000, expense: 2500000 },
  { week: 'Tuần 2', income: 0, expense: 3200000 },
  { week: 'Tuần 3', income: 2000000, expense: 1800000 },
  { week: 'Tuần 4', income: 0, expense: 2500000 },
];

/** Monthly Trend Data for Line Chart (6 months) */
export const MOCK_MONTHLY_TREND = [
  { month: 'T10', income: 15000000, expense: 12000000, savings: 3000000 },
  { month: 'T11', income: 15000000, expense: 13500000, savings: 1500000 },
  { month: 'T12', income: 17000000, expense: 11000000, savings: 6000000 },
  { month: 'T1', income: 15000000, expense: 14000000, savings: 1000000 },
  { month: 'T2', income: 15000000, expense: 12500000, savings: 2500000 },
  { month: 'T3', income: 17000000, expense: 13000000, savings: 4000000 },
];

/** Savings Accumulation Data */
export const MOCK_SAVINGS_TREND = [
  { month: 'T10', amount: 5000000 },
  { month: 'T11', amount: 8000000 },
  { month: 'T12', amount: 14000000 },
  { month: 'T1', amount: 17000000 },
  { month: 'T2', amount: 22000000 },
  { month: 'T3', amount: 28500000 },
];

/** Comparison Data (This Month vs Last Month) */
export const MOCK_COMPARISON_DATA = [
  { category: 'Ăn uống', thisMonth: 800000, lastMonth: 950000 },
  { category: 'Di chuyển', thisMonth: 250000, lastMonth: 300000 },
  { category: 'Mua sắm', thisMonth: 500000, lastMonth: 400000 },
  { category: 'Sức khỏe', thisMonth: 150000, lastMonth: 200000 },
  { category: 'Giải trí', thisMonth: 350000, lastMonth: 450000 },
];

/** Heatmap Data (Expense by day in month) */
export const MOCK_HEATMAP_DATA = [
  // Row = week, Col = day of week (T2=0, T3=1, T4=2, T5=3, T6=4, T7=5, CN=6)
  { week: 'T1', values: [0, 0, 350000, 0, 45000, 0, 0] },
  { week: 'T2', values: [0, 50000, 0, 200000, 50000, 0, 0] },
  { week: 'T3', values: [0, 0, 0, 150000, 0, 85000, 0] },
  { week: 'T4', values: [300000, 0, 80000, 0, 0, 0, 0] },
];

/** Forecast Data */
export const MOCK_FORECAST_DATA = [
  { day: 1, actual: 500000, forecast: null, budget: 433333 },
  { day: 5, actual: 850000, forecast: null, budget: 433333 },
  { day: 10, actual: 1200000, forecast: null, budget: 433333 },
  { day: 15, actual: 1800000, forecast: null, budget: 433333 },
  { day: 20, actual: 2500000, forecast: null, budget: 433333 },
  { day: 25, actual: 3000000, forecast: null, budget: 433333 },
  { day: 28, actual: null, forecast: 3000000, budget: 433333 },
  { day: 29, actual: null, forecast: 4000000, budget: 433333 },
  { day: 30, actual: null, forecast: 5000000, budget: 433333 },
];

/** Full Dashboard Summary */
export const MOCK_DASHBOARD_SUMMARY = {
  totalIncome: 17000000,
  totalExpense: 8500000,
  netBalance: 8500000,
  incomeTrend: 13.3,
  expenseTrend: 5.0,
  balanceTrend: 25.0,
};

/** Full Dashboard Data */
export const MOCK_DASHBOARD_DATA: ExpenseDashboardData = {
  summary: {
    totalIncome: 17000000,
    totalExpense: 8500000,
    incomeCount: 2,
    expenseCount: 18,
    netBalance: 8500000,
    monthKey: '2026-04',
  },
  dailyTrend: [] as DailyTrend[], // Will be populated based on time filter
  recentTransactions: MOCK_TRANSACTIONS,
  categoryBreakdown: MOCK_CATEGORIES,
  prevMonth: {
    totalIncome: 15000000,
    totalExpense: 8000000,
    incomeCount: 2,
    expenseCount: 20,
    netBalance: 7000000,
  },
};
