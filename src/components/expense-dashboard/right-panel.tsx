'use client';

import { useState } from "react";
import { cn } from '@/utils/cn';
import { Plus, X, ChevronDown } from 'lucide-react';
import {
  MOCK_WALLETS,
  MOCK_CATEGORIES,
  MOCK_SAVINGS_TREND,
  MOCK_SAVING_GOALS,
  formatCurrency,
} from '@/data/expense-dashboard-mock';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer as AreaResponsiveContainer,
} from 'recharts';
import { DatePickerField } from '../custom-fields/date-picker-field';
import { SelectField } from '../custom-fields/select-field';
import { Badge } from '../shadcn-ui/badge';
import { Button } from '../shadcn-ui/button';
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';

// =====================
// Section 1: Wallets
// =====================
function WalletsSection() {
  const primaryWallet = MOCK_WALLETS.find((w) => w.isPrimary);
  const otherWallets = MOCK_WALLETS.filter((w) => !w.isPrimary);
  const totalBalance = MOCK_WALLETS.reduce((sum, w) => sum + w.balance, 0);

  return (
    <div className="p-4 border-b">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#1A1D2E]">Ví & Tài Khoản</h3>
        <button className="p-1 rounded hover:bg-[#EAE8FD] text-[#827BF2]">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Primary Wallet Card */}
      {primaryWallet && (
        <div
          className="rounded-xl p-4 mb-3 text-white"
          style={{
            background: `linear-gradient(135deg, ${primaryWallet.color}, ${primaryWallet.color}CC)`,
          }}
        >
          <div className="text-xs opacity-80 mb-1">{primaryWallet.name}</div>
          <div className="text-xl font-bold mb-1">
            {formatCurrency(primaryWallet.balance)}
          </div>
          <div className="text-xs opacity-70">{primaryWallet.cardNumber}</div>
        </div>
      )}

      {/* Other Wallets */}
      <div className="space-y-2">
        {otherWallets.map((wallet) => (
          <div
            key={wallet._id}
            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#F2F4F8] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: wallet.color }}
              >
                {wallet.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-medium text-[#1A1D2E]">{wallet.name}</div>
                <div className="text-xs text-[#9EA3B8]">{wallet.type}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#1A1D2E]">
                {formatCurrency(wallet.balance)}
              </span>
              {wallet.isLowBalance && (
                <span className="text-xs text-[#E40127] font-medium">⚠️</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-3 pt-3 border-t">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#5A607F]">Tổng số dư</span>
          <span className="text-sm font-bold text-[#1A1D2E]">
            {formatCurrency(totalBalance)}
          </span>
        </div>
      </div>
    </div>
  );
}

// =====================
// Section 2: Donut Chart
// =====================
function DonutChartSection() {
  const total = MOCK_CATEGORIES.reduce((sum, cat) => sum + cat.total, 0);
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');

  const periodOptions = [
    { value: 'thisWeek', label: 'Tuần này' },
    { value: 'thisMonth', label: 'Tháng này' },
    { value: 'thisQuarter', label: 'Quý này' },
  ];

  return (
    <div className="p-4 border-b">
      {/* Header with DatePicker + Select */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-[#1A1D2E]">Chi tiêu theo danh mục</h3>
          <Badge variant="secondary" className="text-xs px-2 py-0.5 h-5">
            {MOCK_CATEGORIES.length} danh mục
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <DatePickerField
            mode="single"
            placeholder="Chọn ngày"
            buttonClassName="h-8 text-xs px-2"
            classWapper="mb-0"
          />
          <SelectField
            placeholder="Kỳ"
            options={periodOptions}
            selected={selectedPeriod}
            onChangeSelected={(v) => setSelectedPeriod(v)}
            classWapper="mb-0 w-28"
          />
        </div>
      </div>

      {/* Donut Chart */}
      <div className="relative w-[160px] h-[160px] mx-auto mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={MOCK_CATEGORIES}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              dataKey="total"
              strokeWidth={0}
            >
              {MOCK_CATEGORIES.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ECEEF5',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-[#9EA3B8]">Tổng chi</span>
          <span className="text-sm font-bold text-[#1A1D2E]">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {MOCK_CATEGORIES.slice(0, 4).map((cat) => (
          <div key={cat._id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-xs text-[#5A607F]">
                {cat.icon} {cat.name}
              </span>
            </div>
            <span className="text-xs font-medium text-[#1A1D2E]">
              {formatCurrency(cat.total)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================
// Section 3: Savings Area Chart
// =====================
function SavingsSection() {
  const latestSavings = MOCK_SAVINGS_TREND[MOCK_SAVINGS_TREND.length - 1].amount;
  const previousSavings = MOCK_SAVINGS_TREND[MOCK_SAVINGS_TREND.length - 2].amount;
  const savingsChange = ((latestSavings - previousSavings) / previousSavings) * 100;
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  const periodOptions = [
    { value: '3months', label: '3 tháng' },
    { value: '6months', label: '6 tháng' },
    { value: '1year', label: '1 năm' },
  ];

  return (
    <div className="p-4 border-b">
      {/* Header with DatePicker + Select */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#1A1D2E]">Tích lũy tiết kiệm</h3>
        <div className="flex items-center gap-2">
          <SelectField
            placeholder="Kỳ"
            options={periodOptions}
            selected={selectedPeriod}
            onChangeSelected={(v) => setSelectedPeriod(v)}
            classWapper="mb-0 w-24"
          />
        </div>
      </div>

      {/* Area Chart */}
      <div className="h-[120px] w-full">
        <AreaResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={MOCK_SAVINGS_TREND}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#827BF2" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#827BF2" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ECEEF5" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9EA3B8' }}
            />
            <YAxis hide />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#827BF2"
              strokeWidth={2}
              fill="url(#savingsGradient)"
            />
          </AreaChart>
        </AreaResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t">
        <div>
          <span className="text-xs text-[#9EA3B8]">Tổng đã tiết kiệm</span>
          <div className="text-sm font-bold text-[#1A1D2E]">
            {formatCurrency(latestSavings)}
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-[#9EA3B8]">So với tháng trước</span>
          <div className="flex items-center gap-1 text-sm font-semibold text-[#21AE5A]">
            <span>▲</span>
            <span>+{savingsChange.toFixed(0)}%</span>
            <span>✅</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================
// Section 4: Goals
// =====================
function GoalsSection() {
  const [selectedGoalFilter, setSelectedGoalFilter] = useState('');

  const goalFilterOptions = [
    { value: '', label: 'Tất cả' },
    { value: 'active', label: 'Đang hoạt động' },
    { value: 'completed', label: 'Đã hoàn thành' },
  ];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-[#1A1D2E]">Mục Tiêu Tiết Kiệm</h3>
          <Badge variant="secondary" className="text-xs px-2 py-0.5 h-5">
            {MOCK_SAVING_GOALS.length} mục tiêu
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <SelectField
            placeholder="Lọc"
            options={goalFilterOptions}
            selected={selectedGoalFilter}
            onChangeSelected={(v) => setSelectedGoalFilter(v)}
            classWapper="mb-0 w-32"
          />
          <button className="p-1 rounded hover:bg-[#EAE8FD] text-[#827BF2]">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {MOCK_SAVING_GOALS.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const remainingMonths = Math.ceil(
            (new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30)
          );
          const goalStatus = progress >= 100 ? 'completed' : progress > 50 ? 'active' : 'on-track';

          return (
            <div key={goal._id} className="p-3 rounded-lg bg-[#F2F4F8]">
              {/* Goal Header with Tags */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{goal.icon}</span>
                  <span className="text-sm font-medium text-[#1A1D2E]">{goal.name}</span>
                  <Badge
                    variant={goalStatus === 'completed' ? 'success' : 'secondary'}
                    className="text-[10px] px-1.5 py-0.5 h-4"
                  >
                    {goalStatus === 'completed' ? '✅ Hoàn thành' : goalStatus === 'active' ? '🔥 Đang hoạt động' : '📈 Tiến độ tốt'}
                  </Badge>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-white rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    backgroundColor: goal.color,
                  }}
                />
              </div>

              {/* Amount */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#5A607F]">
                  {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                </span>
                <span className="font-semibold" style={{ color: goal.color }}>
                  {progress.toFixed(0)}%
                </span>
              </div>

              {/* Deadline + Tags */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1 text-xs text-[#9EA3B8]">
                  <span>📅</span>
                  <span>Còn {remainingMonths} tháng</span>
                </div>
                <div className="flex items-center gap-1">
                  {progress < 50 && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 h-4 text-orange-600 border-orange-200">
                      Cần tăng tốc
                    </Badge>
                  )}
                  {progress >= 100 && (
                    <Badge variant="success" className="text-[10px] px-1.5 py-0.5 h-4">
                      Đạt mục tiêu
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =====================
// Main Right Panel Component
// =====================
export function RightPanel() {
  return (
    <div className="flex flex-col h-full">
      <WalletsSection />
      <DonutChartSection />
      <SavingsSection />
      <GoalsSection />
    </div>
  );
}
