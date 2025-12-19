import * as SwitchPrimitive from '@radix-ui/react-switch'
import { forwardRef } from 'react'
import clsx from 'clsx'
import './Switch.scss'

export const Switch = forwardRef<
    React.ElementRef<typeof SwitchPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
    <SwitchPrimitive.Root
        className={clsx('ui-switch', className)}
        {...props}
        ref={ref}
    >
        <SwitchPrimitive.Thumb className="ui-switch__thumb" />
    </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName