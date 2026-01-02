import './mapPage.scss';
import {MapWidget} from "../../widgets/map/ui/mapWidget.tsx";

const Map = () => {
    return <div className="map-page">
        <MapWidget className={"map"}>
            {/*<IncidentsLayerManager />*/}
        </MapWidget>
    </div>
}

export default Map;