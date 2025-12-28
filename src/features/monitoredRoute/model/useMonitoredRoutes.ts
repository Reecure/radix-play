import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { routeApi } from "../api/monitoredRouteApi.ts";
import type { CreateMonitoredRoute } from "./types";

export const useMonitoredRoutes = () => {
    return useQuery({
        queryKey: ['monitoredRoutes'],
        queryFn: routeApi.getAll,
        staleTime: 0,
    });
};

export const useRouteMutations = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ['monitoredRoutes'] });

    const createMutation = useMutation({
        mutationFn: routeApi.create,
        onSuccess: () => {
            invalidate();
            onSuccess?.();
        }
    });

    const deleteMutation = useMutation({
        mutationFn: routeApi.delete,
        onSuccess: () => invalidate()
    });

    const updateMutation = useMutation({
        mutationFn: ({id, data}: {id: string, data: Partial<CreateMonitoredRoute>}) => routeApi.update(id, data),
        onSuccess: () => {
            invalidate();
            onSuccess?.();
        }
    });

    return { createMutation, deleteMutation, updateMutation };
};