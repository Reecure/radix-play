import axios from "axios";
import {API_URL} from "@/shared/config/environment/env.ts";
import type {Employee, EmployeeQuery, PagedResult} from "@/entities/employee/model/types.ts";

export const EmployeeApi = {
    getAll: async ({size, page, isAscending, sortBy} : EmployeeQuery): Promise<PagedResult<Employee>> => {
        const params = new URLSearchParams();

        params.append('Size', String(size));
        params.append('Page', String(page));

        if (sortBy !== undefined) {
            params.append('sortBy', sortBy);
        }
        if (isAscending !== undefined) {
            params.append('IsAscending', String(isAscending));
        }

        const { data } = await axios.get(`${API_URL}/api/Employees?${params.toString()}`);
        return data;
    },

    getById: async (id: number): Promise<PagedResult<Employee>> => {
        const { data } = await axios.get(`${API_URL}/api/Employees/${id}`);
        return data;
    },

    create: async (payload: Employee): Promise<void> => {
        await axios.post(`${API_URL}/api/Employees`, payload);
    },

    update: async (id: number, payload: Partial<Employee>): Promise<void> => {
        await axios.put(`${API_URL}/api/Employees/${id}`, payload);
    },

    delete: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/api/Employees/${id}`);
    },

    ban: async (id: number): Promise<void> => {
        await axios.post(`${API_URL}/api/Employees/${id}/ban`);
    },

    unban: async (id: number): Promise<void> => {
        await axios.post(`${API_URL}/api/Employees/${id}/unban`);
    }
};