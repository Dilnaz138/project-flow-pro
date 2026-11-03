import { cn } from '../../lib/cn'

export function ProgressBar({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
      <div
        className={cn(
          'h-full rounded-full bg-linear-to-r from-violet-500 to-fuchsia-400 transition-all duration-500',
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
