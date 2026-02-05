// import { useRef, useCallback } from 'react';
// import type { Map as MaplibreMap } from 'maplibre-gl';
// import { useMapReady } from '../../../shared/lib/maplibre';
// import { useLayerRegistry } from '../../../entities/map';
// import { IncidentsLayer } from '../lib/IncidentsLayer';
// import { IncidentPopup } from './IncidentPopup';
//
// const MOCK_INCIDENTS = {
//     type: 'FeatureCollection' as const,
//     features: [
//         {
//             type: 'Feature' as const,
//             geometry: { type: 'Point' as const, coordinates: [30.4895, 50.4425] },
//             properties: { id: 1, title: 'ДТП на Хрещатику', type: 'accident', severity: 'high', timestamp: '2024-01-15T10:30:00Z' },
//         },
//         {
//             type: 'Feature' as const,
//             geometry: { type: 'Point' as const, coordinates: [30.4892, 50.4422] },
//             properties: { id: 2, title: 'Пожежа в будівлі', type: 'fire', severity: 'critical', timestamp: '2024-01-15T11:45:00Z' },
//         },
//         {
//             type: 'Feature' as const,
//             geometry: { type: 'Point' as const, coordinates: [30.6157, 50.4547] },
//             properties: { id: 3, title: 'Прорив труби', type: 'utility', severity: 'medium', timestamp: '2024-01-15T09:15:00Z' },
//         },
//     ],
// };
//
// export function IncidentsLayerManager() {
//     const layerRef = useRef<IncidentsLayer | null>(null);
//     const registry = useLayerRegistry();
//
//     const initLayer = useCallback((map: MaplibreMap) => {
//         if (layerRef.current?.isActive()) {
//             return;
//         }
//
//         const layer = new IncidentsLayer();
//         layerRef.current = layer;
//
//         registry.register(layer);
//         layer.mount(map);
//         layer.setData(MOCK_INCIDENTS);
//
//         return () => {
//             if (layerRef.current) {
//                 layerRef.current.unmount();
//                 registry.unregister(layer.id);
//                 layerRef.current = null;
//             }
//         };
//     }, [registry]);
//
//     useMapReady(initLayer);
//
//     return <IncidentPopup />;
// }