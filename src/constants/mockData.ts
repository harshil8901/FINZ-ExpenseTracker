export const userProfile = {
  name: 'Ava',
  initials: 'AV',
  streak: 12,
  savedAmount: 8420,
  budget: 16000,
  spent: 7540,
  goalProgress: 74,
  budgetLeft: 8450,
}

export const quickActions = [
  { title: 'Add Expense', description: 'Track a new spend', icon: 'plus' },
  { title: 'Save Money', description: 'Auto-save this week', icon: 'wallet' },
  { title: 'Set Goal', description: 'Plan your next target', icon: 'target' },
  { title: 'View Report', description: 'See your progress', icon: 'chart' },
]

export const transactions = [
  { title: 'Salary Credit', category: 'Income', amount: '+₹4,200', time: '09:30', positive: true },
  { title: 'Groceries', category: 'Essentials', amount: '-₹84', time: '11:20', positive: false },
  {
    title: 'Cloud Subscription',
    category: 'Bills',
    amount: '-₹24',
    time: '13:10',
    positive: false,
  },
  {
    title: 'Investment Top-up',
    category: 'Wealth',
    amount: '-₹320',
    time: '16:45',
    positive: false,
  },
]

export const tips = [
  {
    title: 'Keep momentum',
    description: 'You are only ₹1,280 away from your monthly savings target.',
  },
  {
    title: 'Smart move',
    description: 'Round up spare change to your savings account automatically.',
  },
]
