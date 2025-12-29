import './mapPage.scss';
import {MapWidget} from "../../widgets/map/ui/mapWidget.tsx";
import {IncidentsLayerManager} from '../../features/mapIncidents'

const Map = () => {
    return <div className="map-page">
        <MapWidget className={"map"}>
            <IncidentsLayerManager />
        </MapWidget>
    </div>
}

export default Map;