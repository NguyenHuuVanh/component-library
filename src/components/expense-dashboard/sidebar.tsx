'use client';

import { useDashboard } from './dashboard-layout';
import { cn } from '@/utils/cn';
import {
  LayoutDashboard,
  Receipt,
  Target,
  BarChart3,
  Trophy,
  FolderOpen,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Wallet,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const navigationSections: NavSection[] = [
  {
    label: 'Tổng Quan',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { id: 'transactions', label: 'Giao Dịch', icon: <Receipt className="w-5 h-5" /> },
      { id: 'budgets', label: 'Ngân Sách', icon: <Target className="w-5 h-5" />, badge: 2 },
    ],
  },
  {
    label: 'Phân Tích',
    items: [
      { id: 'reports', label: 'Báo Cáo', icon: <BarChart3 className="w-5 h-5" /> },
      { id: 'goals', label: 'Mục Tiêu', icon: <Trophy className="w-5 h-5" /> },
      { id: 'categories', label: 'Danh Mục', icon: <FolderOpen className="w-5 h-5" /> },
    ],
  },
];

const bottomNavItems: NavItem[] = [
  { id: 'settings', label: 'Cài Đặt', icon: <Settings className="w-5 h-5" /> },
  { id: 'help', label: 'Trợ Giúp', icon: <HelpCircle className="w-5 h-5" /> },
];

export function Sidebar() {
  const { isSidebarCollapsed, setIsSidebarCollapsed, activeView, setActiveView } = useDashboard();

  return (
    <div className="flex flex-col h-full bg-white border-r">
      {/* Logo */}
      <div className={cn(
        'flex items-center h-[64px] px-4 border-b transition-all duration-300',
        isSidebarCollapsed ? 'justify-center' : 'justify-between'
      )}>
        <div className={cn(
          'flex items-center gap-2 transition-all duration-300',
          isSidebarCollapsed ? 'scale-0 w-0 opacity-0' : 'scale-100 opacity-100'
        )}>
          <div className="w-8 h-8 rounded-lg bg-[#827BF2] flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-[#1A1D2E]">SpendWise</span>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={cn(
            'p-1.5 rounded-lg hover:bg-[#EAE8FD] text-[#9EA3B8] hover:text-[#827BF2] transition-colors',
            isSidebarCollapsed && 'ml-0'
          )}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {navigationSections.map((section) => (
          <div key={section.label} className="mb-4">
            {/* Section Label */}
            <div className={cn(
              'px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[#9EA3B8] transition-all duration-300',
              isSidebarCollapsed ? 'opacity-0 h-0 mb-0 overflow-hidden' : 'opacity-100'
            )}>
              {section.label}
            </div>

            {/* Nav Items */}
            {section.items.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all duration-200',
                  activeView === item.id
                    ? 'bg-[#827BF2] text-white'
                    : 'text-[#5A607F] hover:bg-[#EAE8FD] hover:text-[#827BF2]',
                  isSidebarCollapsed && 'justify-center'
                )}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <span className="shrink-0">{item.icon}</span>
                <span className={cn(
                  'flex-1 text-sm font-medium transition-all duration-300',
                  isSidebarCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'
                )}>
                  {item.label}
                </span>
                {item.badge && !isSidebarCollapsed && (
                  <span className={cn(
                    'px-1.5 py-0.5 text-xs font-semibold rounded-full',
                    activeView === item.id
                      ? 'bg-white/20 text-white'
                      : 'bg-[#E40127] text-white'
                  )}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom Nav */}
      <div className="border-t px-2 py-4">
        {bottomNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-[#5A607F] hover:bg-[#EAE8FD] hover:text-[#827BF2] transition-colors',
              isSidebarCollapsed && 'justify-center'
            )}
            title={isSidebarCollapsed ? item.label : undefined}
          >
            <span className="shrink-0">{item.icon}</span>
            <span className={cn(
              'text-sm font-medium transition-all duration-300',
              isSidebarCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'
            )}>
              {item.label}
            </span>
          </button>
        ))}

        {/* Copyright */}
        <div className={cn(
          'px-3 pt-2 text-xs text-[#9EA3B8] transition-all duration-300',
          isSidebarCollapsed && 'opacity-0'
        )}>
          © 2026 SpendWise
        </div>
      </div>
    </div>
  );
}
