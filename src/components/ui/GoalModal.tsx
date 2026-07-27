import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

type GoalModalProps = {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
}

function GoalModal({ open, title, children, onClose }: GoalModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/40 px-3 pb-3 pt-10 sm:items-center" onClick={onClose}>
          <motion.div initial={{ y: 24, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 24, opacity: 0, scale: 0.98 }} transition={{ duration: 0.22 }} className="w-full max-w-2xl rounded-[28px] border border-slate-200 bg-white p-4 shadow-2xl sm:p-6" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600">Goal flow</p>
                <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
              </div>
              <button type="button" onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-4">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default GoalModal
