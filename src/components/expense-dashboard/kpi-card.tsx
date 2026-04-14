'use client';

import type { KPICardProps, KPICardColor } from '@/types/expense-dashboard';
import { formatCurrency, formatCompactCurrency } from '@/data/expense-dashboard-mock';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/utils/cn';

// Color mapping
const COLOR_MAP: Record<KPICardColor, { bg: string; border: string; icon: string; value: string }> = {
  blue: {
    bg: 'bg-blue-50/80',
    border: 'border-blue-200/50',
    icon: 'text-blue-600',
    value: 'text-blue-700',
  },
  green: {
    bg: 'bg-green-50/80',
    border: 'border-green-200/50',
    icon: 'text-green-600',
    value: 'text-green-700',
  },
  red: {
    bg: 'bg-red-50/80',
    border: 'border-red-200/50',
    icon: 'text-red-600',
    value: 'text-red-700',
  },
  purple: {
    bg: 'bg-purple-50/80',
    border: 'border-purple-200/50',
    icon: 'text-purple-600',
    value: 'text-purple-700',
  },
  orange: {
    bg: 'bg-orange-50/80',
    border: 'border-orange-200/50',
    icon: 'text-orange-600',
    value: 'text-orange-700',
  },
};

// Mini sparkline SVG component
function MiniSparkline({ data, color }: { data: number[]; color: KPICardColor }) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const height = 32;
  const width = 80;
  const padding = 2;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - ((value - min) / range) * (height - padding * 2) - padding;
    return `${x},${y}`;
  });

  const colorValue = COLOR_MAP[color].icon;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`sparkline-gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`M ${points.join(' L ')} L ${width - padding},${height} L ${padding},${height} Z`}
        fill={`url(#sparkline-gradient-${color})`}
        className={colorValue}
      />
      <path
        d={`M ${points.join(' L ')}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={colorValue}
      />
    </svg>
  );
}

// Loading skeleton
function KPICardSkeleton() {
  return (
    <div className="bg-white rounded-xl border p-5 animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-8 w-8 bg-gray-200 rounded-lg" />
      </div>
      <div className="h-8 w-32 bg-gray-200 rounded mb-2" />
      <div className="h-3 w-20 bg-gray-200 rounded mb-3" />
      <div className="h-8 w-full bg-gray-100 rounded" />
    </div>
  );
}

export function KPICard({
  label,
  value,
  icon,
  trend,
  format = 'currency',
  color = 'blue',
  isLoading,
  sparklineData,
}: KPICardProps) {
  if (isLoading) {
    return <KPICardSkeleton />;
  }

  const colorClasses = COLOR_MAP[color];
  const isPositive = trend !== undefined && trend > 0;
  const isNegative = trend !== undefined && trend < 0;
  const isNeutral = trend === undefined || trend === 0;

  // Format value based on format type
  const formattedValue =
    format === 'currency'
      ? formatCurrency(value)
      : format === 'percent'
        ? `${value.toFixed(1)}%`
        : formatCompactCurrency(value);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border p-5 transition-all duration-200',
        'hover:shadow-md hover:border-opacity-60',
        colorClasses.bg,
        colorClasses.border,
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 -translate-y-8 translate-x-8 rounded-full bg-gradient-to-br from-white/30 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <div
          className={cn(
            'flex items-center justify-center w-10 h-10 rounded-xl',
            'bg-white/70 backdrop-blur-sm shadow-sm',
            colorClasses.icon,
          )}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <div className={cn('text-2xl font-bold mb-1', colorClasses.value)}>
        {formattedValue}
      </div>

      {/* Trend */}
      {trend !== undefined && (
        <div className="flex items-center gap-1 mb-3">
          {isPositive && (
            <>
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-600">
                +{Math.abs(trend).toFixed(1)}% so với tháng trước
              </span>
            </>
          )}
          {isNegative && (
            <>
              <TrendingDown className="w-4 h-4 text-red-600" />
              <span className="text-xs font-medium text-red-600">
                {trend.toFixed(1)}% so với tháng trước
              </span>
            </>
          )}
          {isNeutral && (
            <>
              <Minus className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-500">
                Không thay đổi
              </span>
            </>
          )}
        </div>
      )}

      {/* Sparkline */}
      {sparklineData && sparklineData.length > 1 && (
        <div className="mt-2 flex justify-end">
          <MiniSparkline data={sparklineData} color={color} />
        </div>
      )}
    </div>
  );
}
