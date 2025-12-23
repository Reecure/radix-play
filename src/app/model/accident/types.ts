export interface AccidentRecord {
    id: number;
    occurredAt: string; //"yyyy-MM-dd HH:mm:ss"
    district: string;
    region: string;
    severity: number;
    latitude: number;
    longitude: number;
    accidentType: string;
    casualties: number;
    vehiclesInvolved: number;
    weather: string;
    source: string;
}

export interface AccidentResponse {
    type: "FeatureCollection";
    features: AccidentRecord[];
}