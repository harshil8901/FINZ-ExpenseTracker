import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import type { GoalCategory, GoalFormValues, GoalPriority } from '@/types/goal'

type GoalFormProps = {
  defaultValues?: Partial<GoalFormValues>
  onSubmit: (values: GoalFormValues) => void
  onCancel: () => void
  submitLabel?: string
}

const categories: GoalCategory[] = ['Emergency Fund', 'Travel', 'Education', 'Electronics', 'Vehicle', 'Investment', 'Shopping', 'Health', 'Others']
const priorities: GoalPriority[] = ['Low', 'Medium', 'High']

const schema = z.object({
  name: z.string().min(2, 'Goal name is required'),
  category: z.enum(categories as [GoalCategory, ...GoalCategory[]]),
  targetAmount: z.string().min(1, 'Target amount is required'),
  currentSaved: z.string().min(1, 'Current savings is required'),
  targetDate: z.string().min(1, 'Target date is required'),
  monthlyContribution: z.string().min(1, 'Monthly contribution is required'),
  priority: z.enum(priorities as [GoalPriority, ...GoalPriority[]]),
  description: z.string().max(160).optional().or(z.literal('')),
})

function GoalForm({ defaultValues, onSubmit, onCancel, submitLabel = 'Create Goal' }: GoalFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<GoalFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      category: 'Travel',
      targetAmount: '',
      currentSaved: '0',
      targetDate: '',
      monthlyContribution: '',
      priority: 'Medium',
      description: '',
      ...defaultValues,
    },
  })

  return (
    <form className="space-y-4" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          <span className="mb-1 block">Goal Name</span>
          <input {...register('name')} className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3" placeholder="Trip to Goa" />
          {errors.name ? <p className="mt-1 text-sm text-rose-500">{errors.name.message}</p> : null}
        </label>

        <label className="block text-sm font-medium text-slate-700">
          <span className="mb-1 block">Category</span>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <select {...field} className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3">
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            )}
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          <span className="mb-1 block">Target Amount (₹)</span>
          <input type="number" {...register('targetAmount')} className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3" placeholder="40000" />
          {errors.targetAmount ? <p className="mt-1 text-sm text-rose-500">{errors.targetAmount.message}</p> : null}
        </label>

        <label className="block text-sm font-medium text-slate-700">
          <span className="mb-1 block">Current Savings (₹)</span>
          <input type="number" {...register('currentSaved')} className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3" placeholder="24000" />
          {errors.currentSaved ? <p className="mt-1 text-sm text-rose-500">{errors.currentSaved.message}</p> : null}
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          <span className="mb-1 block">Target Date</span>
          <input type="date" {...register('targetDate')} className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3" />
          {errors.targetDate ? <p className="mt-1 text-sm text-rose-500">{errors.targetDate.message}</p> : null}
        </label>

        <label className="block text-sm font-medium text-slate-700">
          <span className="mb-1 block">Monthly Contribution (₹)</span>
          <input type="number" {...register('monthlyContribution')} className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3" placeholder="8000" />
          {errors.monthlyContribution ? <p className="mt-1 text-sm text-rose-500">{errors.monthlyContribution.message}</p> : null}
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-700">
        <span className="mb-1 block">Priority</span>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3">
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          )}
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        <span className="mb-1 block">Description</span>
        <textarea {...register('description')} rows={3} className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3" placeholder="Optional notes about this goal" />
      </label>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <motion.button whileTap={{ scale: 0.97 }} type="button" onClick={onCancel} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
          Cancel
        </motion.button>
        <motion.button whileTap={{ scale: 0.97 }} type="submit" className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white">
          {submitLabel}
        </motion.button>
      </div>
    </form>
  )
}

export default GoalForm
