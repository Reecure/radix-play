import { useEffect, useMemo, useState } from 'react';
import { VehicleManager } from '../lib/VehicleManager';
import { VehiclesLayer } from '../lib/VehiclesLayer.ts';
import { ActiveVehicleMarker } from './ActiveVehicleMarker';
import { useMapContext } from "@/shared/lib/maplibre";

export function VehiclesLayerManager() {
    const { map, isLoaded } = useMapContext();
    const manager = useMemo(() => new VehicleManager(), []);
    const layer = useMemo(() => new VehiclesLayer(manager), [manager]);

    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        if (!map || !isLoaded) return;

        layer.mount(map);

        const onClick = (id: number | null) => {
            setSelectedId(id);
            manager.selectVehicle(id);
        };

        layer.on('vehicleClick', onClick);

        return () => {
            layer.off('vehicleClick', onClick);
            layer.unmount();
        };
    }, [map, isLoaded, layer, manager]);

    return (
        selectedId ? (
            <ActiveVehicleMarker
                manager={manager}
                selectedId={selectedId}
                onClose={() => {
                    setSelectedId(null);
                    manager.selectVehicle(null);
                }}
            />
        ) : null
    );
}