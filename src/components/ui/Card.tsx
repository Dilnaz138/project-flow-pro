import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/8 bg-white/[0.035] shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl',
        className,
      )}
      {...props}
    />
  )
}
