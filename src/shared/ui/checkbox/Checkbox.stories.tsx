import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox.tsx'
import {Label} from "../label/Label.tsx";

const meta: Meta<typeof Checkbox> = {
    title: 'Shared/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Checkbox id="c1" />
            <Label htmlFor="c1">Accept terms</Label>
        </div>
    ),
}

export const Disabled: Story = {
    args: {
        disabled: true,
        checked: true,
    },
}