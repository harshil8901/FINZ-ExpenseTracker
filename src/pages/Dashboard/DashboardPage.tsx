import { motion } from 'framer-motion'
import {
  BadgeDollarSign,
  Flame,
  PiggyBank,
  Plus,
  Sparkles,
  TrendingUp,
  Wallet2,
} from 'lucide-react'
import Avatar from '@/components/common/Avatar'
import Greeting from '@/components/common/Greeting'
import NotificationButton from '@/components/common/NotificationButton'
import PrimaryButton from '@/components/common/PrimaryButton'
import SecondaryButton from '@/components/common/SecondaryButton'
import CircularProgress from '@/components/ui/CircularProgress'
import ExpenseCard from '@/components/ui/ExpenseCard'
import FloatingActionButton from '@/components/ui/FloatingActionButton'
import OverviewCard from '@/components/ui/OverviewCard'
import ProgressBar from '@/components/ui/ProgressBar'
import QuickActionCard from '@/components/ui/QuickActionCard'
import SectionHeader from '@/components/ui/SectionHeader'
import StatCard from '@/components/ui/StatCard'
import TipCard from '@/components/ui/TipCard'
import { quickActions, tips, transactions, userProfile } from '@/constants/mockData'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto flex max-w-5xl flex-col gap-4 pb-24"
    >
      <div className="flex items-center justify-between px-1 py-2">
        <div className="flex items-center gap-3">
          <Avatar name={userProfile.name} initials={userProfile.initials} size="md" />
          <Greeting name={userProfile.name} subtitle="You are doing great this week" />
        </div>
        <NotificationButton count={3} />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.35 }}
        className="rounded-[28px] bg-gradient-to-br from-emerald-600 via-emerald-500 to-lime-400 p-5 text-white shadow-[0_30px_70px_-30px_rgba(34,197,94,0.75)]"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-50">Saving streak</p>
            <div className="mt-3 flex items-center gap-2">
              <Flame className="h-5 w-5" />
              <span className="text-3xl font-semibold">{userProfile.streak} days</span>
            </div>
          </div>
          <div className="rounded-2xl bg-white/20 p-2 backdrop-blur">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <p className="text-sm text-emerald-50">You are 12% ahead of your monthly goal</p>
            <div className="mt-3">
              <ProgressBar progress={74} className="h-3 bg-white/20" />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <PrimaryButton icon={<Plus className="h-4 w-4" />}>Add Expense</PrimaryButton>
              <SecondaryButton icon={<BadgeDollarSign className="h-4 w-4" />}>Save</SecondaryButton>
            </div>
          </div>
          <div className="rounded-[24px] bg-white/10 p-3 backdrop-blur">
            <CircularProgress value={74} size={96} strokeWidth={10} />
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Current Savings"
          value={`$${userProfile.savedAmount.toLocaleString()}`}
          detail="Up 18% from last month"
          icon={<PiggyBank className="h-5 w-5" />}
        />
        <StatCard
          title="Budget"
          value={`$${userProfile.budget.toLocaleString()}`}
          detail="Healthy balance"
          icon={<Wallet2 className="h-5 w-5" />}
          accent="slate"
        />
        <StatCard
          title="Spent"
          value={`$${userProfile.spent.toLocaleString()}`}
          detail="Only 47% of plan"
          icon={<TrendingUp className="h-5 w-5" />}
          accent="slate"
        />
        <StatCard
          title="Goal Progress"
          value={<AnimatedCounter value={userProfile.goalProgress} suffix="%" />}
          detail="Great pace"
          icon={<Sparkles className="h-5 w-5" />}
        />
      </section>

      <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)]">
        <SectionHeader title="Quick actions" subtitle="Move faster with one tap" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {quickActions.map((item) => (
            <QuickActionCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={<Plus className="h-5 w-5" />}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)]">
          <SectionHeader title="Today’s tip" subtitle="Small steps, big results" />
          <div className="mt-4 space-y-3">
            {tips.map((tip) => (
              <TipCard key={tip.title} title={tip.title} description={tip.description} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <OverviewCard
            title="Budget left"
            value={`$${userProfile.budgetLeft.toLocaleString()}`}
            detail="Ready for your next milestone"
            icon={<Wallet2 className="h-5 w-5" />}
          />
          <OverviewCard
            title="Investment path"
            value="+12.4%"
            detail="Your plan is outperforming target"
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>
      </section>

      <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_20px_45px_-24px_rgba(15,23,42,0.35)]">
        <SectionHeader title="Recent transactions" subtitle="Your latest activity" />
        <div className="mt-4 space-y-3">
          {transactions.map((transaction) => (
            <ExpenseCard
              key={transaction.title}
              title={transaction.title}
              category={transaction.category}
              amount={transaction.amount}
              time={transaction.time}
              positive={transaction.positive}
            />
          ))}
        </div>
      </section>

      <FloatingActionButton />
    </motion.div>
  )
}

export default DashboardPage
