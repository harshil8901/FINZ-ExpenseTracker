import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type SecondaryButtonProps = {
  children: ReactNode
  icon?: ReactNode
  onClick?: () => void
}

function SecondaryButton({ children, icon, onClick }: SecondaryButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
    >
      {icon}
      {children}
    </motion.button>
  )
}

export default SecondaryButton
