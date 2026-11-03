import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { createId } from '../lib/ids'
import { loadWorkspace, saveWorkspace } from '../lib/storage'
import type { TaskDraft, WorkspaceState } from '../types'
import { WorkspaceContext } from './workspace-context'

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WorkspaceState>(() => loadWorkspace())

  useEffect(() => {
    saveWorkspace(state)
  }, [state])

  const createTask = useCallback((draft: TaskDraft) => {
    setState((current) => ({
      ...current,
      tasks: [
        {
          ...draft,
          id: createId('task'),
          createdAt: new Date().toISOString(),
        },
        ...current.tasks,
      ],
    }))
  }, [])

  const updateTask = useCallback((id: string, draft: TaskDraft) => {
    setState((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        task.id === id ? { ...task, ...draft } : task,
      ),
    }))
  }, [])

  const toggleTaskComplete = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      tasks: current.tasks.map((task) => {
        if (task.id !== id) return task
        return {
          ...task,
          status: task.status === 'done' ? 'todo' : 'done',
        }
      }),
    }))
  }, [])

  const deleteTask = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      tasks: current.tasks.filter((task) => task.id !== id),
    }))
  }, [])

  const value = useMemo(
    () => ({
      projects: state.projects,
      tasks: state.tasks,
      createTask,
      updateTask,
      toggleTaskComplete,
      deleteTask,
    }),
    [state.projects, state.tasks, createTask, updateTask, toggleTaskComplete, deleteTask],
  )

  return (
    <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
  )
}
