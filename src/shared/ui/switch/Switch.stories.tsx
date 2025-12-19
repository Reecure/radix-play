import type {Meta, StoryObj} from '@storybook/react'
import {Switch} from './Switch.tsx'
import {Label} from "../label/Label.tsx";

const meta: Meta<typeof Switch> = {
    title: 'Shared/Switch',
    component: Switch,
    tags: ['autodocs'],
    argTypes: {
        checked: {control: 'boolean'},
        disabled: {control: 'boolean'},
        onCheckedChange: {action: 'toggled'}
    }
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
    render: (args: any) => (
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <Label htmlFor="s1">Notifications</Label>
            <Switch id="s1" {...args} />
        </div>
    )
}