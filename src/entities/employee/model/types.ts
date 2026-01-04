export interface Employee {
    id: number;
    fullName: string;
    gender: 'M' | 'F' | string;
    age: number;
    role: string;
    city: string;
    salary: number;
    hireDate: string;
    status: string;
    email: string;

    isBanned: boolean;
    banDate?: string | null;
    banReason?: string | null;
}

export interface PagedResult<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}

export interface EmployeeQuery {
    page: number;
    size: number;
    search?: string;
    sortBy?: string;
    isAscending?: boolean;
    showBanned?: boolean;
}