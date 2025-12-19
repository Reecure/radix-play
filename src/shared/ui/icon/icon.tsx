import { forwardRef, type ReactNode } from 'react'
import clsx from 'clsx'
import './icon.scss'

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
    icon: ReactNode
    size?: number | string
    color?: string
    viewBox?: string
}
export const Icon = forwardRef<SVGSVGElement, IconProps>(
    ({ icon, size = 24, color, viewBox = '0 0 25 25', className, style, ...props }, ref) => {
        return (
            <svg
                ref={ref}
                width={size}
                height={size}
                viewBox={viewBox}
                className={clsx('ui-icon', className)}
                style={{ color, ...style }}
                {...props}
            >
                {icon}
            </svg>
        )
    }
)
