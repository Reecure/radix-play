import type { ColumnDef, RowData } from '@tanstack/react-table'
import {Button} from "@/shared/ui";

interface ExpandColumnOptions {
    showOnlyIfExpandable?: boolean
}

export function getExpandColumn<T extends RowData>(
    options?: ExpandColumnOptions
): ColumnDef<T, unknown> {
    return {
        id: 'expand',
        size: 50,
        minSize: 50,
        maxSize: 50,
        enableResizing: false,
        meta: {
            isFixed: true,
            className: 'columnFixed',
        },
        header: () => null,
        cell: ({ row }) => {
            const canExpand = row.getCanExpand()
            const isExpanded = row.getIsExpanded()

            if (options?.showOnlyIfExpandable && !canExpand) {
                return null
            }

            return (
                <Button
                    variant="ghost"
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation()
                        row.toggleExpanded()
                    }}
                    disabled={!canExpand}
                    style={{transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'}}
                >
                    {">"}
                </Button>
            )
        },
    }
}