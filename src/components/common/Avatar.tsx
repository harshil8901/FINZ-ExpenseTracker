import { motion } from 'framer-motion'

type AvatarProps = {
  name: string
  initials?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-10 w-10 text-sm',
  md: 'h-12 w-12 text-base',
  lg: 'h-14 w-14 text-lg',
}

function Avatar({ name, initials, size = 'md' }: AvatarProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-lime-400 font-semibold text-white shadow-lg shadow-emerald-100 ${sizeClasses[size]}`}
      aria-label={name}
    >
      {initials ?? name.charAt(0).toUpperCase()}
    </motion.div>
  )
}

export default Avatar
