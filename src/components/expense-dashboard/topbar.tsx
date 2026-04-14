"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { Input } from "../shadcn-ui/input";

interface TopBarProps {
  className?: string;
  onSearchChange?: (query: string) => void;
}

export function TopBar({ className, onSearchChange }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notificationCount] = useState(3);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between h-full px-4 lg:px-6 gap-4",
        className,
      )}
    >
      {/* Left: Search */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9EA3B8]" />
          <Input
            type="text"
            placeholder="Tìm kiếm giao dịch..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-64 h-10 pl-10 pr-4 bg-[#F2F4F8] rounded-lg text-sm text-[#1A1D2E] placeholder:text-[#9EA3B8] focus:outline-none focus:ring-2 border-none focus:ring-[#827BF2]/30 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right: Notifications + User */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-[#F2F4F8] transition-colors">
          <Bell className="w-5 h-5 text-[#5A607F]" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#E40127] text-white text-xs font-bold rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#F2F4F8] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#827BF2] flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="hidden lg:block text-sm font-medium text-[#1A1D2E]">
              Nguyen Van A
            </span>
            <ChevronDown className="w-4 h-4 text-[#9EA3B8]" />
          </button>

          {/* Dropdown */}
          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#5A607F] hover:bg-[#F2F4F8]">
                  <User className="w-4 h-4" />
                  Hồ sơ
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#5A607F] hover:bg-[#F2F4F8]">
                  <Settings className="w-4 h-4" />
                  Cài đặt
                </button>
                <div className="border-t my-1" />
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#E40127] hover:bg-red-50">
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
