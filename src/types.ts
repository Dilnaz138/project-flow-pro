export type TaskStatus = 'todo' | 'in-progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'
export type ProjectStatus = 'on-track' | 'at-risk' | 'completed'
export type AppView = 'dashboard' | 'tasks' | 'assistant'

export type Project = {
  id: string
  name: string
  description: string
  accent: string
  status: ProjectStatus
}

export type Task = {
  id: string
  title: string
  description: string
  projectId: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  createdAt: string
}

export type WorkspaceState = {
  projects: Project[]
  tasks: Task[]
}

export type TaskDraft = {
  title: string
  description: string
  projectId: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
}

export type TaskFilters = {
  query: string
  status: TaskStatus | 'all'
  priority: TaskPriority | 'all'
  projectId: string | 'all'
}
