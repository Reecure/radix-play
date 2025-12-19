import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem } from './RadioGroup.tsx'
import {Label} from "../label/Label.tsx";

const meta: Meta<typeof RadioGroup> = {
    title: 'Shared/RadioGroup',
    component: RadioGroup,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Example: Story = {
    render: () => (
        <RadioGroup defaultValue="default">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Default</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Comfortable</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <RadioGroupItem value="compact" id="r3" />
                <Label htmlFor="r3">Compact</Label>
            </div>
        </RadioGroup>
    ),
}