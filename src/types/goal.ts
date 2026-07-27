export type GoalCategory =
  | 'Emergency Fund'
  | 'Travel'
  | 'Education'
  | 'Electronics'
  | 'Vehicle'
  | 'Investment'
  | 'Shopping'
  | 'Health'
  | 'Others'

export type GoalPriority = 'Low' | 'Medium' | 'High'

export type GoalStatus = 'On Track' | 'Needs Attention' | 'Ahead' | 'Completed'

export type GoalHistoryEntry = {
  id: string
  type: 'deposit' | 'withdraw'
  amount: number
  date: string
  note: string
}

export type GoalItem = {
  id: string
  name: string
  category: GoalCategory
  targetAmount: number
  currentSaved: number
  targetDate: string
  monthlyContribution: number
  priority: GoalPriority
  description?: string
  icon: string
  history: GoalHistoryEntry[]
}

export type GoalFormValues = {
  name: string
  category: GoalCategory
  targetAmount: string
  currentSaved: string
  targetDate: string
  monthlyContribution: string
  priority: GoalPriority
  description: string
}

export type BudgetCategory = 'Food' | 'Shopping' | 'Entertainment' | 'Travel' | 'Education' | 'Health' | 'Subscriptions' | 'Others'

export type BudgetItem = {
  id: string
  category: BudgetCategory
  allocated: number
  spent: number
  note?: string
}

export type BudgetFormValues = {
  category: BudgetCategory
  allocated: string
  spent: string
}
