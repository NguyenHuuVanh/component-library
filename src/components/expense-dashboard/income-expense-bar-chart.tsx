'use client';

import type { IncomeExpenseBarChartProps } from '@/types/expense-dashboard';
import { formatCurrency } from '@/data/expense-dashboard-mock';
import { format, parseISO } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-ui/card';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string;
  currency?: string;
}

function CustomTooltip({ active, payload, label, currency = 'VND' }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg border shadow-lg p-3">
      <p className="text-xs font-medium text-gray-500 mb-2">
        {label && format(parseISO(label), 'dd/MM/yyyy')}
      </p>
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-600 capitalize">
              {entry.name === 'income' ? 'Thu' : 'Chi'}:
            </span>
            <span className="text-xs font-semibold" style={{ color: entry.color }}>
              {formatCurrency(entry.value, currency)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Loading skeleton
function IncomeExpenseBarChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-[250px] bg-gray-100 rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}

export function IncomeExpenseBarChart({
  data,
  currency = 'VND',
  isLoading,
}: IncomeExpenseBarChartProps) {
  if (isLoading) {
    return <IncomeExpenseBarChartSkeleton />;
  }

  // Take last 14 days for bar chart (more visible than 30 days)
  const chartData = data.slice(-14).map((item) => ({
    ...item,
    dateLabel: format(parseISO(item.date), 'dd/MM'),
  }));

  // Calculate totals
  const totalIncome = chartData.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = chartData.reduce((sum, item) => sum + item.expense, 0);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Thu vs Chi (14 ngày gần nhất)</CardTitle>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-green-500" />
              <span className="text-gray-600">Thu: {formatCurrency(totalIncome, currency)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-red-500" />
              <span className="text-gray-600">Chi: {formatCurrency(totalExpense, currency)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              barCategoryGap="20%"
              barGap={4}
            >
              <defs>
                <linearGradient id="barIncomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity={1} />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient id="barExpenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity={1} />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis
                dataKey="dateLabel"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                dy={10}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                  return value;
                }}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip currency={currency} />} cursor={{ fill: '#F3F4F6' }} />
              <Bar
                dataKey="income"
                name="income"
                fill="url(#barIncomeGradient)"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />
              <Bar
                dataKey="expense"
                name="expense"
                fill="url(#barExpenseGradient)"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationBegin={200}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
