import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

type ExpenseCardProps = {
  title: string
  category: string
  amount: string
  time: string
  positive?: boolean
}

function ExpenseCard({ title, category, amount, time, positive = true }: ExpenseCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-center justify-between rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)]"
    >
      <div className="flex items-center gap-3">
        <div
          className={`rounded-2xl p-2 ${positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500">
            {category} • {time}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-semibold ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {amount}
        </p>
      </div>
    </motion.article>
  )
}

export default ExpenseCard
