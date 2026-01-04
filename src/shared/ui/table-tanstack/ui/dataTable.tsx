import * as React from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    type RowSelectionState,
    type ExpandedState, type RowData,
} from '@tanstack/react-table'
import {DataTableHeader} from './components/DataTableHeader'
import {DataTableBody} from './components/DataTableBody'
import {getSelectionColumn} from './columns/selectionColumn'
import {getExpandColumn} from './columns/expandColumn'
import type {DataTableProps} from '../model/types'
import styles from './dataTable.module.scss'
import Paginator from "@/shared/ui/table-tanstack/ui/components/Paginator.tsx";

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: 'text' | 'range' | 'select' | 'calendar'
    }
}

function DataTable<T>({
                          data,
                          columns: userColumns,
                          selection,
                          rowConfig,
                          expand,
                          enableResizing = false,
                          columnResizeMode = 'onChange',
                          className,
                          wrapperClassName,
                          rowSelection: controlledRowSelection,
                          onRowSelectionChange: controlledOnRowSelectionChange,
                          expandedState: controlledExpandedState,
                          onExpandedChange: controlledOnExpandedChange,
                          emptyState,
                          isLoading,
                          loadingRows = 5,
                          headerGap = 0,
                          //pagination
                          pagination,
                          onPaginationChange,
                          totalRows,
                          //sort
                          sorting,
                          onSortingChange,
                          //filters
                          isFilterExpanded = false,
                      }: DataTableProps<T>) {
    const [internalRowSelection, setInternalRowSelection] =
        React.useState<RowSelectionState>({})
    const rowSelection = controlledRowSelection ?? internalRowSelection
    const onRowSelectionChange = controlledOnRowSelectionChange ?? setInternalRowSelection

    const getInitialExpanded = (): ExpandedState => {
        if (expand?.defaultExpanded === undefined) return {}
        if (expand.defaultExpanded === true) return true
        if (expand.defaultExpanded === false) return {}
        return expand.defaultExpanded
    }

    const [internalExpanded, setInternalExpanded] =
        React.useState<ExpandedState>(getInitialExpanded)
    const expanded = controlledExpandedState ?? internalExpanded
    const onExpandedChange = controlledOnExpandedChange ?? setInternalExpanded

    const columns = React.useMemo(() => {
        const cols: typeof userColumns = []

        if (expand?.enabled) {
            cols.push(getExpandColumn<T>())
        }

        if (selection?.enabled) {
            cols.push(getSelectionColumn<T>())
        }

        const processedUserColumns = userColumns.map(col => ({
            ...col,
            enableSorting: col.enableSorting ?? false,
        }))

        cols.push(...processedUserColumns)

        return cols
    }, [userColumns, selection?.enabled, expand?.enabled])

    const table = useReactTable({
        data,
        columns,
        columnResizeMode: enableResizing ? columnResizeMode : undefined,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: expand?.enabled ? getExpandedRowModel() : undefined,
        getSubRows: expand?.getSubRows,

        getRowCanExpand: (row) => {
            if (expand?.canExpand) {
                return expand.canExpand(row.original)
            }
            if (expand?.renderExpandedContent) {
                return true
            }
            const subRows = row.subRows
            return Array.isArray(subRows) && subRows.length > 0
        },

        state: {
            rowSelection,
            expanded,
            pagination,
            sorting,
        },
        onRowSelectionChange,

        onExpandedChange,
        enableRowSelection: selection?.enabled
            ? (row) => selection.enableRowSelection?.(row.original) ?? true
            : false,

        onPaginationChange,
        manualPagination: true,
        rowCount: totalRows,

        onSortingChange,
    })

    return (
        <div className={`${styles.wrapper} ${wrapperClassName ?? ''}`}>
            <div className={styles.tableContainer}>
                <table className={`${styles.table} ${className ?? ''}`}>
                    <DataTableHeader
                        table={table}
                        enableResizing={enableResizing}
                        isFilterExpanded={isFilterExpanded}
                    />
                    <DataTableBody
                        table={table}
                        rowConfig={rowConfig}
                        expand={expand}
                        emptyState={emptyState}
                        isLoading={isLoading}
                        loadingRows={loadingRows}
                        headerGap={headerGap}
                    />
                </table>
            </div>

            {pagination && (
                <Paginator table={table} />
            )}
        </div>
    )
}

export default DataTable