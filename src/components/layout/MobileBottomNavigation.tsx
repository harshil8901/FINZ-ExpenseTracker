import { motion } from 'framer-motion'
import { Home, ReceiptText, Target, Users, UserCircle2 } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/expenses', icon: ReceiptText, label: 'Expenses' },
  { to: '/goals', icon: Target, label: 'Goals' },
  { to: '/community', icon: Users, label: 'Community' },
  { to: '/profile', icon: UserCircle2, label: 'Profile' },
]

function MobileBottomNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/90 px-2 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/80 lg:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between px-1">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className="flex-1">
            {({ isActive }) => (
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={`mx-auto flex flex-col items-center rounded-2xl px-2 py-2 text-[11px] font-medium ${
                  isActive ? 'text-emerald-600' : 'text-slate-500'
                }`}
              >
                <div className={`rounded-2xl p-2 ${isActive ? 'bg-emerald-50' : ''}`}>
                  <Icon className={`h-5 w-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                </div>
                <span className="mt-1">{label}</span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default MobileBottomNavigation
