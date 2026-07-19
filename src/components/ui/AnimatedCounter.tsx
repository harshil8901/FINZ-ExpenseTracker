import { animate, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type AnimatedCounterProps = {
  value: number
  prefix?: string
  suffix?: string
}

function AnimatedCounter({ value, prefix = '', suffix = '' }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    })

    return controls.stop
  }, [value])

  return (
    <motion.span>
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  )
}

export default AnimatedCounter
