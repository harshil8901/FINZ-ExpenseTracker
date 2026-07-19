import Avatar from '@/components/common/Avatar'
import Greeting from '@/components/common/Greeting'
import NotificationButton from '@/components/common/NotificationButton'

type TopHeaderProps = {
  name: string
  initials: string
}

function TopHeader({ name, initials }: TopHeaderProps) {
  return (
    <header className="flex items-center justify-between px-1 py-2">
      <div className="flex items-center gap-3">
        <Avatar name={name} initials={initials} size="md" />
        <Greeting name={name} subtitle="You are doing great this week" />
      </div>
      <NotificationButton count={3} />
    </header>
  )
}

export default TopHeader
