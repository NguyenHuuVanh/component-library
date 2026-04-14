'use client';

import { useState } from 'react';
import { cn } from '@/utils/cn';
import { Search, Plus, Filter, MoreHorizontal, ArrowUpDown, X } from 'lucide-react';
import { MOCK_TRANSACTIONS, formatCurrency, formatDate } from '@/data/expense-dashboard-mock';
import { SelectField } from '../custom-fields/select-field';
import { DatePickerField } from '../custom-fields/date-picker-field';
import { Badge } from '../shadcn-ui/badge';
import { Button } from '../shadcn-ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../shadcn-ui/dropdown-menu';

interface TransactionsTableProps {
  className?: string;
}

export function TransactionsTable({ className }: TransactionsTableProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Category options
  const categoryOptions = [
    { value: '', label: 'Tất cả danh mục' },
    { value: 'food', label: '🍜 Ăn uống' },
    { value: 'transport', label: '🚗 Di chuyển' },
    { value: 'shopping', label: '🛒 Mua sắm' },
    { value: 'bills', label: '📄 Hóa đơn' },
    { value: 'entertainment', label: '🎮 Giải trí' },
  ];

  // Wallet options
  const walletOptions = [
    { value: '', label: 'Tất cả ví' },
    { value: 'wallet-1', label: '💳 VCB' },
    { value: 'wallet-2', label: '📱 Momo' },
    { value: 'wallet-3', label: '💵 Tiền mặt' },
  ];

  // Type options
  const typeOptions = [
    { value: '', label: 'Tất cả loại' },
    { value: 'income', label: '📥 Thu nhập' },
    { value: 'expense', label: '📤 Chi tiêu' },
  ];

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'oldest', label: 'Cũ nhất' },
    { value: 'highest', label: 'Số tiền cao nhất' },
    { value: 'lowest', label: 'Số tiền thấp nhất' },
  ];

  const [selectedSort, setSelectedSort] = useState('newest');

  // Filter tags
  const activeFilters = [
    selectedCategory && { key: 'category', label: categoryOptions.find(c => c.value === selectedCategory)?.label },
    selectedWallet && { key: 'wallet', label: walletOptions.find(w => w.value === selectedWallet)?.label },
    selectedType && { key: 'type', label: typeOptions.find(t => t.value === selectedType)?.label },
  ].filter(Boolean) as { key: string; label: string }[];

  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedWallet('');
    setSelectedType('');
  };

  return (
    <div className={cn('bg-white rounded-xl shadow-sm overflow-hidden', className)}>
      {/* Header */}
      <div className="p-6 border-b border-[#ECEEF5]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Title */}
          <div className="flex items-center gap-3">
            <h3 className="text-base font-semibold text-[#1A1D2E]">Giao dịch gần đây</h3>
            <Badge variant="secondary" className="text-xs px-2 py-0.5 h-5">
              {MOCK_TRANSACTIONS.length} giao dịch
            </Badge>
          </div>

          {/* Search + Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9EA3B8]" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 h-9 pl-10 pr-3 rounded-lg border border-input bg-background text-sm"
              />
            </div>

            {/* Category Select */}
            <SelectField
              placeholder="Danh mục"
              options={categoryOptions}
              selected={selectedCategory}
              onChangeSelected={setSelectedCategory}
              classWapper="mb-0 w-44"
            />

            {/* Wallet Select */}
            <SelectField
              placeholder="Ví"
              options={walletOptions}
              selected={selectedWallet}
              onChangeSelected={setSelectedWallet}
              classWapper="mb-0 w-36"
            />

            {/* Type Select */}
            <SelectField
              placeholder="Loại"
              options={typeOptions}
              selected={selectedType}
              onChangeSelected={setSelectedType}
              classWapper="mb-0 w-36"
            />

            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-2">
                  <ArrowUpDown className="w-4 h-4" />
                  {sortOptions.find(s => s.value === selectedSort)?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSelectedSort(option.value)}
                    className={cn(selectedSort === option.value && 'bg-accent')}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Filter Button */}
            <Button
              variant={showFilters ? 'default' : 'outline'}
              size="sm"
              className="h-9"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Lọc thêm
            </Button>

            {/* Add Button */}
            <Button size="sm" className="h-9 bg-[#827BF2] hover:bg-[#827BF2]/90">
              <Plus className="w-4 h-4 mr-2" />
              Thêm mới
            </Button>
          </div>
        </div>

        {/* Extended Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-[#5A607F] mb-1 block">Ngày bắt đầu</label>
              <DatePickerField
                mode="single"
                placeholder="Từ ngày"
                classWapper="mb-0"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#5A607F] mb-1 block">Ngày kết thúc</label>
              <DatePickerField
                mode="single"
                placeholder="Đến ngày"
                classWapper="mb-0"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#5A607F] mb-1 block">Số tiền tối thiểu</label>
              <input type="number" placeholder="0đ" className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm" />
            </div>
            <div>
              <label className="text-sm font-medium text-[#5A607F] mb-1 block">Số tiền tối đa</label>
              <input type="number" placeholder="10.000.000đ" className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm" />
            </div>
          </div>
        )}

        {/* Active Filter Tags */}
        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-[#5A607F]">Đang lọc:</span>
            {activeFilters.map((filter) => (
              <Badge key={filter.key} variant="secondary" className="text-xs px-2 py-1 h-6 bg-[#827BF2]/10 text-[#827BF2] border border-[#827BF2]/20 gap-1">
                {filter.label}
                <button
                  className="ml-1 hover:text-[#E40127]"
                  onClick={() => {
                    if (filter.key === 'category') setSelectedCategory('');
                    if (filter.key === 'wallet') setSelectedWallet('');
                    if (filter.key === 'type') setSelectedType('');
                  }}
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            <button
              className="text-xs text-[#E40127] hover:underline"
              onClick={clearAllFilters}
            >
              Xóa tất cả
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F2F4F8]">
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#5A607F] uppercase tracking-wider">
                Ngày
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#5A607F] uppercase tracking-wider">
                Danh mục
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#5A607F] uppercase tracking-wider">
                Mô tả
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#5A607F] uppercase tracking-wider">
                Ví
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-[#5A607F] uppercase tracking-wider">
                Số tiền
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-[#5A607F] uppercase tracking-wider w-12">
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ECEEF5]">
            {MOCK_TRANSACTIONS.map((transaction) => {
              const isIncome = transaction.type === 'income';
              return (
                <tr
                  key={transaction._id}
                  className="hover:bg-[#F2F4F8]/50 cursor-pointer transition-colors"
                >
                  {/* Date */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-[#5A607F]">
                      {formatDate(transaction.date)}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                        style={{ backgroundColor: `${transaction.categoryId.color}20` }}
                      >
                        {transaction.categoryId.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-[#1A1D2E]">
                          {transaction.categoryId.name}
                        </span>
                        <Badge
                          variant={isIncome ? 'success' : 'destructive'}
                          className="text-[10px] px-1.5 py-0.5 h-4 w-fit"
                        >
                          {isIncome ? 'Thu nhập' : 'Chi tiêu'}
                        </Badge>
                      </div>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#1A1D2E]">
                      {transaction.description || '-'}
                    </span>
                  </td>

                  {/* Wallet */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#5A607F]">
                      {transaction.walletId === 'wallet-1' ? 'VCB' :
                       transaction.walletId === 'wallet-2' ? 'Momo' :
                       transaction.walletId === 'wallet-3' ? 'Tiền mặt' : '-'}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 text-right">
                    <span
                      className={cn(
                        'text-sm font-semibold',
                        isIncome ? 'text-[#21AE5A]' : 'text-[#E40127]'
                      )}
                    >
                      {isIncome ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center">
                    <button className="p-1 rounded hover:bg-[#ECEEF5] text-[#9EA3B8] transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-[#ECEEF5] flex items-center justify-between">
        <span className="text-sm text-[#5A607F]">
          Hiển thị {MOCK_TRANSACTIONS.length} giao dịch
        </span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-[#ECEEF5] text-sm text-[#5A607F] hover:bg-[#F2F4F8] disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            Trước
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-[#827BF2] text-white text-sm font-medium">
            1
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-[#ECEEF5] text-sm text-[#5A607F] hover:bg-[#F2F4F8]">
            2
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-[#ECEEF5] text-sm text-[#5A607F] hover:bg-[#F2F4F8]">
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
