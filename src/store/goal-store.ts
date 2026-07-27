import { create } from 'zustand'
import type { BudgetCategory, BudgetItem, GoalCategory, GoalItem } from '@/types/goal'

type GoalFilter = 'all' | GoalCategory | 'On Track' | 'Ahead' | 'Needs Attention' | 'Completed'

type GoalStore = {
  goals: GoalItem[]
  budgets: BudgetItem[]
  filter: GoalFilter
  selectedGoalId: string | null
  createGoal: (goal: Omit<GoalItem, 'id' | 'history'>) => void
  updateGoal: (id: string, updates: Partial<GoalItem>) => void
  deleteGoal: (id: string) => void
  addSavings: (id: string, amount: number, note?: string) => void
  withdrawSavings: (id: string, amount: number, note?: string) => void
  setFilter: (filter: GoalFilter) => void
  setSelectedGoalId: (id: string | null) => void
  createBudget: (budget: Omit<BudgetItem, 'id'>) => void
  updateBudget: (id: string, updates: Partial<BudgetItem>) => void
  getFilteredGoals: () => GoalItem[]
  getGoalProgress: (goal: GoalItem) => number
  getRemainingAmount: (goal: GoalItem) => number
  getProjectedCompletion: (goal: GoalItem) => number
  getBudgetSummary: () => Array<{ category: BudgetCategory; allocated: number; spent: number; remaining: number; percent: number; health: string }>
}

const initialGoals: GoalItem[] = [
  {
    id: 'goal-1',
    name: 'Trip to Goa',
    category: 'Travel',
    targetAmount: 40000,
    currentSaved: 24000,
    targetDate: '2026-10-15',
    monthlyContribution: 8000,
    priority: 'High',
    description: 'A relaxing beach trip after exams.',
    icon: '🌴',
    history: [
      { id: 'h1', type: 'deposit', amount: 12000, date: '2026-06-01', note: 'Part-time gig' },
      { id: 'h2', type: 'deposit', amount: 12000, date: '2026-07-01', note: 'Birthday gift' },
    ],
  },
  {
    id: 'goal-2',
    name: 'New Laptop',
    category: 'Electronics',
    targetAmount: 75000,
    currentSaved: 42000,
    targetDate: '2026-09-20',
    monthlyContribution: 6500,
    priority: 'Medium',
    description: 'Upgrade to a reliable work machine.',
    icon: '💻',
    history: [{ id: 'h3', type: 'deposit', amount: 42000, date: '2026-07-10', note: 'Saved from internships' }],
  },
  {
    id: 'goal-3',
    name: 'Emergency Fund',
    category: 'Emergency Fund',
    targetAmount: 200000,
    currentSaved: 98000,
    targetDate: '2027-01-01',
    monthlyContribution: 15000,
    priority: 'High',
    description: 'Financial cushion for unexpected events.',
    icon: '🛡️',
    history: [{ id: 'h4', type: 'deposit', amount: 98000, date: '2026-07-01', note: 'Monthly auto-save' }],
  },
]

const initialBudgets: BudgetItem[] = [
  { id: 'b1', category: 'Food', allocated: 12000, spent: 8600, note: 'Keep lunch budget under control' },
  { id: 'b2', category: 'Shopping', allocated: 8000, spent: 6200, note: 'Limit impulse buys' },
  { id: 'b3', category: 'Entertainment', allocated: 5000, spent: 3600, note: 'Streaming + outings' },
]

const clamp = (value: number) => Math.min(Math.max(value, 0), 100)

export const useGoalStore = create<GoalStore>((set, get) => ({
  goals: initialGoals,
  budgets: initialBudgets,
  filter: 'all',
  selectedGoalId: initialGoals[0]?.id ?? null,
  createGoal: (goal) => {
    const newGoal: GoalItem = {
      ...goal,
      id: `goal-${Date.now()}`,
      history: [{ id: `hist-${Date.now()}`, type: 'deposit', amount: goal.currentSaved, date: new Date().toISOString().slice(0, 10), note: 'Initial savings' }],
    }
    set((state) => ({ goals: [newGoal, ...state.goals] }))
  },
  updateGoal: (id, updates) => {
    set((state) => ({ goals: state.goals.map((goal) => (goal.id === id ? { ...goal, ...updates } : goal)) }))
  },
  deleteGoal: (id) => {
    set((state) => ({ goals: state.goals.filter((goal) => goal.id !== id) }))
  },
  addSavings: (id, amount, note) => {
    set((state) => ({
      goals: state.goals.map((goal) => {
        if (goal.id !== id) return goal
        const nextSaved = goal.currentSaved + amount
        return {
          ...goal,
          currentSaved: nextSaved,
          history: [
            ...goal.history,
            { id: `hist-${Date.now()}`, type: 'deposit', amount, date: new Date().toISOString().slice(0, 10), note: note ?? 'Added savings' },
          ],
        }
      }),
    }))
  },
  withdrawSavings: (id, amount, note) => {
    set((state) => ({
      goals: state.goals.map((goal) => {
        if (goal.id !== id) return goal
        const nextSaved = Math.max(goal.currentSaved - amount, 0)
        return {
          ...goal,
          currentSaved: nextSaved,
          history: [
            ...goal.history,
            { id: `hist-${Date.now()}`, type: 'withdraw', amount, date: new Date().toISOString().slice(0, 10), note: note ?? 'Withdrawn' },
          ],
        }
      }),
    }))
  },
  setFilter: (filter) => set({ filter }),
  setSelectedGoalId: (id) => set({ selectedGoalId: id }),
  createBudget: (budget) => {
    set((state) => ({ budgets: [{ ...budget, id: `budget-${Date.now()}` }, ...state.budgets] }))
  },
  updateBudget: (id, updates) => {
    set((state) => ({ budgets: state.budgets.map((budget) => (budget.id === id ? { ...budget, ...updates } : budget)) }))
  },
  getFilteredGoals: () => {
    const { goals, filter } = get()
    if (filter === 'all') return goals
    if (filter === 'On Track' || filter === 'Ahead' || filter === 'Needs Attention' || filter === 'Completed') {
      return goals.filter((goal) => getGoalStatus(goal) === filter)
    }
    return goals.filter((goal) => goal.category === filter)
  },
  getGoalProgress: (goal) => clamp((goal.currentSaved / goal.targetAmount) * 100),
  getRemainingAmount: (goal) => Math.max(goal.targetAmount - goal.currentSaved, 0),
  getProjectedCompletion: (goal) => {
    const remaining = get().getRemainingAmount(goal)
    if (remaining <= 0) return 0
    const monthlyContribution = goal.monthlyContribution || 1
    const months = Math.ceil(remaining / monthlyContribution)
    return months
  },
  getBudgetSummary: () => {
    const { budgets } = get()
    return budgets.map((budget) => {
      const remaining = budget.allocated - budget.spent
      const percent = Math.min(Math.round((budget.spent / budget.allocated) * 100), 100)
      let health = 'Healthy'
      if (percent > 80) health = 'Watch'
      if (percent >= 95) health = 'Critical'
      return { category: budget.category, allocated: budget.allocated, spent: budget.spent, remaining, percent, health }
    })
  },
}))

function getGoalStatus(goal: GoalItem) {
  const progress = (goal.currentSaved / goal.targetAmount) * 100
  if (progress >= 100) return 'Completed'
  if (progress >= 80) return 'Ahead'
  if (progress >= 50) return 'On Track'
  return 'Needs Attention'
}
