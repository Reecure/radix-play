import * as signalR from "@microsoft/signalr";
import { lerp, lerpAngle } from "./utils";
import type { AnimatedVehicle, Vehicle } from "../types/index.ts";

type Listener = (...args: any[]) => void;

export class VehicleManager {
    private vehicles = new Map<number, AnimatedVehicle>();
    private connection: signalR.HubConnection | null = null;
    private readonly ANIMATION_DURATION = 2000;
    private listeners: Record<string, Listener[]> = {};

    connect() {
        if (this.connection) return;

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5000/hubs/vehicles")
            .withAutomaticReconnect()
            .build();

        this.connection.on("ReceiveVehicles", (data: Vehicle[]) => {
            const now = performance.now();

            console.log("Сars", data);
            data.forEach(v => this.updateVehicle(v, now));
        });

        this.connection.on("ReceiveVehicleUpdate", (update: Vehicle) => {
            this.updateVehicle(update, performance.now());
        });

        this.connection.start().catch(console.error);
    }

    disconnect() {
        if (this.connection) {
            this.connection.stop();
            this.connection = null;
        }
        this.vehicles.clear();
        this.listeners = {};
    }

    private updateVehicle(data: Vehicle, now: number) {
        const existing = this.vehicles.get(data.vehicleId);

        const startPos = existing
            ? this.calculatePosition(existing, now)
            : { lat: data.lat, lng: data.lng, heading: data.heading || 0 };

        this.vehicles.set(data.vehicleId, {
            ...existing,
            ...data,
            startLat: startPos.lat,
            startLng: startPos.lng,
            startHeading: startPos.heading,
            endLat: data.lat,
            endLng: data.lng,
            endHeading: data.heading || 0,
            startTime: now,
            duration: this.ANIMATION_DURATION
        });

        this.emit('update');
    }

    getRenderVehicles(): AnimatedVehicle[] {
        const now = performance.now();
        const results: AnimatedVehicle[] = [];

        this.vehicles.forEach(v => {
            const calculated = this.calculatePosition(v, now);
            v.lat = calculated.lat;
            v.lng = calculated.lng;
            v.heading = calculated.heading;
            results.push(v);
        });

        return results;
    }

    getVehicleById(id: number): AnimatedVehicle | null {
        const vehicle = this.vehicles.get(id);
        if (!vehicle) return null;

        const calculated = this.calculatePosition(vehicle, performance.now());
        return { ...vehicle, ...calculated };
    }

    private calculatePosition(v: AnimatedVehicle, now: number) {
        let t = (now - v.startTime) / v.duration;
        if (t > 1) t = 1;
        if (t < 0) t = 0;

        return {
            lat: lerp(v.startLat, v.endLat, t),
            lng: lerp(v.startLng, v.endLng, t),
            heading: lerpAngle(v.startHeading, v.endHeading, t)
        };
    }

    selectVehicle(id: number | null) {
        this.emit('selectionChange', id);
    }

    on(event: string, fn: Listener) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(fn);
    }

    off(event: string, fn: Listener) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(l => l !== fn);
    }

    private emit(event: string, ...args: any[]) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(fn => fn(...args));
    }
}