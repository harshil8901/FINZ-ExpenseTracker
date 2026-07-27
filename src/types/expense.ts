export type ExpenseCategory =
  | 'Food'
  | 'Shopping'
  | 'Transport'
  | 'Bills'
  | 'Entertainment'
  | 'Education'
  | 'Health'
  | 'Travel'
  | 'Subscriptions'
  | 'Others'

export type ExpenseType = 'expense' | 'income'

export type PaymentMethod = 'Cash' | 'UPI' | 'Credit Card' | 'Debit Card' | 'Wallet' | 'Bank Transfer'

export type ExpenseItem = {
  id: string
  title: string
  amount: number
  category: ExpenseCategory
  merchant: string
  paymentMethod: PaymentMethod
  date: string
  notes?: string
  type: ExpenseType
}

export type ExpenseFormValues = {
  title: string
  amount: string
  category: ExpenseCategory
  merchant: string
  paymentMethod: PaymentMethod
  date: string
  notes: string
  type: ExpenseType
}
