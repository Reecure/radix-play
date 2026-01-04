import React from 'react'
import {Input} from "@/shared/ui";

const TableFilter = ({ column }: { column: Column<any, unknown> }) => {
    const columnFilterValue = column.getFilterValue()
    const { filterVariant } = column.columnDef.meta ?? {}

    return filterVariant === 'text' ? (
        <div>
          <Input
              onChange={(value) => column.setFilterValue(value)}
              placeholder={`Search...`}
              type="text"
              value={(columnFilterValue ?? '') as string}
              style={{height: '32px'}}
          />
        </div>
    ) : null
}

export default TableFilter