import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { forwardRef } from 'react'
import clsx from 'clsx'
import './Checkbox.scss'

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" className="ui-checkbox__icon">
        <polyline points="20 6 9 17 4 12" />
    </svg>
)

export const Checkbox = forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={clsx('ui-checkbox', className)}
        {...props}
    >
        <CheckboxPrimitive.Indicator className="ui-checkbox__indicator">
            <CheckIcon />
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName