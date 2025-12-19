import { forwardRef } from 'react'
import clsx from 'clsx'
import './Skeleton.scss'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'text' | 'rectangular' | 'circular'
    width?: string | number
    height?: string | number
    animation?: boolean
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
    ({
         className,
         variant = 'text',
         width,
         height,
         animation = true,
         style,
         ...props
     }, ref) => {

        const getStyleValue = (val?: string | number) => {
            if (val === undefined) return undefined
            return typeof val === 'number' ? `${val}px` : val
        }

        return (
            <div
                ref={ref}
                className={clsx(
                    'ui-skeleton',
                    `ui-skeleton--${variant}`,
                    animation && 'ui-skeleton--animate',
                    className
                )}
                style={{
                    width: getStyleValue(width),
                    height: getStyleValue(height),
                    ...style
                }}
                {...props}
            />
        )
    }
)
Skeleton.displayName = 'Skeleton'