import { create } from 'zustand'
import type { ExpenseCategory, ExpenseItem } from '@/types/expense'

type ExpenseFilter = 'all' | ExpenseCategory | 'income' | 'expense'

type ExpenseStore = {
  expenses: ExpenseItem[]
  filter: ExpenseFilter
  selectedExpenseId: string | null
  addExpense: (expense: Omit<ExpenseItem, 'id'>) => void
  updateExpense: (id: string, updates: Partial<ExpenseItem>) => void
  deleteExpense: (id: string) => void
  setFilter: (filter: ExpenseFilter) => void
  setSelectedExpenseId: (id: string | null) => void
  getFilteredExpenses: () => ExpenseItem[]
  getTotals: () => { income: number; expense: number; balance: number }
  getCategoryBreakdown: () => Array<{ category: ExpenseCategory; amount: number; color: string }>
}

const categoryColors: Record<ExpenseCategory, string> = {
  Food: '#22c55e',
  Shopping: '#0f766e',
  Transport: '#38bdf8',
  Bills: '#f59e0b',
  Entertainment: '#8b5cf6',
  Education: '#ec4899',
  Health: '#ef4444',
  Travel: '#6366f1',
  Subscriptions: '#14b8a6',
  Others: '#64748b',
}

const initialExpenses: ExpenseItem[] = [
  {
    id: 'exp-1',
    title: 'Lunch with team',
    amount: 42,
    category: 'Food',
    merchant: 'McDonald\'s',
    paymentMethod: 'UPI',
    date: '2026-07-18',
    notes: 'Team lunch',
    type: 'expense',
  },
  {
    id: 'exp-2',
    title: 'Uber ride',
    amount: 24,
    category: 'Transport',
    merchant: 'Uber',
    paymentMethod: 'Wallet',
    date: '2026-07-17',
    notes: 'Airport ride',
    type: 'expense',
  },
  {
    id: 'exp-3',
    title: 'Salary',
    amount: 4200,
    category: 'Others',
    merchant: 'Acme Corp',
    paymentMethod: 'Bank Transfer',
    date: '2026-07-15',
    notes: 'Monthly income',
    type: 'income',
  },
  {
    id: 'exp-4',
    title: 'Amazon order',
    amount: 128,
    category: 'Shopping',
    merchant: 'Amazon',
    paymentMethod: 'Credit Card',
    date: '2026-07-14',
    notes: 'Home essentials',
    type: 'expense',
  },
  {
    id: 'exp-5',
    title: 'Netflix',
    amount: 15,
    category: 'Subscriptions',
    merchant: 'Netflix',
    paymentMethod: 'Credit Card',
    date: '2026-07-12',
    notes: 'Monthly plan',
    type: 'expense',
  },
]

export const useExpenseStore = create<ExpenseStore>((set, get) => ({
  expenses: initialExpenses,
  filter: 'all',
  selectedExpenseId: null,
  addExpense: (expense) => {
    const newExpense: ExpenseItem = {
      ...expense,
      id: `exp-${Date.now()}`,
    }
    set((state) => ({ expenses: [newExpense, ...state.expenses] }))
  },
  updateExpense: (id, updates) => {
    set((state) => ({
      expenses: state.expenses.map((expense) =>
        expense.id === id ? { ...expense, ...updates } : expense,
      ),
    }))
  },
  deleteExpense: (id) => {
    set((state) => ({ expenses: state.expenses.filter((expense) => expense.id !== id) }))
  },
  setFilter: (filter) => set({ filter }),
  setSelectedExpenseId: (id) => set({ selectedExpenseId: id }),
  getFilteredExpenses: () => {
    const { expenses, filter } = get()
    if (filter === 'all') {
      return expenses
    }
    if (filter === 'income' || filter === 'expense') {
      return expenses.filter((expense) => expense.type === filter)
    }
    return expenses.filter((expense) => expense.category === filter)
  },
  getTotals: () => {
    const expenses = get().expenses
    const income = expenses.filter((expense) => expense.type === 'income').reduce((sum, expense) => sum + expense.amount, 0)
    const expense = expenses.filter((expense) => expense.type === 'expense').reduce((sum, expense) => sum + expense.amount, 0)
    return { income, expense, balance: income - expense }
  },
  getCategoryBreakdown: () => {
    const expenses = get().expenses.filter((expense) => expense.type === 'expense')
    const totals: Record<string, number> = {}
    expenses.forEach((expense) => {
      totals[expense.category] = (totals[expense.category] ?? 0) + expense.amount
    })

    return Object.entries(totals).map(([category, amount]) => ({
      category: category as ExpenseCategory,
      amount,
      color: categoryColors[category as ExpenseCategory],
    }))
  },
}))
