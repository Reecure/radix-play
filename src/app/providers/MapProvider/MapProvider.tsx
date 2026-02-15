import {
    useRef,
    useState,
    useEffect,
    type PropsWithChildren,
} from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { MapConfig, MapContextValue } from '../../../shared/lib/maplibre/types';
import { MapContext } from '../../../shared/lib/maplibre/context';

interface MapProviderProps extends PropsWithChildren {
    config: MapConfig;
    style: maplibregl.StyleSpecification | string;
    className?: string;
}

export function MapProvider({
                                children,
                                config,
                                style,
                                className
                            }: MapProviderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const styleRef = useRef(style);

    const [pendingStyle, setPendingStyle] = useState<typeof style | null>(null);

    const [contextValue, setContextValue] = useState<MapContextValue>({
        map: null,
        isLoaded: false,
        isStyleLoaded: false,
    });

    useEffect(() => {
        if (!containerRef.current) return;
        if (mapRef.current) return;

        const map = new maplibregl.Map({
            container: containerRef.current,
            style: styleRef.current,
            center: config.center,
            zoom: config.zoom,
            minZoom: config.minZoom,
            maxZoom: config.maxZoom,
            maxBounds: config.maxBounds,
            renderWorldCopies: config.renderWorldCopies ?? false,
        });

        mapRef.current = map;

        const handleLoad = () => {
            setContextValue({
                map,
                isLoaded: true,
                isStyleLoaded: true,
            });
        };

        map.on('load', handleLoad);

        return () => {
            map.off('load', handleLoad);
            map.remove();
            mapRef.current = null;
            setContextValue({
                map: null,
                isLoaded: false,
                isStyleLoaded: false,
            });
        };
    }, []);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || !contextValue.isLoaded) return;
        if (styleRef.current === style) return;

        setContextValue(prev => ({ ...prev, isStyleLoaded: false }));
        setPendingStyle(style);
    }, [style, contextValue.isLoaded]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || !pendingStyle || contextValue.isStyleLoaded) return;

        styleRef.current = pendingStyle;
        const newStyle = pendingStyle;
        setPendingStyle(null);

        const handleStyleLoad = () => {
            setContextValue(prev => ({ ...prev, isStyleLoaded: true }));
        };

        map.once('style.load', handleStyleLoad);
        map.setStyle(newStyle);

        if (map.isStyleLoaded()) {
            map.off('style.load', handleStyleLoad);
            handleStyleLoad();
        }
    }, [pendingStyle, contextValue.isStyleLoaded]);

    return (
        <MapContext.Provider value={contextValue}>
            <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
                <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
                {contextValue.isLoaded && children}
            </div>
        </MapContext.Provider>
    );
}