'use client';

import { cn } from '@/utils/cn';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { MOCK_WEEKLY_DATA, MOCK_MONTHLY_TREND, formatCurrency } from '@/data/expense-dashboard-mock';
import {
  LineChart,
  Line,
} from 'recharts';

// =====================
// Bar Chart: Income vs Expense by Week
// =====================
interface IncomeExpenseBarChartProps {
  className?: string;
}

export function IncomeExpenseBarChart({ className }: IncomeExpenseBarChartProps) {
  const totalIncome = MOCK_WEEKLY_DATA.reduce((sum, d) => sum + d.income, 0);
  const totalExpense = MOCK_WEEKLY_DATA.reduce((sum, d) => sum + d.expense, 0);

  return (
    <div className={cn('bg-white rounded-xl p-6 shadow-sm', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-[#1A1D2E]">Thu nhập & Chi tiêu</h3>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-sm text-[#21AE5A] font-medium">
              +{formatCurrency(totalIncome)}
            </span>
            <span className="text-sm text-[#F66PAC] font-medium">
              -{formatCurrency(totalExpense)}
            </span>
          </div>
        </div>
        <select className="px-3 py-1.5 bg-[#F2F4F8] rounded-lg text-xs text-[#5A607F] cursor-pointer outline-none">
          <option>Tháng này</option>
          <option>Tháng trước</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={MOCK_WEEKLY_DATA}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            barCategoryGap="30%"
            barGap={4}
          >
            <defs>
              <linearGradient id="barIncomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#21AE5A" stopOpacity={1} />
                <stop offset="100%" stopColor="#21AE5A" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="barExpenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F66PAC" stopOpacity={1} />
                <stop offset="100%" stopColor="#F66PAC" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ECEEF5" vertical={false} />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9EA3B8' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9EA3B8' }}
              tickFormatter={(value) => {
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                return value;
              }}
            />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ECEEF5',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              cursor={{ fill: '#F8F9FA' }}
            />
            <Bar
              dataKey="income"
              name="Thu nhập"
              fill="url(#barIncomeGradient)"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            />
            <Bar
              dataKey="expense"
              name="Chi tiêu"
              fill="url(#barExpenseGradient)"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
              animationBegin={200}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[#21AE5A]" />
          <span className="text-xs text-[#5A607F]">Thu nhập</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[#F66PAC]" />
          <span className="text-xs text-[#5A607F]">Chi tiêu</span>
        </div>
      </div>
    </div>
  );
}

// =====================
// Line Chart: 6 Month Trend
// =====================
interface TrendLineChartProps {
  className?: string;
}

export function TrendLineChart({ className }: TrendLineChartProps) {
  return (
    <div className={cn('bg-white rounded-xl p-6 shadow-sm', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-[#1A1D2E]">Xu hướng 6 tháng</h3>
          <p className="text-xs text-[#9EA3B8] mt-1">Thu nhập, Chi tiêu & Tiết kiệm</p>
        </div>
        <select className="px-3 py-1.5 bg-[#F2F4F8] rounded-lg text-xs text-[#5A607F] cursor-pointer outline-none">
          <option>6 tháng</option>
          <option>3 tháng</option>
          <option>1 năm</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={MOCK_MONTHLY_TREND}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="incomeLineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#21AE5A" />
                <stop offset="100%" stopColor="#21AE5A" />
              </linearGradient>
              <linearGradient id="expenseLineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F66PAC" />
                <stop offset="100%" stopColor="#F66PAC" />
              </linearGradient>
              <linearGradient id="savingsLineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#827BF2" />
                <stop offset="100%" stopColor="#827BF2" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ECEEF5" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#9EA3B8' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9EA3B8' }}
              tickFormatter={(value) => {
                if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
                return value;
              }}
            />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ECEEF5',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Line
              type="monotone"
              dataKey="income"
              name="Thu nhập"
              stroke="url(#incomeLineGradient)"
              strokeWidth={2}
              dot={{ fill: '#21AE5A', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1000}
            />
            <Line
              type="monotone"
              dataKey="expense"
              name="Chi tiêu"
              stroke="url(#expenseLineGradient)"
              strokeWidth={2}
              dot={{ fill: '#F66PAC', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1000}
              animationBegin={200}
            />
            <Line
              type="monotone"
              dataKey="savings"
              name="Tiết kiệm"
              stroke="url(#savingsLineGradient)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#827BF2', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1000}
              animationBegin={400}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#21AE5A]" />
          <span className="text-xs text-[#5A607F]">Thu nhập</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F66PAC]" />
          <span className="text-xs text-[#5A607F]">Chi tiêu</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#827BF2]" />
          <span className="text-xs text-[#5A607F]">Tiết kiệm</span>
        </div>
      </div>
    </div>
  );
}
