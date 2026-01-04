import type {ColumnDef, RowData} from '@tanstack/react-table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/ui/dropdown/Dropdown.tsx";
import styles from "@/features/monitoredRoute/ui/monitoredRoutesList/monitoredRoutesList.module.scss";
import {Icon} from "@/shared/ui/icon/icon.tsx";
import DotsIcon from "../../../../../shared/assets/icons/dots.svg?react";

export type ActionConfig<T> = {
    icon?: React.ReactNode
    label: string
    disabled?: boolean
    canShow?: boolean
    onClick: (row: T) => void
}

export function getActionsDropdownColumn<T extends RowData>(
    getActions: (row: T) => ActionConfig<T>[]
): ColumnDef<T, unknown> {
    return {
        id: 'actions',
        size: 90,
        enableResizing: false,
        header: () => 'Actions',
        meta: {
            sticky: 'right',
        },
        cell: ({row}) => {
            const actions = getActions(row.original)
                .filter(action => action.canShow !== false)

            if (actions.length === 0) return null

            return (
                <div onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className={styles.actionBtn}
                                type="button"
                            >
                                <Icon
                                    icon={DotsIcon}
                                    size={20}
                                />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass">
                            {
                                actions.map((action, i) => (
                                    <DropdownMenuItem
                                        key={`${action.label}-${i}`}
                                        disabled={action?.disabled || false}
                                        onClick={() => action.onClick(row.original)}>
                                        {action.label}
                                    </DropdownMenuItem>
                                ))
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    }
}