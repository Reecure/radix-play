import {useMemo, useState} from "react";
import {useEmployee} from "@/entities/employee/model/useEmployee.ts";
import {type OnChangeFn, type PaginationState, type RowSelectionState, type SortingState} from "@tanstack/react-table";
import DataTable from "@/shared/ui/table-tanstack/ui/dataTable.tsx";
import {Button, Text} from "@/shared/ui";
import {getEmployeeColumns} from "@/features/empoloeeTable/model/columns.ts";
import styles from './emploeeTable.module.scss';

const EmploeeTable = () => {
    const [isFiltersExpanded, setIsFiltersExpanded] = useState(false)
    const [selectedRowIds, setSelectedRowIds] = useState<RowSelectionState>({})
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 30,
    })
    const [sorting, setSorting] = useState<SortingState>([])

    const {data, isLoading} = useEmployee({
        page: pagination.pageIndex,
        size: pagination.pageSize,
        sortBy: sorting[0]?.id,

        isAscending: sorting.length > 0 ? !sorting[0].desc : undefined
    })

    const columns = useMemo(() => getEmployeeColumns(), [])

    const handlePaginationChange = (updater: OnChangeFn<PaginationState>) => {
        setPagination(updater);
        setSelectedRowIds({});
    }

    const handleSortChange = (updater: OnChangeFn<SortingState>) => {
        setSorting(updater);
        setPagination({
            pageIndex: 0,
            pageSize: 30,
        });
    }

    const handleFiltersExpand = () => setIsFiltersExpanded(prev => !prev)

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            flex: 1,
            minHeight: 0,
            overflow: 'hidden'
        }}>
            <div className={`${styles.header}`}>
                <div className={`${styles.titleWrapper}`}>
                    <Text size={"h1"}>Employees</Text>
                    <Button size={'sm'} onClick={handleFiltersExpand}>Filters</Button>
                </div>

                <div className={`${styles.actionsWrapper}`}>
                    {
                        Object.keys(selectedRowIds).length > 0 && <>
                            <Button size={'sm'} variant={'outline'} intent={"danger"}>Ban</Button>
                            <Button size={'sm'} variant={'outline'} intent={"danger"}>Delete</Button>
                        </>
                    }

                    <Button size={'sm'}>Add</Button>
                </div>
            </div>
            <DataTable
                isLoading={isLoading}
                columns={columns}
                data={data?.items ?? []}
                headerGap={12}
                selection={{
                    enabled: true
                }}
                rowSelection={selectedRowIds}
                onRowSelectionChange={setSelectedRowIds}
                sorting={sorting}
                onSortingChange={handleSortChange}
                totalRows={data?.totalCount ?? 0}
                pagination={pagination}
                onPaginationChange={handlePaginationChange}
                isFilterExpanded={isFiltersExpanded}
            />
        </div>
    )
}
export default EmploeeTable
