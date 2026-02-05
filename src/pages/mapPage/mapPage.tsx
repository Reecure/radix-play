import './mapPage.scss';
import {MapWidget} from "../../widgets/map/ui/mapWidget.tsx";
import {VehiclesLayerManager} from "@/features/vehicles/ui/VehiclesLayerManager.tsx";

const Map = () => {
    return <div className="map-page">
        <MapWidget className={"map"}>
            <VehiclesLayerManager />
        </MapWidget>
    </div>
}

export default Map;