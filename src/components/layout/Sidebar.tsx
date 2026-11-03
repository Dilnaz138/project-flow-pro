import { Bot, LayoutDashboard, ListChecks, Sparkles, X } from 'lucide-react'
import { cn } from '../../lib/cn'
import type { AppView } from '../../types'

const items: Array<{ id: AppView; label: string; hint: string; icon: typeof LayoutDashboard }> = [
  { id: 'dashboard', label: 'Overview', hint: 'Stats & projects', icon: LayoutDashboard },
  { id: 'tasks', label: 'Tasks', hint: 'Create and track work', icon: ListChecks },
  { id: 'assistant', label: 'AI Assistant', hint: 'Local demo only', icon: Bot },
]

type SidebarProps = {
  view: AppView
  onChangeView: (view: AppView) => void
  open: boolean
  onClose: () => void
}

export function Sidebar({ view, onChangeView, open, onClose }: SidebarProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Close navigation"
        className={cn(
          'fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/8 bg-[#0b0b13]/95 px-4 py-5 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 to-fuchsia-500 shadow-[0_0_24px_rgba(139,92,246,0.45)]">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="font-display text-base font-semibold tracking-tight text-white">
                ProjectFlow
              </p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-violet-300">AI Workspace</p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-lg p-1 text-zinc-400 hover:bg-white/5 lg:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5">
          {items.map((item) => {
            const Icon = item.icon
            const active = view === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onChangeView(item.id)
                  onClose()
                }}
                className={cn(
                  'flex items-center gap-3 rounded-2xl px-3 py-3 text-left transition-all duration-200',
                  active
                    ? 'bg-violet-500/15 text-white shadow-[inset_0_0_0_1px_rgba(167,139,250,0.25)]'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white',
                )}
              >
                <Icon size={18} className={active ? 'text-violet-300' : ''} />
                <span>
                  <span className="block text-sm font-medium">{item.label}</span>
                  <span className="block text-[11px] text-zinc-500">{item.hint}</span>
                </span>
              </button>
            )
          })}
        </nav>

        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/20 text-sm font-semibold text-violet-200">
              D
            </div>
            <div>
              <p className="text-sm font-medium text-white">Dilnaz</p>
              <p className="text-xs text-zinc-500">Software engineer</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
