import { NavLink, Outlet } from 'react-router-dom'

const navigationItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/expenses', label: 'Expenses' },
  { to: '/goals', label: 'Goals' },
  { to: '/community', label: 'Community' },
  { to: '/reports', label: 'Reports' },
  { to: '/profile', label: 'Profile' },
]

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">FinZ</p>
            <h1 className="text-xl font-semibold">Expense Tracker</h1>
          </div>
          <div className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 md:block">
            App Bar Placeholder
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row">
        <aside className="hidden w-64 shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:block">
          <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">
            Navigation
          </p>
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Outlet />
        </main>
      </div>

      <nav className="border-t border-slate-200 bg-white px-4 py-3 shadow-sm lg:hidden">
        <div className="flex items-center justify-around">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-slate-900 text-white' : 'text-slate-600'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default AppLayout
