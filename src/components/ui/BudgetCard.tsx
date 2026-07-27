import { motion } from 'framer-motion'
import type { BudgetItem } from '@/types/goal'

type BudgetCardProps = {
  budget: BudgetItem
  percent: number
  remaining: number
  health: string
}

function BudgetCard({ budget, percent, remaining, health }: BudgetCardProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{budget.category}</h3>
          <p className="mt-1 text-sm text-slate-500">Allocated ₹{budget.allocated.toLocaleString('en-IN')}</p>
        </div>
        <div className={`rounded-full px-2.5 py-1 text-xs font-semibold ${health === 'Critical' ? 'bg-rose-50 text-rose-600' : health === 'Watch' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {health}
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 0.6 }} className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-400" />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>Spent ₹{budget.spent.toLocaleString('en-IN')}</span>
        <span className="font-semibold text-slate-900">₹{remaining.toLocaleString('en-IN')} left</span>
      </div>
    </div>
  )
}

export default BudgetCard
