import {Component} from "react";
import {Layers, TileLayer, VectorLayer} from "./Layers";
import {fromLonLat} from "ol/proj";
import {osm, vector} from "./Source";
import Map from "./Map";
import mapConfig from "./config.json";
import {Icon, Style} from "ol/style";
import {Feature} from "ol";
import {Point} from "ol/geom";
import {Controls, FullScreenControl} from "./Controls";
import iconMarker from "../../assets/img/marker.png";

class MapContainer extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            zoom: 7,
            center: mapConfig.center,
        }
    }

    getMarkers = (lonLatArray: any) => {
        var iconStyle = new Style({
            image: new Icon({
                anchorXUnits: "fraction",
                anchorYUnits: "pixels",
                anchor: [0.5, 46],
                src: iconMarker,
                scale: [0.5, 0.5],
            }),
            // text: new Text({
            //     text: '9',
            //     offsetY: 8,
            //     offsetX: 1,
            // })
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
        return <div style={{width: this.props.width ? this.props.width : "60%"}}>
            <Map canDragMarker={this.props.canDragMarker}
                 center={fromLonLat(this.props.center ? this.props.center : this.state.center)}
                 height={this.props.height}
                 zoom={this.props.zoom ? this.props.zoom : this.state.zoom}>
                <Layers>
                    <TileLayer source={osm()} zIndex={0}/>
                    <VectorLayer source={vector({features: this.getMarkers(this.props.markersCoordinates)})}
                                 style={undefined}/>
                </Layers>
                <Controls>
                    <FullScreenControl/>
                </Controls>
            </Map>
        </div>;
    }
}

export default MapContainer;