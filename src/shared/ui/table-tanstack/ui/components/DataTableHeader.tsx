import { flexRender, type Table } from '@tanstack/react-table'
import SortIcon from "@/shared/assets/icons/sort.svg?react"
import SortDescIcon from "@/shared/assets/icons/sortDesc.svg?react"
import SortAscIcon from "@/shared/assets/icons/sortAsc.svg?react"
import styles from '../dataTable.module.scss'
import {Icon} from "@/shared/ui/icon/icon.tsx";
import TableFilter from "@/shared/ui/table-tanstack/ui/components/TableFilter.tsx";

interface DataTableHeaderProps<T> {
    table: Table<T>
    enableResizing?: boolean
    headerClassName?: string
    isFilterExpanded: boolean
}

export function DataTableHeader<T>({
                                       table,
                                       enableResizing,
                                       headerClassName,
                                       isFilterExpanded
                                   }: DataTableHeaderProps<T>) {
    return (
        <thead className={`${styles.header} ${headerClassName ?? ''}`} style={{marginBottom: '48px'}}>
        {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={`${styles.headerRow} glass`}>
                {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort()
                    const sortDirection = header.column.getIsSorted()
                    const { filterVariant } = header.column.columnDef.meta ?? {}

                    return (
                        <th
                            key={header.id}
                            colSpan={header.colSpan}
                            className={`${styles.headerCell}`}
                            style={{
                                width: header.getSize(),
                            }}
                        >
                            <div
                                className={styles.headerCellContent}
                                onClick={header.column.getToggleSortingHandler()}
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )
                                }


                                {canSort && (
                                    sortDirection === 'asc'
                                        ? <Icon icon={SortAscIcon} size={16} />
                                        : sortDirection === 'desc'
                                            ? <Icon icon={SortDescIcon} size={16} />
                                            : <Icon icon={SortIcon} size={16} />
                                )}
                            </div>
                            {(isFilterExpanded && filterVariant) && <div style={{marginTop: '4px'}}>
                                <TableFilter column={header.column} />
                            </div>}

                            {enableResizing && header.column.getCanResize() && (
                                <div
                                    onDoubleClick={() => header.column.resetSize()}
                                    onMouseDown={header.getResizeHandler()}
                                    onTouchStart={header.getResizeHandler()}
                                    className={`${styles.resizer} ${header.column.getIsResizing() ? styles.isResizing : ''}`}
                                />
                            )}
                        </th>
                    )
                })}
            </tr>
        ))}
        </thead>
    )
}