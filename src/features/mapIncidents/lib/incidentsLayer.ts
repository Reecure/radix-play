// features/mapIncidents/lib/IncidentsLayer.ts

import type { Map as MaplibreMap, GeoJSONSource } from 'maplibre-gl';
import { BaseLayer, type FeatureCollection, type IDataLayer } from '../../../entities/map';

export class IncidentsLayer extends BaseLayer implements IDataLayer<FeatureCollection> {
    private data: FeatureCollection = { type: 'FeatureCollection', features: [] };
    private clustersLayerId: string;
    private clusterCountLayerId: string;

    constructor() {
        super({
            id: 'incidents',
            name: 'Інциденти',
            sourceId: 'incidents-source',
            initialVisibility: true,
        });

        this.clustersLayerId = `${this.id}-clusters`;
        this.clusterCountLayerId = `${this.id}-cluster-count`;
    }

    protected addSource(map: MaplibreMap): void {
        map.addSource(this.sourceId, {
            type: 'geojson',
            data: this.data,
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50,
        });
    }

    protected removeSource(map: MaplibreMap): void {
        if (map.getSource(this.sourceId)) {
            map.removeSource(this.sourceId);
        }
    }

    protected getLayerSpec() {
        // Некластеризовані точки
        return {
            id: this.id,
            source: this.sourceId,
            type: 'circle' as const,
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-radius': 10,
                'circle-color': [
                    'match',
                    ['get', 'severity'],
                    'low', '#22c55e',
                    'medium', '#eab308',
                    'high', '#f97316',
                    'critical', '#ef4444',
                    '#3b82f6'
                ],
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
            },
        };
    }

    mount(map: MaplibreMap, beforeId?: string): void {
        if (this.map) {
            console.warn(`Layer ${this.id} is already mounted`);
            return;
        }

        this.map = map;

        if (!map.getSource(this.sourceId)) {
            this.addSource(map);
        }

        // 1. Шар кластерів
        map.addLayer({
            id: this.clustersLayerId,
            type: 'circle',
            source: this.sourceId,
            filter: ['has', 'point_count'],
            paint: {
                'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    '#3b82f6',
                    10, '#8b5cf6',
                    30, '#f97316',
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    20,
                    10, 25,
                    30, 30,
                ],
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
            },
        }, beforeId);

        // 2. Текст кількості в кластері
        map.addLayer({
            id: this.clusterCountLayerId,
            type: 'symbol',
            source: this.sourceId,
            filter: ['has', 'point_count'],
            layout: {
                'text-field': ['get', 'point_count_abbreviated'],
                'text-size': 12,
            },
            paint: {
                'text-color': '#ffffff',
            },
        }, beforeId);

        // 3. Некластеризовані точки
        const spec = this.getLayerSpec();
        map.addLayer(spec, beforeId);

        // Клік на кластер — zoom in
        map.on('click', this.clustersLayerId, this.handleClusterClick);
        map.on('mouseenter', this.clustersLayerId, this.handleMouseEnter);
        map.on('mouseleave', this.clustersLayerId, this.handleMouseLeave);

        if (!this.visible) {
            this.hide();
        }
    }

    private handleClusterClick = (e: maplibregl.MapLayerMouseEvent) => {
        const map = this.map;
        if (!map) return;

        const features = map.queryRenderedFeatures(e.point, {
            layers: [this.clustersLayerId]
        });

        if (!features.length) return;

        const clusterId = features[0].properties?.cluster_id;
        const source = map.getSource(this.sourceId) as GeoJSONSource;

        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            map.easeTo({
                center: (features[0].geometry as GeoJSON.Point).coordinates as [number, number],
                zoom: zoom ?? map.getZoom() + 2,
            });
        });
    };

    private handleMouseEnter = () => {
        if (this.map) {
            this.map.getCanvas().style.cursor = 'pointer';
        }
    };

    private handleMouseLeave = () => {
        if (this.map) {
            this.map.getCanvas().style.cursor = '';
        }
    };

    unmount(): void {
        if (!this.map) return;

        // Відписуємось від подій
        this.map.off('click', this.clustersLayerId, this.handleClusterClick);
        this.map.off('mouseenter', this.clustersLayerId, this.handleMouseEnter);
        this.map.off('mouseleave', this.clustersLayerId, this.handleMouseLeave);

        // Видаляємо шари
        [this.clusterCountLayerId, this.clustersLayerId, this.id].forEach(layerId => {
            if (this.map!.getLayer(layerId)) {
                this.map!.removeLayer(layerId);
            }
        });

        this.removeSource(this.map);
        this.map = null;
    }

    show(): void {
        if (!this.map) return;

        [this.clustersLayerId, this.clusterCountLayerId, this.id].forEach(layerId => {
            if (this.map!.getLayer(layerId)) {
                this.map!.setLayoutProperty(layerId, 'visibility', 'visible');
            }
        });

        this.visible = true;
    }

    hide(): void {
        if (!this.map) return;

        [this.clustersLayerId, this.clusterCountLayerId, this.id].forEach(layerId => {
            if (this.map!.getLayer(layerId)) {
                this.map!.setLayoutProperty(layerId, 'visibility', 'none');
            }
        });

        this.visible = false;
    }

    setData(data: FeatureCollection): void {
        this.data = data;

        if (this.map) {
            const source = this.map.getSource(this.sourceId) as GeoJSONSource | undefined;
            if (source) {
                source.setData(data);
            }
        }
    }
}