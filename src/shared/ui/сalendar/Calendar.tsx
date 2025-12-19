import { DayPicker } from 'react-day-picker'
import clsx from 'clsx'
import 'react-day-picker/dist/style.css'
import './Calendar.scss'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export const Calendar = ({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) => {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={clsx('ui-calendar', className)}
            classNames={{
                ...classNames,
            }}
            {...props}
        />
    )
}