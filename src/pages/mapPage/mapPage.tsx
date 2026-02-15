import './mapPage.scss';
import {MapWidget} from "../../widgets/map/ui/mapWidget.tsx";
import IntersectionLayer from "@/features/traffic/IntersectionLayer.tsx";
import IntersectionConnectionLayer from "@/features/traffic/IntersectionConnectionsLayer.tsx";

const Map = () => {
    return <div className="map-page">
        <MapWidget className={"map"}>
            {/*<CamerasLayer/>*/}
            <IntersectionConnectionLayer />
            <IntersectionLayer/>
        </MapWidget>
    </div>
}

export default Map;