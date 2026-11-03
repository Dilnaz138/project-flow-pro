import { StatCards } from '../components/dashboard/StatCards'
import { ProjectCards } from '../components/dashboard/ProjectCards'
import { useWorkspace } from '../hooks/useWorkspace'

export function DashboardPage() {
  const { projects, tasks } = useWorkspace()

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <StatCards tasks={tasks} />
      <ProjectCards projects={projects} tasks={tasks} />
    </div>
  )
}
