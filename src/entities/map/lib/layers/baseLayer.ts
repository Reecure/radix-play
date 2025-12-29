import type { Map, FilterSpecification } from 'maplibre-gl';
import type { IMapLayer, IFilterableLayer, LayerConfig } from './types';

export abstract class BaseLayer implements IMapLayer, IFilterableLayer {
    readonly id: string;
    readonly name: string;

    protected map: Map | null = null;
    protected sourceId: string;
    protected visible: boolean;

    constructor(config: LayerConfig) {
        this.id = config.id;
        this.name = config.name;
        this.sourceId = config.sourceId;
        this.visible = config.initialVisibility ?? true;
    }

    protected abstract addSource(map: Map): void;
    protected abstract removeSource(map: Map): void;
    protected abstract getLayerSpec(): Parameters<Map['addLayer']>[0];

    mount(map: Map, beforeId?: string): void {
        if (this.map) {
            console.warn(`Layer ${this.id} is already mounted`);
            return;
        }

        this.map = map;

        if (!map.getSource(this.sourceId)) {
            this.addSource(map);
        }

        const spec = this.getLayerSpec();

        if (beforeId && map.getLayer(beforeId)) {
            map.addLayer(spec, beforeId);
        } else {
            map.addLayer(spec);
        }

        if (!this.visible) {
            this.hide();
        }
    }

    unmount(): void {
        if (!this.map) return;

        if (this.map.getLayer(this.id)) {
            this.map.removeLayer(this.id);
        }

        this.removeSource(this.map);

        this.map = null;
    }

    isActive(): boolean {
        return this.map !== null;
    }

    show(): void {
        if (!this.map) return;

        this.map.setLayoutProperty(this.id, 'visibility', 'visible');
        this.visible = true;
    }

    hide(): void {
        if (!this.map) return;

        this.map.setLayoutProperty(this.id, 'visibility', 'none');
        this.visible = false;
    }

    isVisible(): boolean {
        return this.visible;
    }

    setFilter(filter: FilterSpecification): void {
        if (!this.map) return;
        this.map.setFilter(this.id, filter);
    }

    clearFilter(): void {
        if (!this.map) return;
        this.map.setFilter(this.id, null);
    }
}