import { motion } from 'framer-motion'
import { ChevronDown, Filter, Plus, Sparkles } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ExpenseChart from '@/components/ui/ExpenseChart'
import ExpenseFilterPills from '@/components/ui/ExpenseFilterPills'
import ExpenseForm from '@/components/ui/ExpenseForm'
import ExpenseListItem from '@/components/ui/ExpenseListItem'
import ExpenseModal from '@/components/ui/ExpenseModal'
import SectionHeader from '@/components/ui/SectionHeader'
import { useExpenseStore } from '@/store/expense-store'
import type { ExpenseFormValues, ExpenseItem } from '@/types/expense'

function ExpensesPage() {
  const { filter, setFilter, addExpense, updateExpense, deleteExpense, getFilteredExpenses, getTotals, getCategoryBreakdown, setSelectedExpenseId } = useExpenseStore()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<ExpenseItem | null>(null)

  const filteredExpenses = getFilteredExpenses()
  const totals = getTotals()
  const breakdown = getCategoryBreakdown()

  const handleSubmit = (values: ExpenseFormValues) => {
    const payload = {
      title: values.title,
      amount: Number(values.amount),
      category: values.category,
      merchant: values.merchant,
      paymentMethod: values.paymentMethod,
      date: values.date,
      notes: values.notes,
      type: values.type,
    }

    if (editingExpense) {
      updateExpense(editingExpense.id, payload)
      toast.success('Expense updated')
    } else {
      addExpense(payload)
      toast.success('Expense saved')
    }

    setEditingExpense(null)
    setIsFormOpen(false)
    setSelectedExpenseId(null)
  }

  const handleEdit = (expense: ExpenseItem) => {
    setEditingExpense(expense)
    setIsFormOpen(true)
  }

  const handleDelete = (id: string) => {
    deleteExpense(id)
    toast.success('Expense removed')
  }

  const handleAddNew = () => {
    setEditingExpense(null)
    setIsFormOpen(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto flex max-w-5xl flex-col gap-4 pb-24"
    >
      <div className="flex items-center justify-between px-1 py-2">
        <div>
          <p className="text-sm font-medium text-emerald-600">Expenses</p>
          <h2 className="text-2xl font-semibold text-slate-900">Track everything</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm">
          <span>July 2026</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>

      <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Total expenses</p>
            <p className="mt-1 text-3xl font-semibold text-slate-900">₹{totals.expense.toLocaleString('en-IN')}</p>
          </div>
          <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          <Filter className="h-4 w-4" />
          <span>Filtered by {filter === 'all' ? 'all activity' : filter}</span>
        </div>
      </section>

      <ExpenseChart data={breakdown} />

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)]">
        <SectionHeader title="Filter your view" subtitle="Jump to essentials or income" />
        <div className="mt-4">
          <ExpenseFilterPills active={filter} onChange={(value) => setFilter(value as typeof filter)} />
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)]">
        <SectionHeader title="Recent transactions" subtitle="Your latest activity" />
        <div className="mt-4 space-y-3">
          {filteredExpenses.length === 0 ? (
            <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">No transactions yet.</p>
          ) : (
            filteredExpenses.map((expense) => (
              <ExpenseListItem
                key={expense.id}
                expense={expense}
                onSelect={(item) => setSelectedExpenseId(item.id)}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </section>

      <motion.button
        whileTap={{ scale: 0.96 }}
        type="button"
        onClick={handleAddNew}
        className="fixed bottom-24 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_20px_40px_-12px_rgba(34,197,94,0.6)] sm:right-6"
        aria-label="Add expense"
      >
        <Plus className="h-6 w-6" />
      </motion.button>

      <ExpenseModal open={isFormOpen} title={editingExpense ? 'Edit expense' : 'Add expense'} onClose={() => { setIsFormOpen(false); setEditingExpense(null) }}>
        <ExpenseForm
          defaultValues={editingExpense ? {
            title: editingExpense.title,
            amount: editingExpense.amount.toString(),
            category: editingExpense.category,
            merchant: editingExpense.merchant,
            paymentMethod: editingExpense.paymentMethod,
            date: editingExpense.date,
            notes: editingExpense.notes ?? '',
            type: editingExpense.type,
          } : undefined}
          onSubmit={handleSubmit}
          onCancel={() => { setIsFormOpen(false); setEditingExpense(null) }}
          submitLabel={editingExpense ? 'Update Expense' : 'Save Expense'}
        />
      </ExpenseModal>
    </motion.div>
  )
}

export default ExpensesPage
