import { Outlet } from 'react-router-dom'
import DesktopSidebar from '@/components/layout/DesktopSidebar'
import MobileBottomNavigation from '@/components/layout/MobileBottomNavigation'

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-3 py-3 sm:px-4 lg:flex-row lg:gap-6 lg:px-6 lg:py-6">
        <DesktopSidebar />

        <div className="flex-1">
          <main className="mx-auto w-full max-w-5xl rounded-[32px] border border-slate-200/80 bg-white/80 p-3 shadow-[0_30px_80px_-36px_rgba(15,23,42,0.28)] backdrop-blur sm:p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>

      <MobileBottomNavigation />
    </div>
  )
}

export default AppLayout
