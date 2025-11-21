import { AnyFieldMetaBase } from '@tanstack/react-form'
import { cn } from '~/lib/utils'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

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

export type CustomComboBoxProps = {
    field: FieldProps<string>
    label?: string
    placeholder?: string
    helperText?: string
    options: SelectOption[]
    disabled?: boolean
    className?: string
    searchPlaceholder?: string
    emptyText?: string
}

export function CustomComboBox({
    field,
    label,
    placeholder = 'Select an option',
    helperText,
    options,
    disabled = false,
    className,
    searchPlaceholder = 'Search...',
    emptyText = 'No option found.'
}: CustomComboBoxProps) {
    const [open, setOpen] = useState(false)
    const currentValue = field.state.value

    const hasError = field.state.meta.isTouched &&
        Array.isArray(field.state.meta.errors) &&
        field.state.meta.errors &&
        field.state.meta.errors.length > 0

    const errorMessage = hasError && Array.isArray(field.state.meta.errors)
        ? field.state.meta.errors[0] as string
        : undefined

    const selectedOption = options.find(opt => opt.value === currentValue)

    const handleSelect = (value: string) => {
        field.handleChange(value === currentValue ? '' : value)
        setOpen(false)
        field.handleBlur()
    }

    return (
        <div className="space-y-2">
            {label && (
                <Label
                    htmlFor={`combobox-${field.name}`}
                    className={cn(hasError && "text-red-500")}
                >
                    {label}
                </Label>
            )}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id={`combobox-${field.name}`}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "w-full justify-between",
                            !selectedOption && "text-muted-foreground",
                            hasError && "border-red-500 focus:ring-red-500",
                            className
                        )}
                        disabled={disabled}
                    >
                        {selectedOption?.label || placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                    <Command>
                        <CommandInput
                            placeholder={searchPlaceholder}
                            className="h-9"
                        />
                        <CommandList>
                            <CommandEmpty>{emptyText}</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.label}
                                        disabled={option.disabled}
                                        onSelect={() => handleSelect(option.value)}
                                        className="cursor-pointer"
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                currentValue === option.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

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

export default CustomComboBox