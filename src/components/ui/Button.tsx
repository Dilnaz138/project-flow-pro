import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'subtle'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  icon?: ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-violet-500 text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:bg-violet-400',
  ghost:
    'border border-white/10 bg-white/5 text-zinc-200 hover:border-violet-400/40 hover:bg-violet-500/10',
  danger: 'bg-rose-500/15 text-rose-300 hover:bg-rose-500/25',
  subtle: 'text-zinc-400 hover:bg-white/5 hover:text-white',
}

export function Button({
  variant = 'primary',
  icon,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}
