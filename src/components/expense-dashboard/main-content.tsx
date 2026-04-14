"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";
import { BalanceCard, QuickLinks } from "./balance-card";
import { IncomeExpenseBarChart, TrendLineChart } from "./charts";
import { BudgetTracker } from "./budget-tracker";
import { ComparisonChart, Heatmap } from "./comparison-heatmap";
import { ForecastChart } from "./forecast-chart";
import { TransactionsTable } from "./transactions-table";
import { MetricCardsGrid } from "../dashboard/metric-cards-grid";
import { Badge } from "../shadcn-ui/badge";
import { SelectField } from "../custom-fields/select-field";
import { DatePickerField } from "../custom-fields/date-picker-field";
import { Button } from "../shadcn-ui/button";
import {
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
} from "date-fns";

interface MetricItem {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: "blue" | "purple" | "orange" | "green";
  trend?: {
    value: number;
    label: string;
  };
}

interface MainContentProps {
  className?: string;
  dateRange?: { from: Date | undefined; to: Date | undefined };
  onDateRangeChange?: (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
  onRefresh?: () => void;
}

export function MainContent({
  className,
  dateRange,
  onDateRangeChange,
  onRefresh,
}: MainContentProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const metricItems: MetricItem[] = [
    {
      label: "Tổng thu",
      value: "125.500.000đ",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "green",
      trend: { value: 12.5, label: "so với tháng trước" },
    },
    {
      label: "Tổng chi",
      value: "89.200.000đ",
      icon: <TrendingDown className="w-5 h-5" />,
      color: "red",
      trend: { value: -5.2, label: "so với tháng trước" },
    },
    {
      label: "Số dư",
      value: "36.300.000đ",
      icon: <DollarSign className="w-5 h-5" />,
      color: "blue",
      trend: { value: 8.3, label: "so với tháng trước" },
    },
    {
      label: "Số giao dịch",
      value: 156,
      icon: <CreditCard className="w-5 h-5" />,
      color: "purple",
      trend: { value: 3.1, label: "so với tháng trước" },
    },
  ];

  const categoryOptions = [
    { value: "", label: "Tất cả danh mục" },
    { value: "food", label: "Ăn uống" },
    { value: "transport", label: "Di chuyển" },
    { value: "shopping", label: "Mua sắm" },
    { value: "bills", label: "Hóa đơn" },
    { value: "entertainment", label: "Giải trí" },
    { value: "health", label: "Sức khỏe" },
    { value: "education", label: "Giáo dục" },
  ];

  const periodOptions = [
    { value: "thisWeek", label: "Tuần này" },
    { value: "thisMonth", label: "Tháng này" },
    { value: "thisQuarter", label: "Quý này" },
    { value: "thisYear", label: "Năm nay" },
  ];

  const tagOptions = [
    { value: "all", label: "Tất cả" },
    { value: "income", label: "Thu nhập" },
    { value: "expense", label: "Chi tiêu" },
    { value: "transfer", label: "Chuyển khoản" },
  ];

  const [selectedTag, setSelectedTag] = useState("all");

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    const now = new Date();
    let range = {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    };

    switch (period) {
      case "thisWeek":
        range = { from: startOfWeek(now), to: endOfWeek(now) };
        break;
      case "thisMonth":
        range = { from: startOfMonth(now), to: endOfMonth(now) };
        break;
      case "thisQuarter":
        range = { from: startOfQuarter(now), to: endOfQuarter(now) };
        break;
      case "thisYear":
        range = { from: startOfYear(now), to: endOfYear(now) };
        break;
    }

    onDateRangeChange?.(range);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Filters Bar */}
      <div className="bg-white rounded-xl border p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Period + Date Range */}
          <div className="flex flex-wrap items-center gap-3">
            <SelectField
              placeholder="Chọn kỳ"
              options={periodOptions}
              selected={selectedPeriod}
              onChangeSelected={handlePeriodChange}
              classWapper="mb-0 w-40"
            />

            <DatePickerField
              mode="range"
              selectedForm={dateRange?.from}
              selectedTo={dateRange?.to}
              onSelect={onDateRangeChange}
              placeholder="Chọn khoảng ngày"
              classWapper="mb-0 b"
            />

            <SelectField
              placeholder="Danh mục"
              options={categoryOptions}
              selected={selectedCategory}
              onChangeSelected={setSelectedCategory}
              classWapper="mb-0 w-48"
            />

            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="h-9"
            >
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc
            </Button>
          </div>

          {/* Right: Tags + Refresh */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-[#F2F4F8] rounded-lg">
              {tagOptions.map((tag) => (
                <button
                  key={tag.value}
                  onClick={() => setSelectedTag(tag.value)}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                    selectedTag === tag.value
                      ? "bg-white text-[#1A1D2E] shadow-sm"
                      : "text-[#5A607F] hover:text-[#1A1D2E]",
                  )}
                >
                  {tag.label}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={onRefresh}
              className="h-9 w-9"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-[#5A607F] mb-1 block">
                Số tiền tối thiểu
              </label>
              <input
                type="number"
                placeholder="0đ"
                className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#5A607F] mb-1 block">
                Số tiền tối đa
              </label>
              <input
                type="number"
                placeholder="10.000.000đ"
                className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#5A607F] mb-1 block">
                Trạng thái
              </label>
              <SelectField
                placeholder="Chọn trạng thái"
                options={[
                  { value: "", label: "Tất cả" },
                  { value: "completed", label: "Hoàn thành" },
                  { value: "pending", label: "Đang xử lý" },
                  { value: "failed", label: "Thất bại" },
                ]}
                selected=""
                classWapper="mb-0"
              />
            </div>
          </div>
        )}

        {/* Active Filter Tags */}
        {(selectedCategory || selectedTag !== "all" || showFilters) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-[#5A607F]">Bộ lọc đang áp dụng:</span>
            {selectedCategory && (
              <Badge
                variant="secondary"
                className="text-xs px-2 py-1 h-6 bg-[#827BF2]/10 text-[#827BF2] border border-[#827BF2]/20"
              >
                {
                  categoryOptions.find((c) => c.value === selectedCategory)
                    ?.label
                }
                <button
                  className="ml-1 hover:text-[#E40127]"
                  onClick={() => setSelectedCategory("")}
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedTag !== "all" && (
              <Badge
                variant="secondary"
                className="text-xs px-2 py-1 h-6 bg-[#827BF2]/10 text-[#827BF2] border border-[#827BF2]/20"
              >
                {tagOptions.find((t) => t.value === selectedTag)?.label}
                <button
                  className="ml-1 hover:text-[#E40127]"
                  onClick={() => setSelectedTag("all")}
                >
                  ×
                </button>
              </Badge>
            )}
            <button
              className="text-xs text-[#E40127] hover:underline"
              onClick={() => {
                setSelectedCategory("");
                setSelectedTag("all");
                setShowFilters(false);
              }}
            >
              Xóa tất cả
            </button>
          </div>
        )}
      </div>

      {/* Metric Cards */}
      <MetricCardsGrid metricCardsItems={metricItems} loading={false} />

      {/* Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncomeExpenseBarChart />
        <TrendLineChart />
      </div>

      <BudgetTracker />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComparisonChart />
        <Heatmap />
      </div>

      <ForecastChart />

      <TransactionsTable />
    </div>
  );
}
