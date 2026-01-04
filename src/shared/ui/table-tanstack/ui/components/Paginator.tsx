import styles from "@/shared/ui/table-tanstack/ui/dataTable.module.scss";
import * as React from "react";
import type {Table} from "@tanstack/react-table";
import type {FC} from "react";

interface Props<T> {
    table: Table<T>
}

//TODO: redesign + refactor
const Paginator: FC<Props> = ({table}) => {
    return (
        <div className={styles.pagination}>
            <div className={styles.paginationButtons}>
                <button
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
            </div>

            <span className={styles.paginationInfo}>
                        Сторінка{' '}
                <strong>
                            {table.getState().pagination.pageIndex + 1} з {table.getPageCount() || 1}
                        </strong>
                    </span>
        </div>
    )
}
export default Paginator
