import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { createRoot } from 'react-dom/client';
import type { VehicleManager } from '../lib/VehicleManager';
import { useMapContext } from "@/shared/lib/maplibre";

interface Props {
    manager: VehicleManager;
    selectedId: number | null;
    onClose: () => void;
}

export function ActiveVehicleMarker({ manager, selectedId, onClose }: Props) {
    const { map } = useMapContext();
    const markerRef = useRef<maplibregl.Marker | null>(null);
    const popupNodeRef = useRef<HTMLDivElement | null>(null);
    const rootRef = useRef<any>(null);
    const frameRef = useRef<number>(0);

    const [vehicleData, setVehicleData] = useState<any>(null);

    useEffect(() => {
        if (!map || !selectedId) return;

        const el = document.createElement('div');
        el.className = 'active-marker';
        el.style.display = 'none';

        const popupContainer = document.createElement('div');
        popupNodeRef.current = popupContainer;
        rootRef.current = createRoot(popupContainer);

        const popup = new maplibregl.Popup({
            offset: 0,
            closeButton: false,
            closeOnClick: false,
            className: 'vehicle-live-popup'
        }).setDOMContent(popupContainer);

        const marker = new maplibregl.Marker({ element: el })
            .setLngLat([0, 0])
            .setPopup(popup)
            .addTo(map);

        marker.togglePopup();
        markerRef.current = marker;

        const animate = () => {
            const v = manager.getVehicleById(selectedId);
            if (v && markerRef.current) {
                markerRef.current.setLngLat([v.lng, v.lat]);

                setVehicleData((prev: any) => {
                    if (!prev || prev.speed !== v.speed || prev.updateTime !== v.updateTime) {
                        return { ...v };
                    }
                    return prev;
                });
            }
            frameRef.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(frameRef.current);
            marker.remove();
            if (rootRef.current) rootRef.current.unmount();
        };
    }, [map, selectedId, manager]);

    useEffect(() => {
        if (rootRef.current && vehicleData) {
            rootRef.current.render(
                <div style={{ padding: '8px', minWidth: '180px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <strong>{vehicleData.number}</strong>
                        <span onClick={onClose} style={{ cursor: 'pointer' }}>✕</span>
                    </div>
                    <div>Скорость: {vehicleData.speed.toFixed(0)} км/ч</div>
                    <div>ID: {vehicleData.vehicleId}</div>
                </div>
            );
        }
    }, [vehicleData, onClose]);

    return null;
}