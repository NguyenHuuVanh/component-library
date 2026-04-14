'use client';

import type { RecentTransactionsProps } from '@/types/expense-dashboard';
import { formatCurrency, formatDate } from '@/data/expense-dashboard-mock';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { cn } from '@/utils/cn';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn-ui/table';

// Loading skeleton
function RecentTransactionsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function RecentTransactions({
  data,
  currency = 'VND',
  maxItems = 5,
  isLoading,
  onTransactionClick,
}: RecentTransactionsProps) {
  if (isLoading) {
    return <RecentTransactionsSkeleton />;
  }

  const displayData = data.slice(0, maxItems);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Giao dịch gần đây</CardTitle>
          <span className="text-xs text-muted-foreground">
            {data.length > maxItems ? `Hiển thị ${maxItems} / ${data.length} giao dịch` : `${data.length} giao dịch`}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {displayData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Chưa có giao dịch nào</p>
          </div>
        ) : (
          <div className="space-y-2">
            {displayData.map((transaction) => {
              const isIncome = transaction.type === 'income';
              const categoryColor = transaction.categoryId?.color || (isIncome ? '#22C55E' : '#EF4444');

              return (
                <div
                  key={transaction._id}
                  className={cn(
                    'flex items-center gap-4 p-3 rounded-lg transition-all duration-200',
                    'hover:bg-muted/50 cursor-pointer',
                    onTransactionClick && 'cursor-pointer',
                  )}
                  onClick={() => onTransactionClick?.(transaction)}
                >
                  {/* Category Icon */}
                  <div
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-full shrink-0',
                      'text-lg'
                    )}
                    style={{ backgroundColor: `${categoryColor}15` }}
                  >
                    {transaction.categoryId?.icon || (isIncome ? '💰' : '💸')}
                  </div>

                  {/* Transaction Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-foreground truncate">
                      {transaction.description || transaction.categoryId?.name || (isIncome ? 'Thu nhập' : 'Chi tiêu')}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: `${categoryColor}10`, color: categoryColor }}
                      >
                        {transaction.categoryId?.icon} {transaction.categoryId?.name}
                      </span>
                      <span>•</span>
                      <span>{formatDate(transaction.date)}</span>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="flex items-center gap-1 shrink-0">
                    {isIncome ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                    <span
                      className={cn(
                        'font-semibold',
                        isIncome ? 'text-green-600' : 'text-red-600'
                      )}
                    >
                      {isIncome ? '+' : '-'}
                      {formatCurrency(transaction.amount, currency)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Link */}
        {data.length > maxItems && (
          <div className="mt-4 pt-4 border-t">
            <button
              type="button"
              className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              onClick={() => console.log('View all transactions')}
            >
              Xem tất cả {data.length} giao dịch
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
