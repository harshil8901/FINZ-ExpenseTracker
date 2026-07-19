import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

type TipCardProps = {
  title: string
  description: string
}

function TipCard({ title, description }: TipCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-[18px] border border-emerald-100 bg-emerald-50 p-4"
    >
      <div className="flex items-center gap-2 text-emerald-700">
        <Sparkles className="h-4 w-4" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </motion.div>
  )
}

export default TipCard
