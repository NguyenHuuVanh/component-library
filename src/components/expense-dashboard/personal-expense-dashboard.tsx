'use client';

import { useState } from 'react';
import type { PersonalExpenseDashboardProps } from '@/types/expense-dashboard';
import {
  MOCK_DASHBOARD_DATA,
  calculateTrend,
} from '@/data/expense-dashboard-mock';
import { KPICard } from './kpi-card';
import { TrendChart } from './trend-chart';
import { CategoryDonutChart } from './category-donut-chart';
import { IncomeExpenseBarChart } from './income-expense-bar-chart';
import { RecentTransactions } from './recent-transactions';
import { RefreshCw, TrendingUp, TrendingDown, DollarSign, CreditCard, Filter } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { Badge } from '@/components/shadcn-ui/badge';
import { SelectField } from '@/components/custom-fields/select-field';
import { DatePickerField } from '@/components/custom-fields/date-picker-field';
import { cn } from '@/utils/cn';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, startOfYear, endOfYear } from 'date-fns';

// Loading state component
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl border p-5 animate-pulse">
            <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
            <div className="h-8 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
      {/* Chart Skeleton */}
      <div className="h-[350px] bg-gray-100 rounded-xl animate-pulse" />
      {/* Bottom Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[300px] bg-gray-100 rounded-xl animate-pulse" />
        <div className="h-[300px] bg-gray-100 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

export function PersonalExpenseDashboard({
  apiUrl,
  currency = 'VND',
  dateRange,
  onTransactionClick,
  onCategoryClick,
  onRefresh,
  showTrendChart = true,
  showCategoryChart = true,
  showIncomeExpenseChart = true,
  showRecentTransactions = true,
  className,
}: PersonalExpenseDashboardProps) {
  // TODO: Implement API fetch when apiUrl is provided
  // For now, use mock data
  const data = MOCK_DASHBOARD_DATA;
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Period options
  const periodOptions = [
    { value: 'thisWeek', label: 'Tuần này' },
    { value: 'thisMonth', label: 'Tháng này' },
    { value: 'thisQuarter', label: 'Quý này' },
    { value: 'thisYear', label: 'Năm nay' },
  ];

  // Category options
  const categoryOptions = [
    { value: '', label: 'Tất cả danh mục' },
    { value: 'food', label: '🍜 Ăn uống' },
    { value: 'transport', label: '🚗 Di chuyển' },
    { value: 'shopping', label: '🛒 Mua sắm' },
    { value: 'bills', label: '📄 Hóa đơn' },
    { value: 'entertainment', label: '🎮 Giải trí' },
  ];

  // Quick filter tags
  const filterTags = [
    { value: 'all', label: 'Tất cả' },
    { value: 'income', label: '📥 Thu nhập' },
    { value: 'expense', label: '📤 Chi tiêu' },
    { value: 'transfer', label: '🔄 Chuyển khoản' },
  ];

  const [selectedTag, setSelectedTag] = useState('all');

  // Calculate trends vs previous month
  const incomeTrend = calculateTrend(data.summary.totalIncome, data.prevMonth.totalIncome);
  const expenseTrend = calculateTrend(data.summary.totalExpense, data.prevMonth.totalExpense);
  const balanceTrend = calculateTrend(data.summary.netBalance, data.prevMonth.netBalance);
  const transactionTrend = calculateTrend(
    data.summary.incomeCount + data.summary.expenseCount,
    data.prevMonth.incomeCount + data.prevMonth.expenseCount
  );

  // Generate sparkline data from daily trend
  const incomeSparkline = data.dailyTrend.map((d) => d.income);
  const expenseSparkline = data.dailyTrend.map((d) => d.expense);

  const isLoading = false; // TODO: Add loading state from API fetch

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Filter Bar */}
      <div className="bg-white rounded-xl border p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Period + Category */}
          <div className="flex flex-wrap items-center gap-3">
            <SelectField
              placeholder="Chọn kỳ"
              options={periodOptions}
              selected={selectedPeriod}
              onChangeSelected={(v) => setSelectedPeriod(v)}
              classWapper="mb-0 w-40"
            />

            <DatePickerField
              mode="range"
              selectedForm={dateRange?.from}
              selectedTo={dateRange?.to}
              placeholder="Khoảng ngày"
              classWapper="mb-0"
            />

            <SelectField
              placeholder="Danh mục"
              options={categoryOptions}
              selected={selectedCategory}
              onChangeSelected={(v) => setSelectedCategory(v)}
              classWapper="mb-0 w-48"
            />
          </div>

          {/* Right: Filter Tags + Refresh */}
          <div className="flex items-center gap-3">
            {/* Quick Filter Tags */}
            <div className="flex items-center gap-1 p-1 bg-[#F2F4F8] rounded-lg">
              {filterTags.map((tag) => (
                <Button
                  key={tag.value}
                  onClick={() => setSelectedTag(tag.value)}
                  className={cn(
                    'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
                    selectedTag === tag.value
                      ? 'bg-white text-[#1A1D2E] shadow-sm'
                      : 'text-[#5A607F] hover:text-[#1A1D2E] bg-transparent hover:bg-transparent',
                  )}
                  variant="ghost"
                >
                  {tag.label}
                </Button>
              ))}
            </div>

            {/* Refresh Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={onRefresh}
              className="h-9 w-9"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Active Filter Tags */}
        {(selectedCategory || selectedTag !== 'all') && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-[#5A607F]">Bộ lọc đang áp dụng:</span>
            {selectedCategory && (
              <Badge variant="secondary" className="text-xs px-2 py-1 h-6 bg-[#827BF2]/10 text-[#827BF2] border border-[#827BF2]/20 gap-1">
                {categoryOptions.find(c => c.value === selectedCategory)?.label}
                <button className="ml-1 hover:text-[#E40127]" onClick={() => setSelectedCategory('')}>×</button>
              </Badge>
            )}
            {selectedTag !== 'all' && (
              <Badge variant="secondary" className="text-xs px-2 py-1 h-6 bg-[#827BF2]/10 text-[#827BF2] border border-[#827BF2]/20 gap-1">
                {filterTags.find(t => t.value === selectedTag)?.label}
                <button className="ml-1 hover:text-[#E40127]" onClick={() => setSelectedTag('all')}>×</button>
              </Badge>
            )}
            <button
              className="text-xs text-[#E40127] hover:underline"
              onClick={() => {
                setSelectedCategory('');
                setSelectedTag('all');
              }}
            >
              Xóa tất cả
            </button>
          </div>
        )}
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Tổng thu"
          value={data.summary.totalIncome}
          icon={<TrendingUp className="w-5 h-5" />}
          trend={incomeTrend}
          format="currency"
          color="green"
          sparklineData={incomeSparkline}
        />
        <KPICard
          label="Tổng chi"
          value={data.summary.totalExpense}
          icon={<TrendingDown className="w-5 h-5" />}
          trend={expenseTrend}
          format="currency"
          color="red"
          sparklineData={expenseSparkline}
        />
        <KPICard
          label="Số dư"
          value={data.summary.netBalance}
          icon={<DollarSign className="w-5 h-5" />}
          trend={balanceTrend}
          format="currency"
          color={data.summary.netBalance >= 0 ? 'green' : 'red'}
        />
        <KPICard
          label="Số giao dịch"
          value={data.summary.incomeCount + data.summary.expenseCount}
          icon={<CreditCard className="w-5 h-5" />}
          trend={transactionTrend}
          format="number"
          color="blue"
        />
      </div>

      {/* Trend Chart - Full Width */}
      {showTrendChart && (
        <TrendChart data={data.dailyTrend} currency={currency} />
      )}

      {/* Bottom Section: Charts + Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {showCategoryChart && (
            <CategoryDonutChart
              data={data.categoryBreakdown}
              currency={currency}
              onCategoryClick={onCategoryClick}
            />
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {showIncomeExpenseChart && (
            <IncomeExpenseBarChart
              data={data.dailyTrend}
              currency={currency}
            />
          )}
        </div>
      </div>

      {/* Recent Transactions - Full Width */}
      {showRecentTransactions && (
        <RecentTransactions
          data={data.recentTransactions}
          currency={currency}
          maxItems={5}
          onTransactionClick={onTransactionClick}
        />
      )}
    </div>
  );
}
