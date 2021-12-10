import {Component} from "react";
import {Layers, TileLayer, VectorLayer} from "./Layers";
import {fromLonLat} from "ol/proj";
import {osm, vector} from "./Source";
import Map from "./Map";
import mapConfig from "./config.json";
import {Icon, Style} from "ol/style";
import {Feature} from "ol";
import {Point} from "ol/geom";

class MapContainer extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            zoom: 7,
            center: mapConfig.center,
            features: this.addMarkers(this.props.markersCoordinates)
        }
    }

    addMarkers = (lonLatArray: any) => {
        var iconStyle = new Style({
            image: new Icon({
                anchorXUnits: "fraction",
                anchorYUnits: "pixels",
                src: mapConfig.markerImage32,
            }),
        });
        return lonLatArray.map((item: any) => {
            let feature = new Feature({
                geometry: new Point(fromLonLat(item)),
            });
            feature.setStyle(iconStyle);
            return feature;
        });
    }


    render() {
        return <div>
            <Map center={fromLonLat(this.state.center)} zoom={this.state.zoom}>
                <Layers>
                    <TileLayer source={osm()} zIndex={0} />

                    <VectorLayer source={vector({features: this.state.features})} style={undefined} />
                </Layers>
                {/*<Controls>*/}
                {/*    <FullScreenControl />*/}
                {/*</Controls>*/}
            </Map>
        </div>;
    }
}

export default MapContainer;