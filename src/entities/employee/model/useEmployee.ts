import {useQuery} from "@tanstack/react-query";
import {EmployeeApi} from "@/entities/employee/api/employeeApi.ts";
import type {EmployeeQuery} from "@/entities/employee/model/types.ts";

export const useEmployee = ({ page, size, isAscending, sortBy }: EmployeeQuery) => {
    return useQuery({
        queryKey: ['employees', page, size, sortBy, isAscending],
        queryFn: () => EmployeeApi.getAll({
            page: page + 1,
            size,
            isAscending,
            sortBy
        }),
        staleTime: 0,
    });
};
