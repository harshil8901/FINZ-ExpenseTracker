import { motion } from 'framer-motion'
import { Edit3, Trash2 } from 'lucide-react'
import type { ExpenseItem } from '@/types/expense'

type ExpenseListItemProps = {
  expense: ExpenseItem
  onSelect: (expense: ExpenseItem) => void
  onEdit: (expense: ExpenseItem) => void
  onDelete: (id: string) => void
}

function ExpenseListItem({ expense, onSelect, onEdit, onDelete }: ExpenseListItemProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.99 }}
      type="button"
      onClick={() => onSelect(expense)}
      className="w-full rounded-[20px] border border-slate-200 bg-white p-4 text-left shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 rounded-2xl p-2 ${expense.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            <span className="text-sm font-semibold">{expense.merchant.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-900">{expense.title}</h3>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                {expense.category}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">{expense.merchant}</p>
            <p className="mt-1 text-xs text-slate-400">{expense.notes || 'No notes'}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-sm font-semibold ${expense.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
            {expense.type === 'income' ? '+' : '-'}₹{expense.amount.toLocaleString('en-IN')}
          </p>
          <p className="mt-1 text-xs text-slate-500">{expense.date}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
        <p className="text-xs text-slate-500">{expense.paymentMethod}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
            onClick={(event) => {
              event.stopPropagation()
              onEdit(expense)
            }}
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-full p-2 text-rose-500 hover:bg-rose-50"
            onClick={(event) => {
              event.stopPropagation()
              onDelete(expense.id)
            }}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.button>
  )
}

export default ExpenseListItem
