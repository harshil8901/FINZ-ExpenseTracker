type ProgressBarProps = {
  progress: number
  className?: string
}

function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  return (
    <div className={`h-2 overflow-hidden rounded-full bg-slate-100 ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-400 transition-all duration-700"
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      />
    </div>
  )
}

export default ProgressBar
