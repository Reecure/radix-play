import axios from "axios";
import { API_URL } from "../../../shared/config/env";
import type { CreateMonitoredRoute, MonitoredRoute } from "../model/types";

export const routeApi = {
    getAll: async (): Promise<MonitoredRoute[]> => {
        const { data } = await axios.get(`${API_URL}/MonitoredRoutes`);
        return data;
    },

    create: async (payload: CreateMonitoredRoute): Promise<void> => {
        await axios.post(`${API_URL}/MonitoredRoutes`, payload);
    },

    update: async (id: string, payload: Partial<CreateMonitoredRoute>): Promise<void> => {
        await axios.put(`${API_URL}/MonitoredRoutes/${id}`, payload);
    },

    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_URL}/MonitoredRoutes/${id}`);
    }
};