'use client';

import { cn } from '@/utils/cn';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts';
import { MOCK_FORECAST_DATA, formatCurrency } from '@/data/expense-dashboard-mock';
import { Info } from 'lucide-react';

interface ForecastChartProps {
  className?: string;
}

export function ForecastChart({ className }: ForecastChartProps) {
  // Calculate current expense and forecast
  const currentExpense = 3000000;
  const monthlyBudget = 13000000;
  const forecastEnd = 12300000;
  const remaining = monthlyBudget - forecastEnd;

  return (
    <div className={cn('bg-white rounded-xl p-6 shadow-sm', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-[#1A1D2E]">Dự báo chi tiêu</h3>
          <div className="flex items-center gap-1 mt-1 text-xs text-[#9EA3B8]">
            <Info className="w-3 h-3" />
            <span>Dựa trên trung bình 3 tháng gần nhất</span>
          </div>
        </div>
        <select className="px-3 py-1.5 bg-[#F2F4F8] rounded-lg text-xs text-[#5A607F] cursor-pointer outline-none">
          <option>Tháng này</option>
          <option>Tháng trước</option>
        </select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-3 rounded-lg bg-[#F2F4F8]">
          <p className="text-xs text-[#5A607F] mb-1">Chi tiêu hiện tại</p>
          <p className="text-sm font-semibold text-[#1A1D2E]">
            {formatCurrency(currentExpense)}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-[#F89C34]/10">
          <p className="text-xs text-[#5A607F] mb-1">Dự báo cuối tháng</p>
          <p className="text-sm font-semibold text-[#F89C34]">
            ~{formatCurrency(forecastEnd)}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-[#E40127]/5">
          <p className="text-xs text-[#5A607F] mb-1">Ngân sách tháng</p>
          <p className="text-sm font-semibold text-[#1A1D2E]">
            {formatCurrency(monthlyBudget)}
          </p>
        </div>
        <div className={cn(
          'p-3 rounded-lg',
          remaining >= 0 ? 'bg-[#21AE5A]/10' : 'bg-[#E40127]/10'
        )}>
          <p className="text-xs text-[#5A607F] mb-1">
            {remaining >= 0 ? 'Còn lại (dự báo)' : 'Vượt ngân sách'}
          </p>
          <p className={cn(
            'text-sm font-semibold',
            remaining >= 0 ? 'text-[#21AE5A]' : 'text-[#E40127]'
          )}>
            {remaining >= 0 ? '+' : ''}{formatCurrency(Math.abs(remaining))}
            {remaining >= 0 && <span className="ml-1">✅</span>}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={MOCK_FORECAST_DATA}
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
          >
            <defs>
              {/* Actual area gradient */}
              <linearGradient id="actualAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#827BF2" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#827BF2" stopOpacity={0.05} />
              </linearGradient>
              {/* Forecast area gradient */}
              <linearGradient id="forecastAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F89C34" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#F89C34" stopOpacity={0.05} />
              </linearGradient>
              {/* Safe zone gradient (under budget) */}
              <linearGradient id="safeZoneGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#21AE5A" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#21AE5A" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ECEEF5" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9EA3B8' }}
              tickFormatter={(value) => `${value}`}
              label={{ value: 'Ngày', position: 'insideBottom', fontSize: 10, fill: '#9EA3B8' }}
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
              formatter={(value: number, name: string) => {
                if (value === null) return ['-', name];
                return [formatCurrency(value), name === 'actual' ? 'Thực tế' : name === 'forecast' ? 'Dự báo' : 'Ngân sách'];
              }}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ECEEF5',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />

            {/* Budget Reference Line */}
            <ReferenceLine
              y={monthlyBudget}
              stroke="#E40127"
              strokeDasharray="5 5"
              strokeWidth={1}
            />

            {/* Actual Area (solid line, filled) */}
            <Area
              type="monotone"
              dataKey="actual"
              name="actual"
              stroke="#827BF2"
              strokeWidth={2}
              fill="url(#actualAreaGradient)"
              connectNulls={false}
              animationDuration={1000}
            />

            {/* Forecast Area (dashed line, lighter fill) */}
            <Area
              type="monotone"
              dataKey="forecast"
              name="forecast"
              stroke="#F89C34"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#forecastAreaGradient)"
              connectNulls={false}
              animationDuration={1000}
              animationBegin={500}
            />

            {/* Budget Line */}
            <Line
              type="monotone"
              dataKey="budget"
              name="budget"
              stroke="#E40127"
              strokeWidth={1}
              strokeDasharray="3 3"
              dot={false}
              animationDuration={1000}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-[#827BF2]" />
          <span className="text-xs text-[#5A607F]">Thực tế</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 border-t-2 border-dashed border-[#F89C34]" />
          <span className="text-xs text-[#5A607F]">Dự báo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 border-t-2 border-dashed border-[#E40127]" />
          <span className="text-xs text-[#5A607F]">Ngân sách</span>
        </div>
      </div>
    </div>
  );
}
