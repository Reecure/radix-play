import { forwardRef } from 'react'
import clsx from 'clsx'
import './Input.scss'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={clsx('ui-input', className)}
                data-invalid={error}
                {...props}
            />
        )
    }
)
Input.displayName = 'Input'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={clsx('ui-textarea', className)}
                data-invalid={error}
                {...props}
            />
        )
    }
)
Textarea.displayName = 'Textarea'