import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import type { ButtonVariant, ButtonIntent, ButtonSize } from './types'
import './Button.scss'

type Props = {
    asChild?: boolean
    variant?: ButtonVariant
    intent?: ButtonIntent
    size?: ButtonSize
    loading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
                           asChild,
                           variant = 'solid',
                           intent = 'primary',
                           size = 'md',
                           loading = false,
                           className,
                           disabled,
                           children,
                           ...props
                       }: Props) => {
    const Component = asChild ? Slot : 'button'

    return (
        <Component
            className={clsx(
                'ui-button',
                `ui-button--${variant}`,
                `ui-button--${intent}`,
                `ui-button--${size}`,
                loading && 'is-loading',
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            <span className="ui-button__content">{children}</span>
        </Component>
    )
}
