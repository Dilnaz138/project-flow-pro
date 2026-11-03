import { Menu } from 'lucide-react'
import type { AppView } from '../../types'

const titles: Record<AppView, { heading: string; sub: string }> = {
  dashboard: {
    heading: 'Command center',
    sub: 'Live snapshot of your portfolio work',
  },
  tasks: {
    heading: 'Task manager',
    sub: 'Create, filter, complete, and persist work locally',
  },
  assistant: {
    heading: 'AI assistant',
    sub: 'Guided demo — replies are generated in the browser',
  },
}

export function TopBar({
  view,
  onOpenSidebar,
}: {
  view: AppView
  onOpenSidebar: () => void
}) {
  const copy = titles[view]

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/8 bg-[#07070f]/80 px-4 py-4 backdrop-blur-xl sm:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-xl border border-white/10 p-2 text-zinc-300 lg:hidden"
          onClick={onOpenSidebar}
          aria-label="Open navigation"
        >
          <Menu size={18} />
        </button>
        <div>
          <h1 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {copy.heading}
          </h1>
          <p className="text-sm text-zinc-500">{copy.sub}</p>
        </div>
      </div>
      <div className="hidden items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs text-violet-200 sm:flex">
        Local workspace
      </div>
    </header>
  )
}
