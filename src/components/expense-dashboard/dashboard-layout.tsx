'use client';

import { useState, createContext, useContext, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface DashboardContextType {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (value: boolean) => void;
  isRightPanelVisible: boolean;
  setIsRightPanelVisible: (value: boolean) => void;
  isMobile: boolean;
  activeView: string;
  setActiveView: (view: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardLayout');
  }
  return context;
}

interface DashboardLayoutProps {
  sidebar?: ReactNode;
  topbar?: ReactNode;
  main: ReactNode;
  rightPanel?: ReactNode;
  className?: string;
}

export function DashboardLayout({ sidebar, topbar, main, rightPanel, className }: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');

  // Detect mobile based on window width
  const [isMobile, setIsMobile] = useState(false);

  return (
    <DashboardContext.Provider
      value={{
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isRightPanelVisible,
        setIsRightPanelVisible,
        isMobile,
        activeView,
        setActiveView,
      }}
    >
      <div className={cn('flex h-screen bg-[#F2F4F8] overflow-hidden', className)}>
        {/* Sidebar */}
        {sidebar && (
          <aside
            className={cn(
              'h-full shrink-0 transition-all duration-300 ease-in-out',
              'hidden lg:flex flex-col',
              isSidebarCollapsed ? 'w-16' : 'w-[220px]'
            )}
          >
            {sidebar}
          </aside>
        )}

        {/* Main Area (TopBar + Content + Right Panel) */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {/* TopBar */}
          {topbar && (
            <header className="h-[64px] shrink-0 border-b bg-white overflow-hidden">
              {topbar}
            </header>
          )}

          {/* Content Area (Main + Right Panel) */}
          <div className="flex flex-1 overflow-hidden">
            {/* Main Content - Scrollable */}
            <main className="flex-1 overflow-y-auto p-4 lg:p-6">
              {main}
            </main>

            {/* Right Panel */}
            {rightPanel && isRightPanelVisible && (
              <aside
                className={cn(
                  'h-full shrink-0 border-l bg-white overflow-y-auto transition-all duration-300',
                  'hidden xl:block',
                  'w-[280px]'
                )}
              >
                {rightPanel}
              </aside>
            )}
          </div>
        </div>
      </div>
    </DashboardContext.Provider>
  );
}