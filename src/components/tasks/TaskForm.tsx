import { useState } from 'react'
import type { Project, Task, TaskDraft, TaskPriority, TaskStatus } from '../../types'
import { Button } from '../ui/Button'
import { SelectField, TextAreaField, TextField } from '../ui/Field'

const emptyDraft = (projectId: string): TaskDraft => ({
  title: '',
  description: '',
  projectId,
  status: 'todo',
  priority: 'medium',
  dueDate: new Date().toISOString().slice(0, 10),
})

export function TaskForm({
  projects,
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  projects: Project[]
  initial?: Task
  submitLabel: string
  onSubmit: (draft: TaskDraft) => void
  onCancel: () => void
}) {
  const [draft, setDraft] = useState<TaskDraft>(
    initial
      ? {
          title: initial.title,
          description: initial.description,
          projectId: initial.projectId,
          status: initial.status,
          priority: initial.priority,
          dueDate: initial.dueDate,
        }
      : emptyDraft(projects[0]?.id ?? ''),
  )
  const [error, setError] = useState('')

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        if (!draft.title.trim()) {
          setError('Give the task a title.')
          return
        }
        onSubmit({ ...draft, title: draft.title.trim() })
      }}
    >
      <TextField
        label="Title"
        value={draft.title}
        onChange={(event) => setDraft({ ...draft, title: event.target.value })}
        placeholder="Ship onboarding checklist"
      />
      <TextAreaField
        label="Description"
        value={draft.description}
        onChange={(event) => setDraft({ ...draft, description: event.target.value })}
        placeholder="What does done look like?"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label="Project"
          value={draft.projectId}
          onChange={(event) => setDraft({ ...draft, projectId: event.target.value })}
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </SelectField>
        <TextField
          label="Due date"
          type="date"
          value={draft.dueDate}
          onChange={(event) => setDraft({ ...draft, dueDate: event.target.value })}
        />
        <SelectField
          label="Status"
          value={draft.status}
          onChange={(event) =>
            setDraft({ ...draft, status: event.target.value as TaskStatus })
          }
        >
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </SelectField>
        <SelectField
          label="Priority"
          value={draft.priority}
          onChange={(event) =>
            setDraft({ ...draft, priority: event.target.value as TaskPriority })
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </SelectField>
      </div>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  )
}
