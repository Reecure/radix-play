import type { Meta, StoryObj } from '@storybook/react'
import { Input, Textarea } from './Input.tsx'

const meta: Meta<typeof Input> = {
    title: 'Shared/Input',
    component: Input,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
    args: {
        placeholder: 'Enter text...',
    },
}

export const WithError: Story = {
    args: {
        placeholder: 'Error state',
        error: true,
    },
}

export const Disabled: Story = {
    args: {
        placeholder: 'Disabled input',
        disabled: true,
    },
}

export const TextArea: Story = {
    render: (args) => <Textarea {...(args as any)} placeholder="Type your message..." />,
}