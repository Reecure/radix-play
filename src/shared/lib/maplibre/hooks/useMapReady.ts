import { useEffect, useRef } from 'react';
import { useMapContext } from './useMap';
import type { MapReadyCallback } from '../types';

export function useMapReady(callback: MapReadyCallback) {
    const { map, isStyleLoaded } = useMapContext();
    const cleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        if (!map || !isStyleLoaded) return;

        const cleanup = callback(map);
        cleanupRef.current = cleanup ?? null;

        return () => {
            if (cleanupRef.current) {
                cleanupRef.current();
                cleanupRef.current = null;
            }
        };
    }, [map, isStyleLoaded, callback]);
}