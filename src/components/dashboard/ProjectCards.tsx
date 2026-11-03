import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { ProgressBar } from '../ui/ProgressBar'
import { projectProgress } from '../../lib/tasks'
import type { Project, ProjectStatus, Task } from '../../types'

const statusTone: Record<ProjectStatus, 'emerald' | 'amber' | 'violet'> = {
  'on-track': 'emerald',
  'at-risk': 'amber',
  completed: 'violet',
}

export function ProjectCards({
  projects,
  tasks,
}: {
  projects: Project[]
  tasks: Task[]
}) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="font-display text-lg text-white">Projects</h2>
          <p className="text-sm text-zinc-500">Progress is derived from your task list.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, index) => {
          const related = tasks.filter((task) => task.projectId === project.id)
          const progress = projectProgress(project.id, tasks)
          return (
            <Card
              key={project.id}
              className="animate-fade-up overflow-hidden p-5"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className={`mb-4 h-1.5 rounded-full bg-linear-to-r ${project.accent}`} />
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="font-display text-lg text-white">{project.name}</h3>
                <Badge tone={statusTone[project.status]}>{project.status.replace('-', ' ')}</Badge>
              </div>
              <p className="mb-5 text-sm leading-6 text-zinc-400">{project.description}</p>
              <div className="mb-2 flex items-center justify-between text-xs text-zinc-500">
                <span>
                  {related.filter((task) => task.status === 'done').length}/{related.length} tasks
                </span>
                <span>{progress}%</span>
              </div>
              <ProgressBar value={progress} />
            </Card>
          )
        })}
      </div>
    </section>
  )
}
