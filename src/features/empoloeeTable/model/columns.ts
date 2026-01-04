import {createColumnHelper} from "@tanstack/react-table";
import type {Employee} from "@/entities/employee/model/types.ts";
import {getActionsDropdownColumn} from "@/shared/ui/table-tanstack/ui/columns/actionColumn.tsx";

const columnHelper = createColumnHelper<Employee>()

export const getEmployeeColumns = () => {
    return [columnHelper.accessor('id', {
        header: 'ID',
        size: 70
    }),
        columnHelper.accessor('fullName', {
            header: 'Full Name',
            size: 200,
            enableSorting: true,
            meta: {
                filterVariant: 'text',
            },
        }),
        columnHelper.accessor('gender', {
            header: 'Gender',
            size: 80,
            enableSorting: true
        }),
        columnHelper.accessor('age', {
            header: 'Age',
            size: 80,
        }),
        columnHelper.accessor('role', {
            header: 'Role',
            meta: {
                filterVariant: 'text',
            },
        }),
        columnHelper.accessor('city', {
            header: 'City',
        }),
        columnHelper.accessor('salary', {
            header: 'Salary',

        }),
        columnHelper.accessor('hireDate', {
            header: 'Hire Date',

            meta: {
                filterVariant: 'text',
            },
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            meta: {
                filterVariant: 'text',
            },
        }),
        columnHelper.accessor('email', {
            header: 'Email',
        }),
        columnHelper.accessor('isBanned', {
            header: 'Is Banned',
            size: 110
        }),
        columnHelper.accessor('banDate', {
            header: 'Ban Date',
        }),
        columnHelper.accessor('banReason', {
            header: 'Ban Reason',
        }),

        getActionsDropdownColumn<Employee>((emp) => [
            {
                label: "Edit",
                onClick: () => console.log("Edit", emp),
            },
            {
                label: "Ban",
                onClick: () => console.log("Ban", emp),
            },
            {
                label: "Delete",
                onClick: () => console.log("Delete", emp),
                variant: "danger",
            }
        ])
    ]
}