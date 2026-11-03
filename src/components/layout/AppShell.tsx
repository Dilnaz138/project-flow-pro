import { useState, type ReactNode } from 'react'
import type { AppView } from '../../types'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function AppShell({
  view,
  onChangeView,
  children,
}: {
  view: AppView
  onChangeView: (view: AppView) => void
  children: ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="relative min-h-svh overflow-hidden bg-ink text-zinc-100">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 animate-pulse-soft rounded-full bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 animate-pulse-soft rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="relative flex min-h-svh">
        <Sidebar
          view={view}
          onChangeView={onChangeView}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar view={view} onOpenSidebar={() => setSidebarOpen(true)} />
          <main className="flex-1 px-4 py-6 sm:px-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
