import type { Project, TaskFilters as Filters, TaskPriority, TaskStatus } from '../../types'
import { FieldLabel } from '../ui/Field'

const selectClass =
  'rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-violet-400/60'

export function TaskFilters({
  filters,
  projects,
  onChange,
}: {
  filters: Filters
  projects: Project[]
  onChange: (next: Filters) => void
}) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      <div className="md:col-span-1">
        <FieldLabel>Search</FieldLabel>
        <input
          className={`${selectClass} w-full`}
          placeholder="Search tasks"
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
        />
      </div>
      <div>
        <FieldLabel>Status</FieldLabel>
        <select
          className={`${selectClass} w-full`}
          value={filters.status}
          onChange={(event) =>
            onChange({ ...filters, status: event.target.value as TaskStatus | 'all' })
          }
        >
          <option value="all">All statuses</option>
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div>
        <FieldLabel>Priority</FieldLabel>
        <select
          className={`${selectClass} w-full`}
          value={filters.priority}
          onChange={(event) =>
            onChange({
              ...filters,
              priority: event.target.value as TaskPriority | 'all',
            })
          }
        >
          <option value="all">All priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div>
        <FieldLabel>Project</FieldLabel>
        <select
          className={`${selectClass} w-full`}
          value={filters.projectId}
          onChange={(event) => onChange({ ...filters, projectId: event.target.value })}
        >
          <option value="all">All projects</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
