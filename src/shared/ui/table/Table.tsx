import { forwardRef } from 'react'
import clsx from 'clsx'
import './Table.scss'

const TableRoot = forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
    ({ className, ...props }, ref) => (
        <div className="ui-table-wrapper">
            <table ref={ref} className={clsx('ui-table', className)} {...props} />
        </div>
    )
)
TableRoot.displayName = 'Table'

const TableHeader = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => (
        <thead ref={ref} className={clsx('ui-table__header', className)} {...props} />
    )
)
TableHeader.displayName = 'TableHeader'

const TableBody = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => (
        <tbody ref={ref} className={clsx('ui-table__body', className)} {...props} />
    )
)
TableBody.displayName = 'TableBody'

const TableRow = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
    ({ className, ...props }, ref) => (
        <tr ref={ref} className={clsx('ui-table__row', className)} {...props} />
    )
)
TableRow.displayName = 'TableRow'

const TableHead = forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
    ({ className, ...props }, ref) => (
        <th ref={ref} className={clsx('ui-table__head', className)} {...props} />
    )
)
TableHead.displayName = 'TableHead'

const TableCell = forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
    ({ className, ...props }, ref) => (
        <td ref={ref} className={clsx('ui-table__cell', className)} {...props} />
    )
)
TableCell.displayName = 'TableCell'

export {
    TableRoot as Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
}