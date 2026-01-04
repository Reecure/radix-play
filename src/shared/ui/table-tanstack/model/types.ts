import type {
    ColumnDef,
    RowSelectionState,
    ColumnResizeMode,
    OnChangeFn,
    ExpandedState, PaginationState, SortingState
} from '@tanstack/react-table'
import type { ReactNode, CSSProperties } from 'react'

export interface CellRenderProps<T> {
    value: unknown
    row: T
    rowIndex: number
}

export interface RowConfig<T> {
    onClick?: (row: T, index: number) => void
    onDoubleClick?: (row: T, index: number) => void
    onHover?: (row: T | null, index: number | null) => void
    getRowClassName?: (row: T, index: number) => string
    getRowStyle?: (row: T, index: number) => CSSProperties
    isRowDisabled?: (row: T) => boolean
}

export interface SelectionConfig<T> {
    enabled: boolean
    enableRowSelection?: (row: T) => boolean
    onSelectionChange?: (selectedRows: T[]) => void
}

export interface DataTableProps<T> {
    data: T[]

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: ColumnDef<T, any>[]

    // Selection
    selection?: SelectionConfig<T>

    // Row behavior
    rowConfig?: RowConfig<T>

    // Resizing
    enableResizing?: boolean
    columnResizeMode?: ColumnResizeMode

    // Styling
    className?: string
    wrapperClassName?: string

    // State (controlled)
    rowSelection?: RowSelectionState
    onRowSelectionChange?: OnChangeFn<RowSelectionState>

    // Empty state
    emptyState?: ReactNode

    // Loading
    isLoading?: boolean
    loadingRows?: number

    expand?: ExpandConfig<T>
    expandedState?: ExpandedState
    onExpandedChange?: OnChangeFn<ExpandedState>

    headerGap?: number

    pagination?: PaginationState
    onPaginationChange?: OnChangeFn<PaginationState>
    totalRows: number

    sorting?: SortingState
    onSortingChange?: OnChangeFn<SortingState>

    isFilterExpanded?: boolean
}

export interface ActionConfig<T> {
    icon?: ReactNode
    label: string
    onClick: (row: T) => void
    disabled?: boolean
    canShow?: boolean
    variant?: 'default' | 'danger'
}

export interface ExpandConfig<T> {
    enabled: boolean
    getSubRows?: (row: T) => T[] | undefined
    renderExpandedContent?: (row: T) => ReactNode
    expandMode?: 'subRows' | 'content' | 'both'
    canExpand?: (row: T) => boolean
    defaultExpanded?: boolean | Record<string, boolean>
    maxDepth?: number
}