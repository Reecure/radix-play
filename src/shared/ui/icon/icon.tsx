import { forwardRef } from 'react'
import clsx from 'clsx'
import './icon.scss'

export interface IconProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    size?: number | string
    color?: string
    viewBox?: string
}
export const Icon = forwardRef<SVGSVGElement, IconProps>(
    ({ icon: Svg, size = 24, color, className }, ref) => {
        return (
            <Svg
                ref={ref}
                width={size}
                height={size}
                fill="currentColor"
                className={clsx('ui-icon', className)}
                style={{ color }}
            />
        )
    }
)
