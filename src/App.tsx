import { useState } from 'react'
import { AppShell } from './components/layout/AppShell'
import { WorkspaceProvider } from './context/WorkspaceProvider'
import { AssistantPage } from './pages/AssistantPage'
import { DashboardPage } from './pages/DashboardPage'
import { TasksPage } from './pages/TasksPage'
import type { AppView } from './types'

function WorkspaceApp() {
  const [view, setView] = useState<AppView>('dashboard')

  return (
    <AppShell view={view} onChangeView={setView}>
      {view === 'dashboard' ? <DashboardPage /> : null}
      {view === 'tasks' ? <TasksPage /> : null}
      {view === 'assistant' ? <AssistantPage /> : null}
    </AppShell>
  )
}

function App() {
  return (
    <WorkspaceProvider>
      <WorkspaceApp />
    </WorkspaceProvider>
  )
}

export default App
