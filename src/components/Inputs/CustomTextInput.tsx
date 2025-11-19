
import { AnyFieldMetaBase } from '@tanstack/react-form'
import { cn } from '~/lib/utils';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export type FieldProps<T> = {
    name: string;
    state: {
        value: T;
        meta: AnyFieldMetaBase & { errors?: string[] | unknown };
    };
    handleChange: (value: T) => void;
    handleBlur: () => void;
}

export type CustomTextInputProps = {
    field: FieldProps<string>;
    label?: string;
    placeholder?: string;
    helperText?: string;
    multiline?: boolean;
    rows?: number;
    id?: string;
    maxLength?: number;
    disabled?: boolean;
    showCharCount?: boolean;
    className?: string;
};

export function CustomTextInput({
    field,
    label,
    placeholder,
    helperText,
    multiline = false,
    rows = 3,
    disabled = false,
    id,
    maxLength,
    showCharCount,
    className,
}: CustomTextInputProps) {
    const currentLength = field.state.value?.length || 0;

    const hasError = field.state.meta.isTouched &&
        Array.isArray(field.state.meta.errors) &&
        field.state.meta.errors &&
        field.state.meta.errors.length > 0;

    const errorMessage = hasError && Array.isArray(field.state.meta.errors)
        ? field.state.meta.errors[0] as string
        : undefined;

    const inputProps = {
        id: id || `field-${field.name}`,
        name: field.name,
        value: field.state.value || '',
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            field.handleChange(e.target.value),
        onBlur: field.handleBlur,
        disabled,
        placeholder,
        maxLength,
        className: cn(
            hasError && "border-red-500 focus-visible:ring-red-500",
            className
        ),
    };

    return (
        <div className="space-y-2">
            {label && (
                <Label
                    htmlFor={inputProps.id}
                    className={cn(hasError && "text-red-500")}
                >
                    {label}
                </Label>
            )}

            {multiline ? (
                <textarea
                    {...inputProps}
                    rows={rows}
                    className={cn(
                        "flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        hasError && "border-red-500 focus-visible:ring-red-500",
                        className
                    )}
                />
            ) : (
                <Input {...inputProps} />
            )}

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

                {showCharCount && (
                    <p className={cn(
                        "text-sm ml-2 shrink-0",
                        maxLength && currentLength >= maxLength * 0.9
                            ? currentLength >= maxLength
                                ? "text-red-500"
                                : "text-yellow-500"
                            : "text-muted-foreground"
                    )}>
                        {currentLength}
                        {maxLength !== undefined ? `/${maxLength}` : ''}
                    </p>
                )}
            </div>
        </div>
    );
}

export default CustomTextInput;