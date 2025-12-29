import { useContext } from 'react';
import { MapContext } from '../context';

export function useMap() {
    const context = useContext(MapContext);

    if (!context) {
        throw new Error('useMap must be used within MapProvider');
    }

    return context.map;
}

export function useMapContext() {
    const context = useContext(MapContext);

    if (!context) {
        throw new Error('useMapContext must be used within MapProvider');
    }

    return context;
}