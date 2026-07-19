import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'

function FloatingActionButton() {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className="fixed right-4 bottom-24 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_20px_40px_-12px_rgba(34,197,94,0.6)] sm:right-6"
      type="button"
      aria-label="Add transaction"
    >
      <Plus className="h-6 w-6" />
    </motion.button>
  )
}

export default FloatingActionButton
