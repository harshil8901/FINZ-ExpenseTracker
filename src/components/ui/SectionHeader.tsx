type SectionHeaderProps = {
  title: string
  subtitle?: string
}

function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
      </div>
    </div>
  )
}

export default SectionHeader
