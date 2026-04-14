'use client';

import { cn } from '@/utils/cn';
import {
  Wallet,
  ArrowUpDown,
  Plus,
  PiggyBank,
  BarChart3,
  Receipt,
} from 'lucide-react';
import { MOCK_DASHBOARD_SUMMARY, formatCurrency } from '@/data/expense-dashboard-mock';

interface BalanceCardProps {
  className?: string;
}

export function BalanceCard({ className }: BalanceCardProps) {
  const { totalIncome, totalExpense, netBalance, incomeTrend, expenseTrend, balanceTrend } = MOCK_DASHBOARD_SUMMARY;

  return (
    <div className={cn('bg-white rounded-xl p-6 shadow-sm', className)}>
      {/* Balance Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm text-[#5A607F] mb-1">Số dư hiện tại</p>
          <h2 className="text-3xl font-bold text-[#1A1D2E]">
            {formatCurrency(netBalance)}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#21AE5A]/10 text-[#21AE5A] text-xs font-medium rounded-full">
              <span>▲</span>
              <span>+{balanceTrend}%</span>
            </span>
            <span className="text-xs text-[#9EA3B8]">so với tháng trước</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#827BF2]/10 flex items-center justify-center">
          <Wallet className="w-6 h-6 text-[#827BF2]" />
        </div>
      </div>

      {/* Income / Expense Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 rounded-lg bg-[#21AE5A]/5">
          <p className="text-xs text-[#5A607F] mb-1">Thu nhập tháng</p>
          <p className="text-lg font-semibold text-[#21AE5A]">
            +{formatCurrency(totalIncome)}
          </p>
          <p className="text-xs text-[#21AE5A] mt-1">▲ +{incomeTrend}%</p>
        </div>
        <div className="p-3 rounded-lg bg-[#F66PAC]/5">
          <p className="text-xs text-[#5A607F] mb-1">Chi tiêu tháng</p>
          <p className="text-lg font-semibold text-[#F66PAC]">
            -{formatCurrency(totalExpense)}
          </p>
          <p className="text-xs text-[#F66PAC] mt-1">▼ -{expenseTrend}%</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#827BF2] text-white rounded-lg font-medium text-sm hover:bg-[#827BF2]/90 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Nạp tiền</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F2F4F8] text-[#1A1D2E] rounded-lg font-medium text-sm hover:bg-[#EAE8FD] transition-colors">
          <ArrowUpDown className="w-4 h-4" />
          <span>Chuyển</span>
        </button>
      </div>
    </div>
  );
}

interface QuickLinksProps {
  className?: string;
}

export function QuickLinks({ className }: QuickLinksProps) {
  const links = [
    {
      icon: <Receipt className="w-5 h-5" />,
      label: 'Thêm Giao Dịch',
      color: '#827BF2',
      bgColor: 'bg-[#827BF2]/10',
    },
    {
      icon: <PiggyBank className="w-5 h-5" />,
      label: 'Đặt Ngân Sách',
      color: '#21AE5A',
      bgColor: 'bg-[#21AE5A]/10',
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: 'Xem Báo Cáo',
      color: '#F66PAC',
      bgColor: 'bg-[#F66PAC]/10',
    },
    {
      icon: <Wallet className="w-5 h-5" />,
      label: 'Quản Lý Ví',
      color: '#F89C34',
      bgColor: 'bg-[#F89C34]/10',
    },
  ];

  return (
    <div className={cn('bg-white rounded-xl p-6 shadow-sm', className)}>
      <h3 className="text-sm font-semibold text-[#1A1D2E] mb-4">Thao tác nhanh</h3>
      <div className="grid grid-cols-2 gap-3">
        {links.map((link, index) => (
          <button
            key={index}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg border border-transparent',
              'hover:border-[#ECEEF5] hover:bg-[#F2F4F8] transition-all',
              'text-left'
            )}
          >
            <div
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                link.bgColor
              )}
              style={{ color: link.color }}
            >
              {link.icon}
            </div>
            <span className="text-sm font-medium text-[#1A1D2E]">{link.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
