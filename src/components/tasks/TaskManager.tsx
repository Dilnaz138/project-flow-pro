import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useWorkspace } from '../../hooks/useWorkspace'
import { filterTasks } from '../../lib/tasks'
import type { Task, TaskFilters as Filters } from '../../types'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import { TaskFilters } from './TaskFilters'
import { TaskForm } from './TaskForm'
import { TaskItem } from './TaskItem'

const defaultFilters: Filters = {
  query: '',
  status: 'all',
  priority: 'all',
  projectId: 'all',
}

export function TaskManager() {
  const { projects, tasks, createTask, updateTask, toggleTaskComplete, deleteTask } =
    useWorkspace()
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)

  const visible = useMemo(() => filterTasks(tasks, filters), [tasks, filters])

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex-1">
          <TaskFilters filters={filters} projects={projects} onChange={setFilters} />
        </div>
        <Button className="shrink-0" onClick={() => setCreating(true)} icon={<Plus size={16} />}>
          New task
        </Button>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center text-zinc-500">
          No tasks match these filters. Create one or clear the filters.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              projects={projects}
              onToggle={() => toggleTaskComplete(task.id)}
              onEdit={() => setEditing(task)}
              onDelete={() => deleteTask(task.id)}
            />
          ))}
        </div>
      )}

      <Modal open={creating} title="Create task" onClose={() => setCreating(false)}>
        <TaskForm
          projects={projects}
          submitLabel="Create task"
          onCancel={() => setCreating(false)}
          onSubmit={(draft) => {
            createTask(draft)
            setCreating(false)
          }}
        />
      </Modal>

      <Modal
        open={Boolean(editing)}
        title="Edit task"
        onClose={() => setEditing(null)}
      >
        {editing ? (
          <TaskForm
            projects={projects}
            initial={editing}
            submitLabel="Save changes"
            onCancel={() => setEditing(null)}
            onSubmit={(draft) => {
              updateTask(editing.id, draft)
              setEditing(null)
            }}
          />
        ) : null}
      </Modal>
    </div>
  )
}
