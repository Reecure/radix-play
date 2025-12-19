import {forwardRef} from 'react'
import type {ElementType} from 'react'
import clsx from 'clsx'
import './Text.scss'

type TypographyProps<T extends ElementType> = {
    as?: T
    size?: 'sm' | 'md' | 'lg' | 'h1' | 'h2'
    weight?: 'regular' | 'medium' | 'bold'
    color?: 'primary' | 'secondary' | 'danger'
    children: React.ReactNode
    className?: string
} & React.ComponentPropsWithoutRef<T>

export const Text = forwardRef<HTMLElement, TypographyProps<ElementType>>(
    ({as: Component = 'p', size = 'md', weight = 'regular', color = 'primary', className, ...props}, ref) => {
        return (
            <Component
                ref={ref}
                className={clsx(
                    'ui-text',
                    `ui-text--${size}`,
                    `ui-text--${weight}`,
                    `ui-text--${color}`,
                    className
                )}
                {...props}
            />
        )
    }
)
Text.displayName = 'Text'