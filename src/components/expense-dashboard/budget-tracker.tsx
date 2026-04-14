'use client';

import { cn } from '@/utils/cn';
import { Plus } from 'lucide-react';
import { MOCK_BUDGET_ITEMS, formatCurrency } from '@/data/expense-dashboard-mock';

interface BudgetTrackerProps {
  className?: string;
}

function getProgressColor(percent: number): string {
  if (percent <= 60) return '#21AE5A'; // Green
  if (percent <= 85) return '#F89C34'; // Orange
  return '#E40127'; // Red
}

export function BudgetTracker({ className }: BudgetTrackerProps) {
  const totalBudget = MOCK_BUDGET_ITEMS.reduce((sum, item) => sum + item.budgetAmount, 0);
  const totalSpent = MOCK_BUDGET_ITEMS.reduce((sum, item) => sum + item.spentAmount, 0);
  const overallPercent = Math.round((totalSpent / totalBudget) * 100);

  return (
    <div className={cn('bg-white rounded-xl p-6 shadow-sm', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-[#1A1D2E]">Ngân sách tháng này</h3>
          <p className="text-sm text-[#5A607F] mt-1">
            Đã chi {formatCurrency(totalSpent)} / {formatCurrency(totalBudget)}
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#827BF2]/10 text-[#827BF2] rounded-lg text-sm font-medium hover:bg-[#827BF2]/20 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Thêm danh mục</span>
        </button>
      </div>

      {/* Overall Progress */}
      <div className="mb-6 p-4 rounded-lg bg-[#F2F4F8]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#5A607F]">Tổng tiến độ</span>
          <span className="text-sm font-semibold" style={{ color: getProgressColor(overallPercent) }}>
            {overallPercent}%
          </span>
        </div>
        <div className="h-3 bg-white rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(overallPercent, 100)}%`,
              backgroundColor: getProgressColor(overallPercent),
            }}
          />
        </div>
      </div>

      {/* Budget Items */}
      <div className="space-y-4">
        {MOCK_BUDGET_ITEMS.map((item) => {
          const percent = Math.round((item.spentAmount / item.budgetAmount) * 100);
          const isOverBudget = item.isOverBudget || percent >= 100;

          return (
            <div
              key={item._id}
              className={cn(
                'p-4 rounded-lg border transition-all',
                isOverBudget
                  ? 'border-[#E40127]/30 bg-[#E40127]/5'
                  : 'border-[#ECEEF5] hover:border-[#827BF2]/30'
              )}
            >
              {/* Header Row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.categoryId.icon}</span>
                  <span className="text-sm font-medium text-[#1A1D2E]">
                    {item.categoryId.name}
                  </span>
                  {isOverBudget && (
                    <span className="text-xs text-[#E40127] font-medium">⚠️</span>
                  )}
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: getProgressColor(percent) }}
                >
                  {percent}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-[#F2F4F8] rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(percent, 100)}%`,
                    backgroundColor: item.categoryId.color,
                  }}
                />
              </div>

              {/* Amount Row */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#5A607F]">
                  {formatCurrency(item.spentAmount)} / {formatCurrency(item.budgetAmount)}
                </span>
                <span
                  className="text-xs font-medium"
                  style={{
                    color: item.spentAmount > item.budgetAmount ? '#E40127' : '#5A607F',
                  }}
                >
                  {item.spentAmount > item.budgetAmount
                    ? `+${formatCurrency(item.spentAmount - item.budgetAmount)} vượt`
                    : `${formatCurrency(item.budgetAmount - item.spentAmount)} còn lại`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
