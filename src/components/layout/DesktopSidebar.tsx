import { Home, ReceiptText, Target, Users, UserCircle2 } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/expenses', icon: ReceiptText, label: 'Expenses' },
  { to: '/goals', icon: Target, label: 'Goals' },
  { to: '/community', icon: Users, label: 'Community' },
  { to: '/profile', icon: UserCircle2, label: 'Profile' },
]

function DesktopSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)] lg:flex lg:flex-col">
      <div className="mb-8">
        <p className="text-sm font-semibold tracking-[0.25em] text-emerald-500 uppercase">FinZ</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">Smart Finance</h2>
      </div>
      <nav className="space-y-2">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100'
                  : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default DesktopSidebar
