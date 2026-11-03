import { Check, Pencil, Trash2 } from 'lucide-react'
import type { Project, Task, TaskPriority, TaskStatus } from '../../types'
import { findProject, formatDueDate } from '../../lib/tasks'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { cn } from '../../lib/cn'

const statusTone: Record<TaskStatus, 'zinc' | 'sky' | 'emerald'> = {
  todo: 'zinc',
  'in-progress': 'sky',
  done: 'emerald',
}

const priorityTone: Record<TaskPriority, 'rose' | 'amber' | 'zinc'> = {
  high: 'rose',
  medium: 'amber',
  low: 'zinc',
}

export function TaskItem({
  task,
  projects,
  onToggle,
  onEdit,
  onDelete,
}: {
  task: Task
  projects: Project[]
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  const project = findProject(projects, task.projectId)

  return (
    <Card className="animate-fade-up p-4 transition hover:border-violet-400/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <button
          type="button"
          onClick={onToggle}
          aria-label={task.status === 'done' ? 'Mark as not done' : 'Mark as complete'}
          className={cn(
            'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition',
            task.status === 'done'
              ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-200'
              : 'border-white/15 text-zinc-500 hover:border-violet-400/50 hover:text-violet-200',
          )}
        >
          <Check size={16} />
        </button>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h3
              className={cn(
                'font-display text-base text-white',
                task.status === 'done' && 'text-zinc-400 line-through',
              )}
            >
              {task.title}
            </h3>
            <Badge tone={statusTone[task.status]}>{task.status.replace('-', ' ')}</Badge>
            <Badge tone={priorityTone[task.priority]}>{task.priority}</Badge>
          </div>
          <p className="mb-3 text-sm leading-6 text-zinc-400">{task.description}</p>
          <p className="text-xs text-zinc-500">
            {project?.name ?? 'Unassigned'} · Due {formatDueDate(task.dueDate)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="px-3" onClick={onEdit} icon={<Pencil size={14} />}>
            Edit
          </Button>
          <Button variant="danger" className="px-3" onClick={onDelete} icon={<Trash2 size={14} />}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  )
}
