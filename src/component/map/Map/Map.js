import React, {useRef, useState, useEffect, useContext} from "react"
import "./Map.scss";
import MapContext from "./MapContext";
import * as ol from "ol";
import {defaults as defaultInteractions} from 'ol/interaction';
import Drag from "../Layers/drag";
import VectorSource from "ol/source/Vector";
import {Feature} from "ol";
import {Point} from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import PropertyLocationMarkerContext from "../../../context/globalContext";

const Map = ({children, zoom, center, height, canDragMarker}) => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    const marker = useContext(PropertyLocationMarkerContext);

    // on component mount
    useEffect(() => {
        const point = new Feature(new Point([0, 0]));

        let options = {
            interactions: canDragMarker ? defaultInteractions().extend([new Drag(marker)]): undefined,
            view: new ol.View({zoom, center}),
            layers: canDragMarker ? [new VectorLayer({source: new VectorSource({features: [point]})})]: [],
            controls: [],
            overlays: []
        };

        let mapObject = new ol.Map(options);
        mapObject.setTarget(mapRef.current);
        setMap(mapObject);
        return () => mapObject.setTarget(undefined);
    }, [canDragMarker, center, marker, zoom]);

    // zoom change handler
    useEffect(() => {
        if (!map) return;

        map.getView().setZoom(zoom);
    }, [map, zoom]);

    // center change handler
    useEffect(() => {
        if (!map) return;

        map.getView().setCenter(center)
    }, [center, map])

    return (
        <MapContext.Provider value={{map}}>
            <div ref={mapRef} className="ol-map" style={{height: height ? height : window.innerHeight - 50}}>
                {children}
            </div>
        </MapContext.Provider>
    )
}

export default Map;