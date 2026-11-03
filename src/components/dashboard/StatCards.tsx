import { CheckCircle2, CircleDashed, ListTodo, TrendingUp } from 'lucide-react'
import { Card } from '../ui/Card'
import type { Task } from '../../types'

export function StatCards({ tasks }: { tasks: Task[] }) {
  const total = tasks.length
  const done = tasks.filter((task) => task.status === 'done').length
  const inProgress = tasks.filter((task) => task.status === 'in-progress').length
  const rate = total === 0 ? 0 : Math.round((done / total) * 100)

  const stats = [
    { label: 'Total tasks', value: String(total), icon: ListTodo, delay: '0ms' },
    { label: 'In progress', value: String(inProgress), icon: CircleDashed, delay: '80ms' },
    { label: 'Completed', value: String(done), icon: CheckCircle2, delay: '160ms' },
    { label: 'Completion', value: `${rate}%`, icon: TrendingUp, delay: '240ms' },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.label}
            className="animate-fade-up p-5"
            style={{ animationDelay: stat.delay }}
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
              <Icon size={18} />
            </div>
            <p className="text-sm text-zinc-500">{stat.label}</p>
            <p className="font-display mt-1 text-3xl font-semibold text-white">{stat.value}</p>
          </Card>
        )
      })}
    </div>
  )
}
