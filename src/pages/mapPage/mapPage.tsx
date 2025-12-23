import {useEffect, useRef} from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './mapPage.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {mapStyles} from '../../shared/config/mapStyles.js'

const DEFAULT_CENTER: [number, number] = [30.525, 50.455];
const DEFAULT_ZOOM = 9;

const Map = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        if (mapRef.current || !mapContainer.current) return;

        mapRef.current = new maplibregl.Map({
            container: mapContainer.current,
            renderWorldCopies: false,
            style: {
                version: 8,
                sources: {
                    'openmaptiles': {
                        type: 'vector',
                        tiles: ["https://localhost:7281/tiles/{z}/{x}/{y}.pbf"],
                        minzoom: 0,
                        maxzoom: 14
                    },
                },
                layers: mapStyles.layers
            },
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
            maxBounds: [
                [-10, 35],
                [50, 60]
            ]
        });

        mapRef.current.on('click', '3d-buildings', (e) => {
            console.log(e.lngLat);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            console.log("Features", e.features[0])
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);


    return <div ref={mapContainer} className={"map-wrap"}/>;
}

export default Map;