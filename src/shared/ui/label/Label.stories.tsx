import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './Label'
import {Input} from "../input/Input.tsx";

const meta: Meta<typeof Label> = {
    title: 'Shared/Label',
    component: Label,
    tags: ['autodocs'],
    argTypes: {
        required: {
            control: 'boolean',
            description: 'Adds an asterisk to indicate a mandatory field.'
        },
        htmlFor: {
            control: 'text',
            description: 'The id of the element the label is associated with.'
        },
        children: {
            control: 'text'
        }
    }
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
    args: {
        children: 'Email Address',
        htmlFor: 'email-input'
    },
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Label {...args} />
            <Input placeholder="Enter text..." />
        </div>
    )
}

export const Required: Story = {
    args: {
        children: 'Password',
        required: true,
        htmlFor: 'pass-input'
    },
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Label {...args} />
            <Input placeholder="Enter text..." />
        </div>
    )
}