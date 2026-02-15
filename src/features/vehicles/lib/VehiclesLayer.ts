import type { Map as MaplibreMap, GeoJSONSource, MapMouseEvent } from 'maplibre-gl';
import { VehicleManager } from '../lib/VehicleManager';

type LayerListener = (...args: any[]) => void;

export class VehiclesLayer {
    private map: MaplibreMap | null = null;
    private manager: VehicleManager;
    private sourceId = 'vehicles';
    private layerId = 'vehicles-points';
    private animationFrameId: number | null = null;
    private isMounted = false;
    private listeners: Record<string, LayerListener[]> = {};

    constructor(manager: VehicleManager) {
        this.manager = manager;
        this.animate = this.animate.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    mount(map: MaplibreMap) {
        if (this.isMounted && this.map === map) return;
        if (this.isMounted && this.map) this.unmount();

        this.map = map;
        this.isMounted = true;
        this.manager.connect();

        this.initSourceAndLayers();
        this.addVehicleIcons();
        this.startAnimationLoop();

        map.on('click', this.layerId, this.onClick);
        map.on('mouseenter', this.layerId, this.onMouseEnter);
        map.on('mouseleave', this.layerId, this.onMouseLeave);
    }

    private initSourceAndLayers() {
        if (!this.map) return;

        if (!this.map.getSource(this.sourceId)) {
            this.map.addSource(this.sourceId, {
                type: 'geojson',
                data: { type: 'FeatureCollection', features: [] },
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 50
            });
        }

        if (!this.map.getLayer('vehicles-clusters')) {
            this.map.addLayer({
                id: 'vehicles-clusters',
                type: 'circle',
                source: this.sourceId,
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 10, '#f1f075', 100, '#f28cb1'],
                    'circle-radius': ['step', ['get', 'point_count'], 20, 10, 30, 100, 40]
                }
            });
        }

        if (!this.map.getLayer('vehicles-cluster-count')) {
            this.map.addLayer({
                id: 'vehicles-cluster-count',
                type: 'symbol',
                source: this.sourceId,
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });
        }

        if (!this.map.getLayer(this.layerId)) {
            this.map.addLayer({
                id: this.layerId,
                type: 'symbol',
                source: this.sourceId,
                filter: ['!', ['has', 'point_count']],
                layout: {
                    'icon-image': 'vehicle-icon',
                    'icon-rotate': ['get', 'heading'],
                    'icon-allow-overlap': true,
                    'icon-ignore-placement': true,
                    'icon-size': 1.2
                }
            });
        }
    }

    private startAnimationLoop() {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        this.animate();
    }

    private animate() {
        if (!this.isMounted || !this.map) return;

        const vehicles = this.manager.getRenderVehicles();

        const features = vehicles.map(vehicle => ({
            type: 'Feature' as const,
            geometry: {
                type: 'Point' as const,
                coordinates: [vehicle.lng, vehicle.lat]
            },
            properties: {
                id: vehicle.vehicleId,
                speed: vehicle.speed,
                number: vehicle.number,
                heading: vehicle.heading
            }
        }));

        const source = this.map.getSource(this.sourceId) as GeoJSONSource;
        if (source) {
            source.setData({
                type: 'FeatureCollection',
                features
            });
        }

        this.animationFrameId = requestAnimationFrame(this.animate);
    }

    private addVehicleIcons() {
        if (!this.map || !this.isMounted || this.map.hasImage('vehicle-icon')) return;

        const svg = `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#4a90e2" stroke="#fff" stroke-width="2"/><path d="M20,5 L20,15 M5,20 L15,20" stroke="none"/><polygon points="20,10 25,25 15,25" fill="#fff"/></svg>`;

        const img = new Image(40, 40);
        img.onload = () => {
            if (this.isMounted && this.map && !this.map.hasImage('vehicle-icon')) {
                this.map.addImage('vehicle-icon', img, { pixelRatio: 2 });
            }
        };
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    private onClick(e: MapMouseEvent) {
        if (!this.map) return;
        const features = this.map.queryRenderedFeatures(e.point, { layers: [this.layerId] });
        if (features.length > 0) {
            const id = features[0].properties?.id;
            this.emit('vehicleClick', id);
        } else {
            this.emit('vehicleClick', null);
        }
    }

    private onMouseEnter = () => { if (this.map) this.map.getCanvas().style.cursor = 'pointer'; };
    private onMouseLeave = () => { if (this.map) this.map.getCanvas().style.cursor = ''; };

    unmount() {
        this.isMounted = false;
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        this.manager.disconnect();

        if (this.map) {
            this.map.off('click', this.layerId, this.onClick);
            this.map.off('mouseenter', this.layerId, this.onMouseEnter);
            this.map.off('mouseleave', this.layerId, this.onMouseLeave);

            if (this.map.getLayer(this.layerId)) this.map.removeLayer(this.layerId);
            if (this.map.getLayer('vehicles-cluster-count')) this.map.removeLayer('vehicles-cluster-count');
            if (this.map.getLayer('vehicles-clusters')) this.map.removeLayer('vehicles-clusters');
            if (this.map.getSource(this.sourceId)) this.map.removeSource(this.sourceId);
        }
        this.listeners = {};
        this.map = null;
    }

    on(event: string, fn: LayerListener) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(fn);
    }

    off(event: string, fn: LayerListener) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(l => l !== fn);
    }

    private emit(event: string, ...args: any[]) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(fn => fn(...args));
    }
}