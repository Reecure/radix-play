import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from './Calendar.tsx'
import { useState } from 'react'

const meta: Meta<typeof Calendar> = {
    title: 'Shared/Calendar',
    component: Calendar,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>(new Date())

        return (
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
            />
        )
    }
}