import * as LabelPrimitive from '@radix-ui/react-label'
import { forwardRef } from 'react'
import clsx from 'clsx'
import './Label.scss'

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
    required?: boolean
}

export const Label = forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
    ({ className, required, children, ...props }, ref) => (
        <LabelPrimitive.Root
            ref={ref}
            className={clsx('ui-label', className)}
            data-required={required}
            {...props}
        >
            {children}
        </LabelPrimitive.Root>
    )
)
Label.displayName = 'Label'