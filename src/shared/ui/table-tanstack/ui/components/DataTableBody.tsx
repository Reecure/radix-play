import { flexRender, type Table, type Row } from '@tanstack/react-table'
import type { RowConfig, ExpandConfig } from '../../model/types'
import type { ReactNode } from 'react'
import styles from '../dataTable.module.scss'

interface DataTableBodyProps<T> {
    table: Table<T>
    rowConfig?: RowConfig<T>
    expand?: ExpandConfig<T>
    emptyState?: ReactNode
    isLoading?: boolean
    loadingRows?: number
    headerGap?: number
}

export function DataTableBody<T>({
                                     table,
                                     rowConfig,
                                     expand,
                                     emptyState,
                                     isLoading,
                                     loadingRows = 5,
                                     headerGap = 0,
                                 }: DataTableBodyProps<T>) {
    const rows = table.getRowModel().rows
    const columns = table.getVisibleLeafColumns()
    const columnCount = columns.length

    const spacerRow = headerGap > 0 ? (
        <tr className={styles.spacerRow} style={{ height: headerGap }}>
            <td colSpan={columnCount} />
        </tr>
    ) : null

    if (isLoading) {
        return (
            <tbody className={styles.body}>
            {spacerRow}
            {Array.from({ length: loadingRows }).map((_, i) => (
                <tr key={`skeleton-${i}`} className={styles.row}>
                    {Array.from({ length: columnCount }).map((_, j) => (
                        <td key={`skeleton-${i}-${j}`} className={styles.cell}>
                            <div className={styles.skeleton} />
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        )
    }

    if (rows.length === 0) {
        return (
            <tbody className={styles.body}>
            {spacerRow}
            <tr>
                <td colSpan={columnCount} className={styles.emptyCell}>
                    {emptyState ?? 'Немає даних'}
                </td>
            </tr>
            </tbody>
        )
    }

    return (
        <tbody className={styles.body}>
        {spacerRow}
        {rows.map((row, index) => (
            <DataTableRow
                key={row.id}
                row={row}
                index={index}
                columnCount={columnCount}
                rowConfig={rowConfig}
                expand={expand}
            />
        ))}
        </tbody>
    )
}

interface DataTableRowProps<T> {
    row: Row<T>
    index: number
    columnCount: number
    rowConfig?: RowConfig<T>
    expand?: ExpandConfig<T>
}

function DataTableRow<T>({
                             row,
                             index,
                             columnCount,
                             rowConfig,
                             expand,
                         }: DataTableRowProps<T>) {
    const original = row.original
    const isDisabled = rowConfig?.isRowDisabled?.(original)
    const customClassName = rowConfig?.getRowClassName?.(original, index)
    const customStyle = rowConfig?.getRowStyle?.(original, index)
    const isExpanded = row.getIsExpanded()
    const depth = row.depth

    const showExpandedContent =
        isExpanded &&
        expand?.renderExpandedContent &&
        (expand.expandMode === 'content' || expand.expandMode === 'both' || !expand.getSubRows)

    return (
        <>
            <tr
                className={`
                    ${styles.row} ${isDisabled && styles.disabled}
                    ${rowConfig?.onClick && styles.clickable} 
                    ${isExpanded && styles.expanded} 
                    ${depth > 0 && styles.subRow} 
                    ${customClassName}
                    `
                }
                style={{
                    ...customStyle,
                    '--row-depth': depth,
                } as React.CSSProperties}
                data-depth={depth}
                onClick={() => {
                    if (!isDisabled) {
                        rowConfig?.onClick?.(original, index)
                    }
                }}
                onDoubleClick={() => {
                    if (!isDisabled) {
                        rowConfig?.onDoubleClick?.(original, index)
                    }
                }}
                onMouseEnter={() => rowConfig?.onHover?.(original, index)}
                onMouseLeave={() => rowConfig?.onHover?.(null, null)}
            >
                {row.getVisibleCells().map((cell, cellIndex) => {
                    const meta = cell.column.columnDef.meta as { sticky?: 'left' | 'right' } | undefined
                    const stickyClass = meta?.sticky === 'left'
                        ? styles.stickyLeft
                        : meta?.sticky === 'right'
                            ? styles.stickyRight
                            : ''

                    return (
                        <td key={cell.id} className={`${styles.cell} ${stickyClass}`}
                            style={{
                                paddingLeft: cellIndex === 0 && depth > 0
                                    ? `${2 + depth * 12}px`
                                    : undefined
                            }}
                        >
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}
                        </td>
                    )
                })}
            </tr>

            {showExpandedContent && (
                <tr className={styles.expandedContentRow}>
                    <td colSpan={columnCount} className={styles.expandedContentCell}>
                        <div className={styles.expandedContent}>
                            {expand.renderExpandedContent!(original)}
                        </div>
                    </td>
                </tr>
            )}
        </>
    )
}