import { createContext } from 'react'
import type { Task, TaskDraft, WorkspaceState } from '../types'

export type WorkspaceContextValue = {
  projects: WorkspaceState['projects']
  tasks: Task[]
  createTask: (draft: TaskDraft) => void
  updateTask: (id: string, draft: TaskDraft) => void
  toggleTaskComplete: (id: string) => void
  deleteTask: (id: string) => void
}

export const WorkspaceContext = createContext<WorkspaceContextValue | null>(null)
