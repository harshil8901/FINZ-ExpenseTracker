import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import type { ExpenseCategory } from '@/types/expense'

type ExpenseChartProps = {
  data: Array<{ category: ExpenseCategory; amount: number; color: string }>
}

function ExpenseChart({ data }: ExpenseChartProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Spending breakdown</h3>
          <p className="text-sm text-slate-500">This month</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="h-48 w-full lg:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                innerRadius={54}
                outerRadius={78}
                paddingAngle={2}
              >
                {data.map((entry) => (
                  <Cell key={entry.category} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2">
          {data.map((item) => (
            <div key={item.category} className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm font-medium text-slate-700">{item.category}</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">₹{item.amount.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExpenseChart
