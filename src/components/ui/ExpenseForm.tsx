import { motion } from 'framer-motion'
import { Controller, useForm } from 'react-hook-form'
import type { ExpenseCategory, ExpenseFormValues, PaymentMethod } from '@/types/expense'

const categories: ExpenseCategory[] = [
  'Food',
  'Shopping',
  'Transport',
  'Bills',
  'Entertainment',
  'Education',
  'Health',
  'Travel',
  'Subscriptions',
  'Others',
]

const paymentMethods: PaymentMethod[] = ['Cash', 'UPI', 'Credit Card', 'Debit Card', 'Wallet', 'Bank Transfer']

type ExpenseFormProps = {
  defaultValues?: Partial<ExpenseFormValues>
  onSubmit: (values: ExpenseFormValues) => void
  onCancel: () => void
  submitLabel?: string
}

function ExpenseForm({ defaultValues, onSubmit, onCancel, submitLabel = 'Save Expense' }: ExpenseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ExpenseFormValues>({
    defaultValues: {
      title: '',
      amount: '',
      category: 'Food',
      merchant: '',
      paymentMethod: 'UPI',
      date: new Date().toISOString().slice(0, 10),
      notes: '',
      type: 'expense',
      ...defaultValues,
    },
  })

  return (
    <form className="space-y-4" onSubmit={handleSubmit((data) => onSubmit(data as ExpenseFormValues))}>
      <div className="flex rounded-full border border-slate-200 bg-slate-50 p-1">
        <label className="flex-1">
          <input type="radio" value="expense" className="sr-only" {...register('type')} />
          <span className="flex cursor-pointer justify-center rounded-full px-3 py-2 text-sm font-semibold text-slate-600">
            Expense
          </span>
        </label>
        <label className="flex-1">
          <input type="radio" value="income" className="sr-only" {...register('type')} />
          <span className="flex cursor-pointer justify-center rounded-full px-3 py-2 text-sm font-semibold text-slate-600">
            Income
          </span>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          <span className="mb-1 block">Amount</span>
          <input
            {...register('amount')}
            type="number"
            step="0.01"
            placeholder="0.00"
            className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 outline-none ring-0"
          />
          {errors.amount ? <p className="mt-1 text-sm text-rose-500">{errors.amount.message}</p> : null}
        </label>

        <label className="block text-sm font-medium text-slate-700">
          <span className="mb-1 block">Date</span>
          <input
            {...register('date')}
            type="date"
            className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 outline-none ring-0"
          />
          {errors.date ? <p className="mt-1 text-sm text-rose-500">{errors.date.message}</p> : null}
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-700">
        <span className="mb-1 block">Title</span>
        <input
          {...register('title')}
          placeholder="Lunch with team"
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 outline-none ring-0"
        />
        {errors.title ? <p className="mt-1 text-sm text-rose-500">{errors.title.message}</p> : null}
      </label>

      <label className="block text-sm font-medium text-slate-700">
        <span className="mb-1 block">Merchant</span>
        <input
          {...register('merchant')}
          placeholder="McDonald's"
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 outline-none ring-0"
        />
        {errors.merchant ? <p className="mt-1 text-sm text-rose-500">{errors.merchant.message}</p> : null}
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          <span className="mb-1 block">Category</span>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 outline-none ring-0"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.category ? <p className="mt-1 text-sm text-rose-500">{errors.category.message}</p> : null}
        </label>

        <label className="block text-sm font-medium text-slate-700">
          <span className="mb-1 block">Payment Method</span>
          <Controller
            name="paymentMethod"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 outline-none ring-0"
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.paymentMethod ? <p className="mt-1 text-sm text-rose-500">{errors.paymentMethod.message}</p> : null}
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-700">
        <span className="mb-1 block">Notes</span>
        <textarea
          {...register('notes')}
          rows={3}
          placeholder="Optional notes"
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 outline-none ring-0"
        />
        {errors.notes ? <p className="mt-1 text-sm text-rose-500">{errors.notes.message}</p> : null}
      </label>

      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
        Optional receipt upload (coming soon)
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onCancel}
          className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
        >
          Cancel
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white"
        >
          {submitLabel}
        </motion.button>
      </div>
    </form>
  )
}

export default ExpenseForm
