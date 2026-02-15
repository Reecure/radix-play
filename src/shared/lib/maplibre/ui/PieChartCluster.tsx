import { useEffect, useRef, useMemo } from 'react';
import maplibregl, { type LayerSpecification } from 'maplibre-gl';
import ReactDOM from 'react-dom/client';
import { useLayer } from '@/shared/lib/maplibre/hooks/useLayer';
import { useMapContext } from "@/shared/lib/maplibre";

export interface ClusterSegment {
    key: string;
    color: string;
}

export interface ClusterFont {
    family?: string;
    weight?: number | string;
    color?: string;
    sizeRatio?: number;
}

interface DonutChartProps {
    data: { [key: string]: number };
    total: number;
    segments: ClusterSegment[];
    size: number;
    font?: ClusterFont;
}

const DonutChart = ({ data, total, segments, size, font }: DonutChartProps) => {
    const gradientString = useMemo(() => {
        let currentPct = 0;
        const parts: string[] = [];

        segments.forEach(seg => {
            const value = data[seg.key] || 0;
            const pct = (value / total) * 100;

            if (pct > 0) {
                parts.push(`${seg.color} ${currentPct}% ${currentPct + pct}%`);
                currentPct += pct;
            }
        });

        if (currentPct < 100) {
            parts.push(`#e5e7eb ${currentPct}% 100%`);
        }

        return `conic-gradient(${parts.join(', ')})`;
    }, [data, total, segments]);

    const holeSize = Math.round(size * 0.65);
    const fontSize = Math.round(size * (font?.sizeRatio || 0.4));

    return (
        <div style={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: gradientString,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '2px solid white',
            cursor: 'pointer',
            transition: 'width 0.2s ease, height 0.2s ease'
        }}>
            <div style={{
                width: holeSize,
                height: holeSize,
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: font?.family || 'inherit',
                fontSize: fontSize,
                fontWeight: font?.weight || 'bold',
                color: font?.color || '#374151',
                userSelect: 'none'
            }}>
                {total}
            </div>
        </div>
    );
};

interface ClusterMarkersProps {
    sourceId: string;
    isVisible: boolean;
    segments: ClusterSegment[];
    calculateSize?: (count: number) => number;
    fontStyle?: ClusterFont;
}

export const ClusterMarkers = ({
                                   sourceId,
                                   isVisible,
                                   segments,
                                   calculateSize,
                                   fontStyle
                               }: ClusterMarkersProps) => {

    const { map, isLoaded } = useMapContext();
    const markersRef = useRef<{ [key: string]: maplibregl.Marker }>({});
    const layerId = 'hidden-cluster-trigger';

    const defaultSizeCalculator = (count: number) => {
        const baseSize = 30;
        const growFactor = 10;
        const size = baseSize + (Math.log10(count) * growFactor);
        return Math.min(Math.max(size, 30), 160);
    };

    const getSize = calculateSize || defaultSizeCalculator;

    const hiddenLayer: LayerSpecification = useMemo(() => ({
        id: layerId,
        type: 'circle',
        source: sourceId,
        paint: { 'circle-opacity': 0, 'circle-radius': 0 },
        layout: { 'visibility': isVisible ? 'visible' : 'none' }
    }), [sourceId, isVisible]);

    useLayer(hiddenLayer);

    useEffect(() => {
        if (!map || !isLoaded) return;

        const renderMarkers = () => {
            if (!isVisible) {
                Object.values(markersRef.current).forEach(marker => marker.remove());
                markersRef.current = {};
                return;
            }

            if (!map.getLayer(layerId)) return;

            const features = map.queryRenderedFeatures({ layers: [layerId] });
            const newMarkers: { [key: string]: maplibregl.Marker } = {};
            const renderedIds = new Set<string>();

            features.forEach((feature) => {
                const props = feature.properties || {};
                const isCluster = props.cluster;
                const id = isCluster ? `cl_${props.cluster_id}` : `pt_${props.id}`;

                if (renderedIds.has(id)) return;
                renderedIds.add(id);

                const coords = (feature.geometry as any).coordinates;

                if (markersRef.current[id]) {
                    newMarkers[id] = markersRef.current[id];
                    newMarkers[id].setLngLat(coords);
                    delete markersRef.current[id];
                } else {
                    const el = document.createElement('div');

                    if (isCluster) {
                        const root = ReactDOM.createRoot(el);
                        const total = props.point_count;

                        const chartData: {[key: string]: number} = {};
                        segments.forEach(seg => {
                            chartData[seg.key] = props[seg.key] || 0;
                        });

                        root.render(
                            <DonutChart
                                data={chartData}
                                total={total}
                                segments={segments}
                                size={getSize(total)}
                                font={fontStyle}
                            />
                        );

                        el.addEventListener('click', (e) => {
                            e.stopPropagation();
                            (map.getSource(sourceId) as maplibregl.GeoJSONSource)
                                .getClusterExpansionZoom(props.cluster_id)
                                .then((zoom) => {
                                    map.easeTo({ center: coords, zoom: zoom + 1 });
                                });
                        });
                    } else {
                        const statusColor = props.status ? '#22c55e' : '#ef4444';
                        el.innerHTML = `<div style="width:12px;height:12px;background:${statusColor};border-radius:50%;border:2px solid white;box-shadow:0 0 4px rgba(0,0,0,0.3)"></div>`;
                    }

                    newMarkers[id] = new maplibregl.Marker({ element: el })
                        .setLngLat(coords)
                        .addTo(map);
                }
            });

            Object.values(markersRef.current).forEach(marker => marker.remove());
            markersRef.current = newMarkers;
        };

        map.on('move', renderMarkers);
        map.on('moveend', renderMarkers);
        map.on('sourcedata', renderMarkers);

        renderMarkers();

        return () => {
            map.off('move', renderMarkers);
            map.off('moveend', renderMarkers);
            map.off('sourcedata', renderMarkers);
            Object.values(markersRef.current).forEach(m => m.remove());
        };
    }, [map, isLoaded, sourceId, isVisible, segments, getSize, fontStyle]);

    return null;
};