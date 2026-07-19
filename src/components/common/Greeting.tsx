type GreetingProps = {
  name: string
  subtitle?: string
}

function Greeting({ name, subtitle }: GreetingProps) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-500">Good evening</p>
      <h2 className="text-xl font-semibold text-slate-900">Hi, {name}</h2>
      {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
    </div>
  )
}

export default Greeting
