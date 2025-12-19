import type { Meta, StoryObj } from '@storybook/react'
import EconometricsIcon from '../../assets/icons/econometrics.svg?react'
import {Icon} from "./icon.tsx";

const meta: Meta<typeof Icon> = {
    title: 'Shared/Icon',
    component: Icon,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        size: {
            control: { type: 'number', min: 12, max: 64 }
        },
        color: {
            control: 'color'
        }
    }
}

export default meta
type Story = StoryObj<typeof Icon>

export const Settings: Story = {
    args: {
        icon: <EconometricsIcon />,
        size: 24
    }
}

export const BrandColor: Story = {
    args: {
        icon: <EconometricsIcon />,
        size: 32,
        style: { color: 'var(--color-brand-600)' }
    }
}
