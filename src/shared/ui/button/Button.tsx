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
    const isDisabled = disabled || loading

    const classes = clsx(
        'ui-button',
        `ui-button--${variant}`,
        `ui-button--${intent}`,
        `ui-button--${size}`,
        loading && 'is-loading',
        className
    )

    if (asChild) {
        return (
            <Slot
                className={classes}
                aria-disabled={isDisabled || undefined}
                data-disabled={isDisabled || undefined}
                {...props}
            >
                {children}
            </Slot>
        )
    }

    return (
        <button
            className={classes}
            disabled={isDisabled}
            {...props}
        >
            <span className="ui-button__content">{children}</span>
        </button>
    )
}