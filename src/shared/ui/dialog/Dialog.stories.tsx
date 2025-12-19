import type { Meta, StoryObj } from '@storybook/react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from './Dialog.tsx'
import { Button } from '../index'
import {Input} from "../input/Input.tsx";

const meta: Meta<typeof Dialog> = {
    title: 'Shared/Dialog',
    component: Dialog,

    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Example: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Open Settings</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                    <Input placeholder="Name" />
                    <Input placeholder="Username" />
                </div>

                <DialogFooter>
                    <Button variant="ghost">Cancel</Button>
                    <Button variant={'solid'} type={'submit'}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}