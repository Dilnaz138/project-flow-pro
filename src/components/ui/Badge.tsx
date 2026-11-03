import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type BadgeTone = 'violet' | 'emerald' | 'amber' | 'rose' | 'zinc' | 'sky'

const tones: Record<BadgeTone, string> = {
  violet: 'bg-violet-500/15 text-violet-300 ring-violet-400/20',
  emerald: 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/20',
  amber: 'bg-amber-500/15 text-amber-300 ring-amber-400/20',
  rose: 'bg-rose-500/15 text-rose-300 ring-rose-400/20',
  zinc: 'bg-white/8 text-zinc-300 ring-white/10',
  sky: 'bg-sky-500/15 text-sky-300 ring-sky-400/20',
}

export function Badge({
  tone = 'zinc',
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide ring-1',
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}
