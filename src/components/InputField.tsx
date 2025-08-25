import React, { useId, useState } from 'react'
import { cn } from '@/lib/cn'

export type InputVariant = 'filled' | 'outlined' | 'ghost'
export type InputSize = 'sm' | 'md' | 'lg'

export interface InputFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  loading?: boolean
  variant?: InputVariant
  size?: InputSize
  type?: React.HTMLInputTypeAttribute
  clearable?: boolean
  passwordToggle?: boolean
  id?: string
  name?: string
  required?: boolean
  'aria-label'?: string
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'text-sm px-3 py-2 rounded-md',
  md: 'text-base px-3.5 py-2.5 rounded-lg',
  lg: 'text-lg px-4 py-3 rounded-xl',
}

const variantClasses: Record<InputVariant, string> = {
  filled:
    'bg-gray-100 border border-transparent focus:bg-white  focus:border-blue-500',
  outlined:
    'bg-white border border-gray-300 dark:border-gray-700 focus:border-blue-500',
  ghost:
    'bg-transparent border border-transparent focus:border-blue-500',
}

const baseClasses =
  'w-full transition-colors outline-none focus:ring-2 ring-blue-200 dark:ring-blue-900 placeholder-gray-400 disabled:opacity-60 disabled:cursor-not-allowed'

const labelBase =
  'block mb-1 font-medium text-gray-700 dark:text-gray-200 select-none'

const helperBase =
  'mt-1 text-sm text-gray-500 dark:text-gray-400'

const errorBase =
  'mt-1 text-sm text-red-600 dark:text-red-400'

export const InputField: React.FC<InputFieldProps> = (props) => {
  const {
    value,
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled,
    invalid,
    loading,
    variant = 'outlined',
    size = 'md',
    type = 'text',
    clearable,
    passwordToggle,
    id,
    name,
    required,
  } = props

  const autoId = useId()
  const inputId = id ?? autoId
  const describedBy: string[] = []
  if (helperText) describedBy.push(`${inputId}-help`)
  if (invalid && errorMessage) describedBy.push(`${inputId}-err`)

  const [isPassword, setIsPassword] = useState(type === 'password')

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className={labelBase}>
          {label}
          {required && <span className="text-red-600"> *</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          name={name}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy.join(' ') || undefined}
          aria-busy={loading || undefined}
          disabled={disabled || loading}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          type={isPassword ? 'password' : type}
          className={cn(
            baseClasses,
            sizeClasses[size],
            variantClasses[variant],
            invalid && 'border-red-500 focus:border-red-500 ring-red-200 dark:ring-red-900',
            loading && 'pr-10',
          )}
        />

        {loading && (
          <div className="absolute inset-y-0 right-2 flex items-center pr-1" aria-hidden="true">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75" />
            </svg>
          </div>
        )}

        {clearable && value && !loading && !disabled && (
          <button
            type="button"
            aria-label="Clear input"
            onClick={() => props.onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
            className="absolute inset-y-0 right-2 flex items-center rounded-md px-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            ✕
          </button>
        )}

      </div>

      {helperText && !invalid && (
        <p id={`${inputId}-help`} className={helperBase}>
          {helperText}
        </p>
      )}
      {invalid && errorMessage && (
        <p id={`${inputId}-err`} className={errorBase} role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export default InputField
