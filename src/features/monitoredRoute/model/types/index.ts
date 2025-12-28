export interface MonitoredRoute {
    id: string; // Guid
    name: string;
    originLatitude: number;
    originLongitude: number;
    destinationLatitude: number;
    destinationLongitude: number;
    isActive: boolean;
    startTime: string;       // DateTime (ISO string)
    endTime: string;         // DateTime (ISO string)
    nextRunAtUtc: string;    // DateTime (UTC ISO string)
}

export interface CreateMonitoredRoute extends Omit<MonitoredRoute, "id" | "nextRunAtUtc"> {}