import { motion } from 'framer-motion'
import { Plus, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import BudgetCard from '@/components/ui/BudgetCard'
import CircularProgress from '@/components/ui/CircularProgress'
import GoalCard from '@/components/ui/GoalCard'
import GoalForm from '@/components/ui/GoalForm'
import GoalModal from '@/components/ui/GoalModal'
import SectionHeader from '@/components/ui/SectionHeader'
import { useGoalStore } from '@/store/goal-store'
import type { BudgetCategory, GoalItem } from '@/types/goal'

function GoalsPage() {
  const { goals, budgets, createGoal, updateGoal, deleteGoal, addSavings, withdrawSavings, createBudget, getFilteredGoals, getGoalProgress, getRemainingAmount, getProjectedCompletion, getBudgetSummary, selectedGoalId, setSelectedGoalId } = useGoalStore()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<GoalItem | null>(null)
  const [amountInput, setAmountInput] = useState('')
  const [actionType, setActionType] = useState<'deposit' | 'withdraw'>('deposit')
  const [budgetForm, setBudgetForm] = useState({ category: 'Food' as BudgetCategory, allocated: '', spent: '', note: '' })

  const filteredGoals = getFilteredGoals()
  const budgetSummary = getBudgetSummary()
  const selectedGoal = goals.find((goal) => goal.id === selectedGoalId) ?? filteredGoals[0] ?? null

  const insights = useMemo(() => [
    `You have already used ${budgetSummary[0]?.percent ?? 72}% of your Food budget.`,
    `Saving ₹${Math.max(150, (selectedGoal?.monthlyContribution ?? 8000) / 40).toLocaleString('en-IN')} this week will keep your goal on track.`,
    `You can reach your ${selectedGoal?.name ?? 'Laptop'} goal ${getProjectedCompletion(selectedGoal ?? goals[0] ?? filteredGoals[0] ?? goals[0])} months earlier by saving ₹${Math.max(200, Math.round((selectedGoal?.monthlyContribution ?? 10000) / 5)).toLocaleString('en-IN')} more every month.`,
  ], [budgetSummary, filteredGoals, goals, selectedGoal])

  const handleSaveAmount = () => {
    if (!selectedGoal) return
    const amount = Number(amountInput)
    if (Number.isNaN(amount) || amount <= 0) {
      toast.error('Enter a valid amount')
      return
    }
    if (actionType === 'deposit') {
      addSavings(selectedGoal.id, amount, 'Added from the goals planner')
      toast.success(`Added ₹${amount.toLocaleString('en-IN')}`)
    } else {
      withdrawSavings(selectedGoal.id, amount, 'Withdrawn from goal')
      toast.success(`Withdrew ₹${amount.toLocaleString('en-IN')}`)
    }
    setAmountInput('')
  }

  const handleEditGoal = (goal: GoalItem) => {
    setEditingGoal(goal)
    setIsCreateOpen(true)
  }

  const handleDeleteGoal = (id: string) => {
    deleteGoal(id)
    setSelectedGoalId(null)
    toast.success('Goal removed')
  }

  const handleCreateBudget = () => {
    const allocated = Number(budgetForm.allocated)
    const spent = Number(budgetForm.spent)
    if (Number.isNaN(allocated) || allocated <= 0) {
      toast.error('Enter a valid budget allocation')
      return
    }
    createBudget({
      category: budgetForm.category,
      allocated,
      spent: Number.isNaN(spent) ? 0 : spent,
      note: budgetForm.note || undefined,
    })
    toast.success('Budget added')
    setBudgetForm({ category: 'Food', allocated: '', spent: '', note: '' })
  }

  const selectedProgress = selectedGoal ? getGoalProgress(selectedGoal) : 0
  const selectedRemaining = selectedGoal ? getRemainingAmount(selectedGoal) : 0

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mx-auto flex max-w-6xl flex-col gap-4 pb-24">
      <div className="flex items-center justify-between px-1 py-2">
        <div>
          <p className="text-sm font-medium text-emerald-600">Goals & budget</p>
          <h2 className="text-2xl font-semibold text-slate-900">Plan with confidence</h2>
        </div>
        <button type="button" onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2 rounded-full bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-100">
          <Plus className="h-4 w-4" />
          New goal
        </button>
      </div>

      <section className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-emerald-600 via-emerald-500 to-lime-400 p-5 text-white shadow-[0_30px_70px_-30px_rgba(34,197,94,0.75)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-emerald-50">Smart savings plan</p>
            <h3 className="mt-2 text-2xl font-semibold">Build a stronger future</h3>
          </div>
          <div className="rounded-2xl bg-white/20 p-2 backdrop-blur">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
            <p className="text-sm text-emerald-50">Goals</p>
            <p className="mt-1 text-xl font-semibold">{goals.length}</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
            <p className="text-sm text-emerald-50">Budget categories</p>
            <p className="mt-1 text-xl font-semibold">{budgets.length}</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-3 backdrop-blur">
            <p className="text-sm text-emerald-50">Next milestone</p>
            <p className="mt-1 text-xl font-semibold">₹{Math.max(1000, (selectedGoal?.monthlyContribution ?? 8000) / 2).toLocaleString('en-IN')}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)]">
          <SectionHeader title="Your goals" subtitle="Save steadily and stay motivated" />
          <div className="mt-4 grid gap-3">
            {filteredGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} progress={getGoalProgress(goal)} remaining={getRemainingAmount(goal)} projected={getProjectedCompletion(goal)} onSelect={(item) => { setSelectedGoalId(item.id); setIsDetailOpen(true) }} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)]">
            <SectionHeader title="Budget planner" subtitle="Keep every rupee visible" />
            <div className="mt-4 space-y-3">
              {budgetSummary.map((item) => (
                <BudgetCard
                  key={item.category}
                  budget={budgets.find((budget) => budget.category === item.category)!}
                  percent={item.percent}
                  remaining={item.remaining}
                  health={item.health}
                />
              ))}
            </div>
            <div className="mt-4 rounded-[20px] border border-dashed border-slate-200 bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-700">Add monthly budget</p>
              <div className="mt-3 grid gap-2">
                <select
                  value={budgetForm.category}
                  onChange={(event) => setBudgetForm((current) => ({ ...current, category: event.target.value as BudgetCategory }))}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  {(['Food', 'Shopping', 'Entertainment', 'Travel', 'Education', 'Health', 'Subscriptions', 'Others'] as BudgetCategory[]).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  value={budgetForm.allocated}
                  onChange={(event) => setBudgetForm((current) => ({ ...current, allocated: event.target.value }))}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm"
                  placeholder="Allocated budget (₹)"
                />
                <input
                  value={budgetForm.spent}
                  onChange={(event) => setBudgetForm((current) => ({ ...current, spent: event.target.value }))}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm"
                  placeholder="Spent so far (₹)"
                />
                <input
                  value={budgetForm.note}
                  onChange={(event) => setBudgetForm((current) => ({ ...current, note: event.target.value }))}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm"
                  placeholder="Optional note"
                />
                <button type="button" onClick={handleCreateBudget} className="rounded-2xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-white">
                  Save budget
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)]">
            <SectionHeader title="Smart insights" subtitle="Small actions, big momentum" />
            <div className="mt-4 space-y-3">
              {insights.map((insight) => (
                <div key={insight} className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
                  {insight}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GoalModal open={isDetailOpen} title={selectedGoal?.name ?? 'Goal details'} onClose={() => setIsDetailOpen(false)}>
        {selectedGoal ? (
          <div className="space-y-4">
            <div className="flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">{selectedGoal.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">{selectedGoal.name}</h4>
                  <p className="text-sm text-slate-500">{selectedGoal.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white p-3">
                  <CircularProgress value={Math.round(selectedProgress)} size={84} strokeWidth={8} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Target</p>
                  <p className="text-lg font-semibold text-slate-900">₹{selectedGoal.targetAmount.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <p className="text-sm text-slate-500">Saved</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">₹{selectedGoal.currentSaved.toLocaleString('en-IN')}</p>
              </div>
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <p className="text-sm text-slate-500">Remaining</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">₹{selectedRemaining.toLocaleString('en-IN')}</p>
              </div>
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <p className="text-sm text-slate-500">Expected</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{getProjectedCompletion(selectedGoal)} months</p>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-4">
              <SectionHeader title="Quick actions" subtitle="Adjust your progress" />
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <input
                  value={amountInput}
                  onChange={(event) => setAmountInput(event.target.value)}
                  className="flex-1 rounded-2xl border border-slate-200 px-3 py-3"
                  placeholder="Enter amount in ₹"
                />
                <select
                  value={actionType}
                  onChange={(event) => setActionType(event.target.value as 'deposit' | 'withdraw')}
                  className="rounded-2xl border border-slate-200 px-3 py-3"
                >
                  <option value="deposit">Add money</option>
                  <option value="withdraw">Withdraw money</option>
                </select>
                <button type="button" onClick={handleSaveAmount} className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white">
                  Apply
                </button>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-4">
              <SectionHeader title="Contribution history" subtitle="See your recent momentum" />
              <div className="mt-4 space-y-2">
                {selectedGoal.history.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                    <span>{entry.note}</span>
                    <span className={`font-semibold ${entry.type === 'deposit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {entry.type === 'deposit' ? '+' : '-'}₹{entry.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => handleEditGoal(selectedGoal)} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">Edit goal</button>
              <button type="button" onClick={() => handleDeleteGoal(selectedGoal.id)} className="rounded-2xl border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-600">Delete goal</button>
            </div>
          </div>
        ) : null}
      </GoalModal>

      <GoalModal open={isCreateOpen} title={editingGoal ? 'Edit goal' : 'Create goal'} onClose={() => { setIsCreateOpen(false); setEditingGoal(null) }}>
        <GoalForm defaultValues={editingGoal ? { name: editingGoal.name, category: editingGoal.category, targetAmount: editingGoal.targetAmount.toString(), currentSaved: editingGoal.currentSaved.toString(), targetDate: editingGoal.targetDate, monthlyContribution: editingGoal.monthlyContribution.toString(), priority: editingGoal.priority, description: editingGoal.description ?? '' } : undefined} onSubmit={(values) => {
          if (editingGoal) {
            updateGoal(editingGoal.id, { ...editingGoal, ...{ name: values.name, category: values.category, targetAmount: Number(values.targetAmount), currentSaved: Number(values.currentSaved), targetDate: values.targetDate, monthlyContribution: Number(values.monthlyContribution), priority: values.priority, description: values.description } })
            toast.success('Goal updated')
          } else {
            const payload = {
              name: values.name,
              category: values.category,
              targetAmount: Number(values.targetAmount),
              currentSaved: Number(values.currentSaved),
              targetDate: values.targetDate,
              monthlyContribution: Number(values.monthlyContribution),
              priority: values.priority,
              description: values.description,
              icon: '🎯',
            }
            createGoal(payload)
            toast.success('Goal created')
          }
          setEditingGoal(null)
          setIsCreateOpen(false)
        }} onCancel={() => { setIsCreateOpen(false); setEditingGoal(null) }} submitLabel={editingGoal ? 'Update Goal' : 'Create Goal'} />
      </GoalModal>
    </motion.div>
  )
}

export default GoalsPage
