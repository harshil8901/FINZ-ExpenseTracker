import { Bell } from 'lucide-react'
import { motion } from 'framer-motion'

type NotificationButtonProps = {
  count?: number
}

function NotificationButton({ count = 3 }: NotificationButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm"
      type="button"
      aria-label="Notifications"
    >
      <Bell className="h-5 w-5" />
      {count > 0 ? (
        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-semibold text-white">
          {count}
        </span>
      ) : null}
    </motion.button>
  )
}

export default NotificationButton
