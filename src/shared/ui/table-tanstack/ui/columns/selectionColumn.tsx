import type {ColumnDef, RowData} from '@tanstack/react-table';
import {Checkbox} from "@/shared/ui";

export function getSelectionColumn<T extends RowData>(): ColumnDef<T, unknown> {
    return {
        id: 'select',
        size: 60,
        minSize: 60,
        maxSize: 60,
        enableResizing: false,
        meta: {
            isFixed: true,
            className: 'columnFixed',
        },
        header: ({table}) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <Checkbox
                    checked={
                        table.getIsAllRowsSelected()
                            ? true
                            : table.getIsSomeRowsSelected()
                                ? 'indeterminate'
                                : false
                    }
                    onCheckedChange={(checked) => {
                        table.toggleAllRowsSelected(!!checked)
                    }}
                />
            </div>
        ),
        cell: ({row}) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <Checkbox
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onCheckedChange={(checked) => {
                        row.toggleSelected(!!checked)
                    }}
                />
            </div>
        ),
    }
}