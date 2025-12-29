// features/mapIncidents/ui/IncidentPopup.tsx

import { useEffect, useRef, useCallback, useState } from 'react';
import maplibregl from 'maplibre-gl';
import type { MapLayerMouseEvent, MapMouseEvent } from 'maplibre-gl';
import { useMap, useLayerEvent, useMapEvent } from '../../../shared/lib/maplibre';
import './IncidentPopup.scss';

const SEVERITY_LEVELS: Record<string, { label: string; color: string }> = {
    low: { label: 'Низький', color: '#22c55e' },
    medium: { label: 'Середній', color: '#eab308' },
    high: { label: 'Високий', color: '#f97316' },
    critical: { label: 'Критичний', color: '#ef4444' },
};

interface IncidentData {
    coordinates: [number, number];
    id: number;
    title: string;
    type: string;
    severity: string;
    timestamp: string;
}

export function IncidentPopup() {
    const map = useMap();
    const popupRef = useRef<maplibregl.Popup | null>(null);
    const [selectedIncident, setSelectedIncident] = useState<IncidentData | null>(null);

    // Клік на точку інциденту
    const handleIncidentClick = useCallback((e: MapLayerMouseEvent) => {
        e.originalEvent.stopPropagation(); // Зупиняємо спливання

        const feature = e.features?.[0];
        if (!feature || feature.geometry.type !== 'Point') return;

        const props = feature.properties;

        setSelectedIncident({
            coordinates: feature.geometry.coordinates as [number, number],
            id: props?.id,
            title: props?.title || 'Без назви',
            type: props?.type || 'unknown',
            severity: props?.severity || 'medium',
            timestamp: props?.timestamp || new Date().toISOString(),
        });
    }, []);

    // Клік на карту (не на точку) — закриваємо попап
    const handleMapClick = useCallback((e: MapMouseEvent) => {
        // Перевіряємо чи клік був на точці інциденту
        if (!map) return;

        const features = map.queryRenderedFeatures(e.point, {
            layers: ['incidents']
        });

        // Якщо клікнули не на інцидент — закриваємо попап
        if (features.length === 0) {
            setSelectedIncident(null);
        }
    }, [map]);

    // Курсор
    const handleMouseEnter = useCallback((e: MapLayerMouseEvent) => {
        e.target.getCanvas().style.cursor = 'pointer';
    }, []);

    const handleMouseLeave = useCallback((e: MapLayerMouseEvent) => {
        e.target.getCanvas().style.cursor = '';
    }, []);

    // Підписка на події
    useLayerEvent('incidents', 'click', handleIncidentClick);
    useLayerEvent('incidents', 'mouseenter', handleMouseEnter);
    useLayerEvent('incidents', 'mouseleave', handleMouseLeave);
    useMapEvent('click', handleMapClick);

    // Показ/закриття попапу
    useEffect(() => {
        if (popupRef.current) {
            popupRef.current.remove();
            popupRef.current = null;
        }

        if (!map || !selectedIncident) return;

        const { title, type, severity, timestamp, coordinates } = selectedIncident;
        const severityInfo = SEVERITY_LEVELS[severity] || SEVERITY_LEVELS.medium;

        const popup = new maplibregl.Popup({
            closeOnClick: false,
            closeButton: true,
            offset: 15,
            className: 'incident-popup-container',
        })
            .setLngLat(coordinates)
            .setHTML(`
                <div class="incident-popup">
                    <h4>${title}</h4>
                    <div class="incident-popup__row">
                        <span class="incident-popup__label">Тип:</span>
                        <span>${type}</span>
                    </div>
                    <div class="incident-popup__row">
                        <span class="incident-popup__label">Статус:</span>
                        <span class="incident-popup__severity" style="color: ${severityInfo.color}">
                            ${severityInfo.label}
                        </span>
                    </div>
                    <div class="incident-popup__row">
                        <span class="incident-popup__label">Час:</span>
                        <span>${new Date(timestamp).toLocaleString('uk-UA')}</span>
                    </div>
                </div>
            `)
            .addTo(map);

        popup.on('close', () => {
            setSelectedIncident(null);
        });

        popupRef.current = popup;

        return () => {
            popup.remove();
        };
    }, [map, selectedIncident]);

    return null;
}