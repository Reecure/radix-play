import type {
    GeoJSONSourceSpecification,
    VectorSourceSpecification,
    RasterSourceSpecification,
} from 'maplibre-gl';

export type SourceSpecification =
    | GeoJSONSourceSpecification
    | VectorSourceSpecification
    | RasterSourceSpecification;

export interface SourceConfig {
    id: string;
    spec: SourceSpecification;
}