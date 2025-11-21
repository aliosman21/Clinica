import { AnyFieldMetaBase } from '@tanstack/react-form'
import { cn } from '~/lib/utils'
import { Label } from '../ui/label'
import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export type SelectOption = {
    value: string
    label: string
    disabled?: boolean
}

export type FieldProps<T> = {
    name: string
    state: {
        value: T
        meta: AnyFieldMetaBase & { errors?: string[] | unknown }
    }
    handleChange: (value: T) => void
    handleBlur: () => void
}

export type CustomSelectProps = {
    field: FieldProps<string>
    label?: string
    placeholder?: string
    helperText?: string
    options: SelectOption[]
    disabled?: boolean
    className?: string
}

export function CustomSelect({
    field,
    label,
    placeholder = 'Select an option',
    helperText,
    options,
    disabled = false,
    className,
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)
    const currentValue = field.state.value

    const hasError = field.state.meta.isTouched &&
        Array.isArray(field.state.meta.errors) &&
        field.state.meta.errors &&
        field.state.meta.errors.length > 0

    const errorMessage = hasError && Array.isArray(field.state.meta.errors)
        ? field.state.meta.errors[0] as string
        : undefined

    const selectedOption = options.find(opt => opt.value === currentValue)

    const handleOptionSelect = (option: SelectOption) => {
        if (!option.disabled) {
            field.handleChange(option.value)
            setIsOpen(false)
            field.handleBlur()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(!isOpen)
        } else if (e.key === 'Escape') {
            setIsOpen(false)
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (!isOpen) {
                setIsOpen(true)
            } else {
                // Navigate to next option
                const currentIndex = options.findIndex(opt => opt.value === currentValue)
                const nextIndex = (currentIndex + 1) % options.length
                const nextOption = options[nextIndex]
                if (nextOption && !nextOption.disabled) {
                    field.handleChange(nextOption.value)
                }
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (isOpen) {
                // Navigate to previous option
                const currentIndex = options.findIndex(opt => opt.value === currentValue)
                const prevIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1
                const prevOption = options[prevIndex]
                if (prevOption && !prevOption.disabled) {
                    field.handleChange(prevOption.value)
                }
            }
        }
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="space-y-2">
            {label && (
                <Label
                    htmlFor={`select-${field.name}`}
                    className={cn(hasError && "text-red-500")}
                >
                    {label}
                </Label>
            )}

            <div className="relative" ref={selectRef}>
                <div
                    id={`select-${field.name}`}
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    tabIndex={disabled ? -1 : 0}
                    className={cn(
                        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        hasError && "border-red-500 focus:ring-red-500",
                        className
                    )}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                >
                    <span className={cn(
                        "flex-1 text-left",
                        !selectedOption && "text-muted-foreground"
                    )}>
                        {selectedOption?.label || placeholder}
                    </span>
                    <ChevronDown
                        className={cn(
                            "h-4 w-4 opacity-50 transition-transform",
                            isOpen && "rotate-180"
                        )}
                    />
                </div>

                {isOpen && (
                    <div className="absolute top-full z-50 w-full mt-1 rounded-md border bg-popover shadow-md">
                        <div
                            role="listbox"
                            className="max-h-60 overflow-auto p-1"
                        >
                            {options.map((option) => (
                                <div
                                    key={option.value}
                                    role="option"
                                    aria-selected={option.value === currentValue}
                                    className={cn(
                                        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                                        "hover:bg-accent hover:text-accent-foreground",
                                        "focus:bg-accent focus:text-accent-foreground",
                                        option.value === currentValue && "bg-accent text-accent-foreground",
                                        option.disabled && "pointer-events-none opacity-50"
                                    )}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-start">
                <div className="flex-1">
                    {(errorMessage || helperText) && (
                        <p className={cn(
                            "text-sm",
                            hasError ? "text-red-500" : "text-muted-foreground"
                        )}>
                            {errorMessage || helperText}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CustomSelect