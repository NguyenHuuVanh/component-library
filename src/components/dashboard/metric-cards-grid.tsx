'use client';

import { cn } from '@/utils/cn';

type MetricCardItem = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: 'blue' | 'purple' | 'orange' | 'green';
  trend?: {
    value: number;
    label: string;
  };
};

type MetricCardsGridProps = {
  metricCardsItems: MetricCardItem[];
  loading?: boolean;
};

const colorGradients = {
  blue: 'from-blue-600 to-blue-400',
  purple: 'from-purple-600 to-purple-400',
  orange: 'from-orange-600 to-orange-400',
  green: 'from-green-600 to-green-400',
} as const;

const colorIndex = 0;
type ColorType = keyof typeof colorGradients;

export function MetricCardsGrid({ metricCardsItems, loading }: MetricCardsGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-xl bg-gray-200"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metricCardsItems.map((item, index) => {
        const colorKey = (item.color || Object.keys(colorGradients)[colorIndex]) as ColorType;
        const gradient = colorGradients[colorKey] || colorGradients.blue;
        return (
          <div
            key={index}
            className={cn(
              'rounded-xl bg-gradient-to-br p-5 text-white shadow-lg',
              gradient,
            )}
          >
            <div className="text-sm opacity-80">{item.label}</div>
            <div className="mt-2 text-2xl font-bold">{item.value}</div>
            {item.trend && (
              <div className={cn(
                'mt-2 text-xs',
                item.trend.value > 0 ? 'text-green-200' : 'text-red-200',
              )}>
                {item.trend.value > 0 ? '+' : ''}{item.trend.value}% {item.trend.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
