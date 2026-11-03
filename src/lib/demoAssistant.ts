import type { Project, Task } from '../types'
import { projectProgress } from './tasks'

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function buildDemoReply(prompt: string, projects: Project[], tasks: Task[]) {
  const text = prompt.toLowerCase()
  const total = tasks.length
  const done = tasks.filter((task) => task.status === 'done').length
  const inProgress = tasks.filter((task) => task.status === 'in-progress').length
  const todo = tasks.filter((task) => task.status === 'todo').length
  const high = tasks.filter(
    (task) => task.priority === 'high' && task.status !== 'done',
  )

  if (text.includes('overdue') || text.includes('due')) {
    const upcoming = [...tasks]
      .filter((task) => task.status !== 'done')
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 3)
      .map((task) => `• ${task.title} (${task.dueDate})`)
      .join('\n')

    return `Here are the next due dates I can see in this demo workspace:\n${upcoming || 'No open tasks with due dates.'}`
  }

  if (text.includes('project')) {
    const lines = projects
      .map((project) => {
        const progress = projectProgress(project.id, tasks)
        return `• ${project.name} — ${progress}% complete (${project.status.replace('-', ' ')})`
      })
      .join('\n')
    return `Project snapshot from local demo data:\n${lines}`
  }

  if (text.includes('priority') || text.includes('risk') || text.includes('focus')) {
    const lines =
      high.length > 0
        ? high.map((task) => `• ${task.title}`).join('\n')
        : 'No open high-priority tasks.'
    return `High-priority items still open:\n${lines}`
  }

  if (text.includes('task') || text.includes('progress') || text.includes('status')) {
    return `Workspace stats (demo, from your local tasks):\n• ${total} tasks total\n• ${todo} to do\n• ${inProgress} in progress\n• ${done} completed`
  }

  return `This is a local demo assistant — no AI model is called. I can summarize your saved tasks and projects. Try asking about progress, due dates, priorities, or projects.\n\nCurrent snapshot: ${done}/${total} tasks complete.`
}
