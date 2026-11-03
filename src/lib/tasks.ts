import type { Project, Task, TaskFilters } from '../types'

export function filterTasks(tasks: Task[], filters: TaskFilters) {
  const query = filters.query.trim().toLowerCase()

  return tasks.filter((task) => {
    const matchesQuery =
      query.length === 0 ||
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
    const matchesStatus = filters.status === 'all' || task.status === filters.status
    const matchesPriority =
      filters.priority === 'all' || task.priority === filters.priority
    const matchesProject =
      filters.projectId === 'all' || task.projectId === filters.projectId

    return matchesQuery && matchesStatus && matchesPriority && matchesProject
  })
}

export function projectProgress(projectId: string, tasks: Task[]) {
  const related = tasks.filter((task) => task.projectId === projectId)
  if (related.length === 0) return 0
  const done = related.filter((task) => task.status === 'done').length
  return Math.round((done / related.length) * 100)
}

export function findProject(projects: Project[], projectId: string) {
  return projects.find((project) => project.id === projectId)
}

export function formatDueDate(value: string) {
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return 'No date'
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}
