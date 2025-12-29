import { useEffect, useRef } from 'react';
import { useMapContext } from './useMap';
import type { MapReadyCallback } from '../types';

export function useMapReady(callback: MapReadyCallback) {
    const { map, isLoaded } = useMapContext();
    const cleanupRef = useRef<(() => void) | null>(null);
    const initializedRef = useRef(false);

    useEffect(() => {
        if (!map || !isLoaded) return;

        if (initializedRef.current) return;
        initializedRef.current = true;

        const cleanup = callback(map);
        cleanupRef.current = cleanup ?? null;

        return () => {
            if (cleanupRef.current) {
                cleanupRef.current();
                cleanupRef.current = null;
            }
            initializedRef.current = false;
        };
    }, [map, isLoaded, callback]);
}