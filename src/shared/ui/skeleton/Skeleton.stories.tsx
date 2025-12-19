import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton.tsx'

const meta: Meta<typeof Skeleton> = {
    title: 'Shared/Skeleton',
    component: Skeleton,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['text', 'rectangular', 'circular'],
        },
        animation: {
            control: 'boolean',
        },
        width: { control: 'text' },
        height: { control: 'text' },
    },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
    args: {
        variant: 'text',
        width: 200,
        height: 20,
    },
}

export const ProfileCardExample: Story = {
    render: () => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: 20,
            border: '1px solid #eee',
            borderRadius: 8,
            maxWidth: 400
        }}>
            <Skeleton variant="circular" width={50} height={50} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                <Skeleton variant="text" height={16} width="80%" />
                <Skeleton variant="text" height={12} width="100%" />
            </div>
        </div>
    )
}

export const ContentCardExample: Story = {
    render: () => (
        <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Skeleton variant="rectangular" height={180} width="100%" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Skeleton variant="text" height={20} width="90%" />
                <Skeleton variant="text" height={14} width="60%" />
            </div>
        </div>
    )
}

export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
                <p style={{marginBottom: 5, fontSize: 12, color: '#666'}}>Text (Default)</p>
                <Skeleton variant="text" width={200} />
            </div>
            <div>
                <p style={{marginBottom: 5, fontSize: 12, color: '#666'}}>Circular (Avatar)</p>
                <Skeleton variant="circular" width={50} height={50} />
            </div>
            <div>
                <p style={{marginBottom: 5, fontSize: 12, color: '#666'}}>Rectangular (Image)</p>
                <Skeleton variant="rectangular" width={200} height={100} />
            </div>
        </div>
    )
}