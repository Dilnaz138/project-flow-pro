import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

const fieldClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20'

export function FieldLabel({ children }: { children: string }) {
  return (
    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-400">
      {children}
    </label>
  )
}

export function TextField({
  label,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input className={cn(fieldClass, className)} {...props} />
    </div>
  )
}

export function TextAreaField({
  label,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <textarea className={cn(fieldClass, 'min-h-24 resize-y', className)} {...props} />
    </div>
  )
}

export function SelectField({
  label,
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <select className={cn(fieldClass, className)} {...props}>
        {children}
      </select>
    </div>
  )
}
