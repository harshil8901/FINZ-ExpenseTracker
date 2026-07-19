import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type StatCardProps = {
  title: string
  value: ReactNode
  detail: string
  icon: ReactNode
  accent?: 'emerald' | 'slate'
}

function StatCard({ title, value, detail, icon, accent = 'emerald' }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)]"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
        </div>
        <div
          className={`rounded-2xl p-2 ${accent === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}
        >
          {icon}
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-500">{detail}</p>
    </motion.div>
  )
}

export default StatCard
