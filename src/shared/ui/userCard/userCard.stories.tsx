import type { Meta, StoryObj } from '@storybook/react'
import UserCard from './userCard.tsx'

const meta: Meta<typeof UserCard> = {
    title: 'Components/UserCard',
    component: UserCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered'
    },
    argTypes: {
        isLoading: {
            control: 'boolean'
        }
    }
}

export default meta
type Story = StoryObj<typeof UserCard>

export const Default: Story = {
    args: {
        name: 'Test Test',
        position: 'Frontend Developer',
        photo: 'https://i.pravatar.cc/150?img=12'
    }
}

export const Loading: Story = {
    args: {
        isLoading: true
    }
}

export const WithoutPhoto: Story = {
    args: {
        name: 'Alex Johnson',
        position: 'Product Designer'
    }
}

export const LongText: Story = {
    args: {
        name: 'Very Long User Name Example',
        position: 'Senior Frontend Engineer with Extra Responsibilities',
        photo: 'https://i.pravatar.cc/150?img=32'
    }
}
