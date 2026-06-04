import { useId } from 'react'
import { cn } from '../utils/cn'

type BaseProps = {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  placeholder?: string
}

const fieldClasses =
  'peer w-full rounded-2xl glass px-4 py-3.5 text-sm text-current placeholder-transparent outline-none transition-all duration-300 focus:border-transparent focus:shadow-[0_0_0_1.5px_var(--color-violet),0_0_28px_-6px_var(--color-violet)]'

const labelClasses =
  'pointer-events-none absolute left-4 top-3.5 origin-left text-sm text-current/45 transition-all duration-200 peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-[var(--color-cyan)] peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-xs'

/** Glassmorphic text input with a floating label and focus glow. */
export function Input({
  label,
  name,
  value,
  onChange,
  error,
  required,
  placeholder = ' ',
  type = 'text',
}: BaseProps & { type?: string }) {
  const id = useId()
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={cn(fieldClasses, error && 'shadow-[0_0_0_1.5px_var(--color-magenta)]')}
      />
      <label htmlFor={id} className={labelClasses}>
        {label} {required && <span className="text-[var(--color-magenta)]">*</span>}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 pl-1 text-xs text-[var(--color-magenta)]">
          {error}
        </p>
      )}
    </div>
  )
}

/** Glassmorphic textarea variant. */
export function Textarea({
  label,
  name,
  value,
  onChange,
  error,
  required,
  placeholder = ' ',
  rows = 4,
}: BaseProps & { rows?: number }) {
  const id = useId()
  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        value={value}
        rows={rows}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={cn(fieldClasses, 'resize-none', error && 'shadow-[0_0_0_1.5px_var(--color-magenta)]')}
      />
      <label htmlFor={id} className={labelClasses}>
        {label} {required && <span className="text-[var(--color-magenta)]">*</span>}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 pl-1 text-xs text-[var(--color-magenta)]">
          {error}
        </p>
      )}
    </div>
  )
}
