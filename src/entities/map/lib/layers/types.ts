import type { Map, LayerSpecification, FilterSpecification } from 'maplibre-gl';

export interface IMapLayer {
    readonly id: string;
    readonly name: string;

    // Lifecycle
    mount(map: Map, beforeId?: string): void;
    unmount(): void;
    isActive(): boolean;

    // Visibility
    show(): void;
    hide(): void;
    isVisible(): boolean;
}

export interface IDataLayer<T = unknown> extends IMapLayer {
    setData(data: T): void;
}

export interface IFilterableLayer extends IMapLayer {
    setFilter(filter: FilterSpecification): void;
    clearFilter(): void;
}

export interface IInteractiveLayer extends IMapLayer {
    setCursor(cursor: string): void;
}

export interface LayerConfig {
    id: string;
    name: string;
    sourceId: string;
    layerSpec: Omit<LayerSpecification, 'id' | 'source'>;
    initialVisibility?: boolean;
}