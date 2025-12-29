import type { Map as MaplibreMap } from 'maplibre-gl';
import type { IMapLayer } from './types';

type LayerEventType = 'registered' | 'unregistered' | 'visibility-changed';
type LayerEventHandler = (layerId: string) => void;

class LayerRegistry {
    private layers = new Map<string, IMapLayer>();
    private order: string[] = [];
    private listeners = new Map<LayerEventType, Set<LayerEventHandler>>();

    register(layer: IMapLayer): void {
        if (this.layers.has(layer.id)) {
            console.warn(`Layer "${layer.id}" is already registered`);
            return;
        }

        this.layers.set(layer.id, layer);
        this.order.push(layer.id);
        this.emit('registered', layer.id);
    }

    unregister(id: string): void {
        const layer = this.layers.get(id);
        if (!layer) return;

        if (layer.isActive()) {
            layer.unmount();
        }

        this.layers.delete(id);
        this.order = this.order.filter((i) => i !== id);
        this.emit('unregistered', id);
    }

    get(id: string): IMapLayer | undefined {
        return this.layers.get(id);
    }

    has(id: string): boolean {
        return this.layers.has(id);
    }

    getAll(): IMapLayer[] {
        return this.order.map((id) => this.layers.get(id)!);
    }

    getVisible(): IMapLayer[] {
        return this.getAll().filter((layer) => layer.isVisible());
    }

    // Масові операції
    mountAll(map: MaplibreMap): void {
        this.order.forEach((id, index) => {
            const layer = this.layers.get(id)!;
            const beforeId = this.order[index + 1];

            if (!layer.isActive()) {
                layer.mount(map, beforeId);
            }
        });
    }

    unmountAll(): void {
        this.layers.forEach((layer) => {
            if (layer.isActive()) {
                layer.unmount();
            }
        });
    }

    showAll(): void {
        this.layers.forEach((layer) => {
            layer.show();
            this.emit('visibility-changed', layer.id);
        });
    }

    hideAll(): void {
        this.layers.forEach((layer) => {
            layer.hide();
            this.emit('visibility-changed', layer.id);
        });
    }

    toggleVisibility(id: string): void {
        const layer = this.layers.get(id);
        if (!layer) return;

        if (layer.isVisible()) {
            layer.hide();
        } else {
            layer.show();
        }

        this.emit('visibility-changed', id);
    }

    reorder(newOrder: string[]): void {
        const valid = newOrder.every((id) => this.layers.has(id));
        if (!valid) {
            console.warn('Invalid layer order: some IDs do not exist');
            return;
        }

        this.order = newOrder;
    }

    moveToTop(id: string): void {
        if (!this.layers.has(id)) return;

        this.order = this.order.filter((i) => i !== id);
        this.order.push(id);
    }

    moveToBottom(id: string): void {
        if (!this.layers.has(id)) return;

        this.order = this.order.filter((i) => i !== id);
        this.order.unshift(id);
    }

    on(event: LayerEventType, handler: LayerEventHandler): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(handler);
    }

    off(event: LayerEventType, handler: LayerEventHandler): void {
        this.listeners.get(event)?.delete(handler);
    }

    private emit(event: LayerEventType, layerId: string): void {
        this.listeners.get(event)?.forEach((handler) => handler(layerId));
    }
}

export const layerRegistry = new LayerRegistry();

export function useLayerRegistry() {
    return layerRegistry;
}