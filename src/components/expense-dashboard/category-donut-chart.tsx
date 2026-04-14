'use client';

import type { CategoryDonutChartProps } from '@/types/expense-dashboard';
import { formatCurrency } from '@/data/expense-dashboard-mock';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { useState } from 'react';
import { cn } from '@/utils/cn';

interface ActiveShapeProps {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: {
    name: string;
    value: number;
    percent: number;
  };
}

function renderActiveShape(props: ActiveShapeProps) {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 4}
        outerRadius={innerRadius - 1}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: string;
      value: number;
      color: string;
      percent: number;
    };
  }>;
  currency?: string;
}

function CustomTooltip({ active, payload, currency = 'VND' }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0]?.payload;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg border shadow-lg p-3">
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: data?.color }}
        />
        <span className="text-sm font-medium">{data?.name}</span>
      </div>
      <div className="text-xs text-gray-600">
        <span className="font-semibold" style={{ color: data?.color }}>
          {formatCurrency(data?.value, currency)}
        </span>
        <span className="ml-1">({(data?.percent * 100).toFixed(1)}%)</span>
      </div>
    </div>
  );
}

// Loading skeleton
function CategoryDonutSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="flex gap-6">
          <div className="w-[180px] h-[180px] bg-gray-100 rounded-full animate-pulse" />
          <div className="flex-1 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 flex-1 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CategoryDonutChart({
  data,
  currency = 'VND',
  isLoading,
  onCategoryClick,
}: CategoryDonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const total = data.reduce((sum, item) => sum + item.total, 0);

  if (isLoading) {
    return <CategoryDonutSkeleton />;
  }

  const chartData = data.map((item) => ({
    ...item,
    percent: total > 0 ? item.total / total : 0,
  }));

  const handleMouseEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Chi tiêu theo danh mục</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Donut Chart */}
          <div className="relative w-[200px] h-[200px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="total"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={(_, index) => onCategoryClick?.(data[index])}
                  animationDuration={800}
                  animationBegin={200}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      strokeWidth={0}
                      className={cn(
                        'transition-all duration-200 cursor-pointer',
                        activeIndex === index ? 'opacity-100' : 'opacity-80 hover:opacity-100',
                      )}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip currency={currency} />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-gray-500">Tổng chi</span>
              <span className="text-lg font-bold text-gray-800">
                {formatCurrency(total, currency)}
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 w-full space-y-2">
            {chartData.map((item, index) => (
              <div
                key={item._id}
                className={cn(
                  'flex items-center gap-3 p-2 rounded-lg transition-all duration-200 cursor-pointer',
                  'hover:bg-gray-50',
                  activeIndex === index && 'bg-gray-50 ring-2 ring-primary/20',
                )}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(undefined)}
                onClick={() => onCategoryClick?.(item)}
              >
                <div
                  className="w-4 h-4 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium text-gray-800 truncate">
                      {item.name}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-semibold text-gray-800">
                    {formatCurrency(item.total, currency)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {(item.percent * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
