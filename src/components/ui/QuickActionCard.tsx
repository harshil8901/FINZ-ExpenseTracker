import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type QuickActionCardProps = {
  title: string
  description: string
  icon: ReactNode
}

function QuickActionCard({ title, description, icon }: QuickActionCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type="button"
      className="rounded-[18px] border border-slate-200 bg-white p-4 text-left shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)]"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">{icon}</div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
    </motion.button>
  )
}

export default QuickActionCard
