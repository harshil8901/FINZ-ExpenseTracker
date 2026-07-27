import { motion } from 'framer-motion'

type ExpenseFilterPillsProps = {
  active: string
  onChange: (filter: string) => void
}

const filters = ['all', 'expense', 'income', 'Food', 'Shopping', 'Transport', 'Bills', 'Entertainment']

function ExpenseFilterPills({ active, onChange }: ExpenseFilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = active === filter
        return (
          <motion.button
            key={filter}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => onChange(filter)}
            className={`rounded-full px-3 py-2 text-sm font-medium transition ${
              isActive ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {filter === 'all' ? 'All' : filter === 'income' ? 'Income' : filter === 'expense' ? 'Expenses' : filter}
          </motion.button>
        )
      })}
    </div>
  )
}

export default ExpenseFilterPills
