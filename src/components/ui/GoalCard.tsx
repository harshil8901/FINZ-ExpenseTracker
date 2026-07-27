import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, CircleDollarSign } from 'lucide-react'
import CircularProgress from '@/components/ui/CircularProgress'
import type { GoalItem } from '@/types/goal'

type GoalCardProps = {
  goal: GoalItem
  progress: number
  remaining: number
  projected: number
  onSelect: (goal: GoalItem) => void
}

function GoalCard({ goal, progress, remaining, projected, onSelect }: GoalCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.99 }}
      type="button"
      onClick={() => onSelect(goal)}
      className="w-full rounded-[24px] border border-slate-200 bg-white p-4 text-left shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
            {goal.icon}
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">{goal.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{goal.category}</p>
          </div>
        </div>
        <div className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
          {goal.priority}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Target</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">₹{goal.targetAmount.toLocaleString('en-IN')}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CircleDollarSign className="h-4 w-4" />
          <span>₹{goal.currentSaved.toLocaleString('en-IN')} saved</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>Remaining</span>
            <span className="font-semibold text-slate-900">₹{remaining.toLocaleString('en-IN')}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6 }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-400"
            />
          </div>
        </div>
        <div className="ml-4">
          <CircularProgress value={Math.round(progress)} size={64} strokeWidth={7} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span>Due {goal.targetDate}</span>
        </div>
        <div className="flex items-center gap-2 font-medium text-emerald-600">
          <span>{projected} mo</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </motion.button>
  )
}

export default GoalCard
