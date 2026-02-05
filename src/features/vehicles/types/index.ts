export interface Vehicle {
    vehicleId: number;
    lat: number;
    lng: number;
    speed: number;
    number: string;
    heading: number;
}

export interface AnimatedVehicle extends Vehicle {
    startLat: number;
    startLng: number;
    startHeading: number;

    endLat: number;
    endLng: number;
    endHeading: number;

    startTime: number;
    duration: number;
}