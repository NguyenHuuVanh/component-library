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
  Cell,
} from 'recharts';
import { MOCK_COMPARISON_DATA, MOCK_HEATMAP_DATA, formatCurrency } from '@/data/expense-dashboard-mock';

// =====================
// Grouped Bar Chart: Month Comparison
// =====================
interface ComparisonChartProps {
  className?: string;
}

export function ComparisonChart({ className }: ComparisonChartProps) {
  return (
    <div className={cn('bg-white rounded-xl p-6 shadow-sm', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-[#1A1D2E]">So sánh với tháng trước</h3>
          <p className="text-xs text-[#9EA3B8] mt-1">Theo từng danh mục</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={MOCK_COMPARISON_DATA}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            barCategoryGap="40%"
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ECEEF5" vertical={false} />
            <XAxis
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9EA3B8' }}
              tickFormatter={(value) => {
                // Shorten category names
                const shortNames: Record<string, string> = {
                  'Ăn uống': 'Ăn',
                  'Di chuyển': 'Di',
                  'Mua sắm': 'Mua',
                  'Sức khỏe': 'Sức',
                  'Giải trí': 'Giải',
                };
                return shortNames[value] || value.slice(0, 3);
              }}
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
              formatter={(value: number, name: string) => [
                formatCurrency(value),
                name === 'thisMonth' ? 'Tháng này' : 'Tháng trước',
              ]}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ECEEF5',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Bar
              dataKey="thisMonth"
              name="thisMonth"
              fill="#827BF2"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            >
              {MOCK_COMPARISON_DATA.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill="#827BF2"
                  fillOpacity={0.6 + (0.4 * (entry.thisMonth / 1000000))}
                />
              ))}
            </Bar>
            <Bar
              dataKey="lastMonth"
              name="lastMonth"
              fill="#9EA3B8"
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
          <div className="w-3 h-3 rounded bg-[#827BF2]" />
          <span className="text-xs text-[#5A607F]">Tháng này</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[#9EA3B8]" />
          <span className="text-xs text-[#5A607F]">Tháng trước</span>
        </div>
      </div>
    </div>
  );
}

// =====================
// Heatmap: Daily Expense
// =====================
interface HeatmapProps {
  className?: string;
}

const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

function getHeatmapColor(value: number): string {
  if (value === 0) return '#F2F4F8'; // Empty
  if (value < 100000) return '#EAE8FD'; // Light purple - low
  if (value < 300000) return '#C4B5FD'; // Medium purple - medium
  return '#827BF2'; // Dark purple - high
}

export function Heatmap({ className }: HeatmapProps) {
  return (
    <div className={cn('bg-white rounded-xl p-6 shadow-sm', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-[#1A1D2E]">Chi tiêu theo ngày</h3>
          <p className="text-xs text-[#9EA3B8] mt-1">Trong tháng này</p>
        </div>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-8 gap-1 mb-2">
        <div className="w-8" /> {/* Empty corner */}
        {DAYS.map((day) => (
          <div
            key={day}
            className="w-8 h-6 flex items-center justify-center text-xs text-[#9EA3B8]"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Heatmap Grid */}
      <div className="space-y-1">
        {MOCK_HEATMAP_DATA.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-8 gap-1">
            {/* Week Label */}
            <div className="w-8 h-8 flex items-center justify-center text-xs text-[#9EA3B8]">
              {week.values.some((v) => v > 0) ? `T${weekIndex + 1}` : ''}
            </div>
            {/* Day Values */}
            {week.values.map((value, dayIndex) => (
              <div
                key={dayIndex}
                className="w-8 h-8 rounded flex items-center justify-center text-xs cursor-pointer hover:ring-2 hover:ring-[#827BF2]/50 transition-all"
                style={{ backgroundColor: getHeatmapColor(value) }}
                title={value > 0 ? formatCurrency(value) : 'Không có chi tiêu'}
              >
                {value > 0 && (
                  <span
                    className={cn(
                      'font-medium',
                      value >= 300000 ? 'text-white' : 'text-[#1A1D2E]'
                    )}
                  >
                    {value >= 1000000
                      ? `${(value / 1000000).toFixed(0)}M`
                      : value >= 1000
                        ? `${(value / 1000).toFixed(0)}K`
                        : value}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-[#F2F4F8]" />
          <span className="text-xs text-[#9EA3B8]">&lt;100K</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-[#C4B5FD]" />
          <span className="text-xs text-[#9EA3B8]">100-300K</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded bg-[#827BF2]" />
          <span className="text-xs text-[#9EA3B8]">&gt;300K</span>
        </div>
      </div>
    </div>
  );
}
