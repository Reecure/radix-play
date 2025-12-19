import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
    title: 'Shared/Typography',
    component: Text,
    tags: ['autodocs'],
    argTypes: {
        as: {
            control: 'select',
            options: ['p', 'span', 'div', 'h1', 'h2', 'label', 'a'],
            description: 'The HTML tag to render.'
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'h1', 'h2'],
        },
        weight: {
            control: 'inline-radio',
            options: ['regular', 'medium', 'bold'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'danger'],
        },
        align: {
            control: 'inline-radio',
            options: ['left', 'center', 'right'],
        }
    }
}

export default meta
type Story = StoryObj<typeof Text>

export const Playground: Story = {
    args: {
        children: 'The quick brown fox jumps over the lazy dog',
        size: 'md',
        color: 'primary',
    },
}

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Text size="h1" as="h1">Heading 1 (h1)</Text>
            <Text size="h2" as="h2">Heading 2 (h2)</Text>
            <Text size="lg">Large Text (lg)</Text>
            <Text size="md">Medium Text (md) - Default</Text>
            <Text size="sm">Small Text (sm)</Text>
        </div>
    ),
}

export const Colors: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Text color="primary">Primary Color</Text>
            <Text color="secondary">Secondary Color</Text>
            <Text color="danger">Danger Color</Text>
        </div>
    ),
}

export const Weights: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Text weight="regular">Regular Weight (400)</Text>
            <Text weight="medium">Medium Weight (500)</Text>
            <Text weight="bold">Bold Weight (700)</Text>
        </div>
    ),
}