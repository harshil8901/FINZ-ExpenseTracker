import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type PrimaryButtonProps = {
  children: ReactNode
  icon?: ReactNode
  onClick?: () => void
}

function PrimaryButton({ children, icon, onClick }: PrimaryButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200"
    >
      {icon}
      {children}
    </motion.button>
  )
}

export default PrimaryButton
