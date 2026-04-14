'use client';

import { DashboardLayout, Sidebar, TopBar, RightPanel, MainContent } from '@/components/expense-dashboard';

export default function HomePage() {
  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      topbar={<TopBar />}
      main={<MainContent />}
      rightPanel={<RightPanel />}
    />
  );
}
