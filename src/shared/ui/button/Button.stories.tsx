import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
    title: 'Shared/Button',
    component: Button,
    args: {
        children: 'Button',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['solid', 'outline', 'ghost'],
        },
        intent: {
            control: 'select',
            options: ['primary', 'success', 'danger'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        loading: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
}

export default meta
type Story = StoryObj<typeof Button>

export const Playground: Story = {}

export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 12 }}>
            <Button>Solid</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
        </div>
    ),
}

export const Intents: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 12 }}>
            <Button intent="primary">Primary</Button>
            <Button intent="success">Success</Button>
            <Button intent="danger">Danger</Button>
        </div>
    ),
}

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 12 }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
        </div>
    ),
}

export const AsLink: Story = {
    render: () => (
        <Button asChild>
            <a href="#">Link button</a>
        </Button>
    ),
}
