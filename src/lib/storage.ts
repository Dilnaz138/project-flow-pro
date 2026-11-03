import { seedWorkspace } from '../data/seed'
import type { WorkspaceState } from '../types'

const STORAGE_KEY = 'projectflow-ai-workspace-v1'

function isWorkspaceState(value: unknown): value is WorkspaceState {
  if (!value || typeof value !== 'object') return false
  const candidate = value as WorkspaceState
  return Array.isArray(candidate.projects) && Array.isArray(candidate.tasks)
}

export function loadWorkspace(): WorkspaceState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(seedWorkspace)
    const parsed: unknown = JSON.parse(raw)
    if (!isWorkspaceState(parsed)) return structuredClone(seedWorkspace)
    return parsed
  } catch {
    return structuredClone(seedWorkspace)
  }
}

export function saveWorkspace(state: WorkspaceState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
