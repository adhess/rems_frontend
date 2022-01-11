import {Component} from "react";
import MapContainer from "../map/mapContainer";
import PropertiesContainer from "../propertiesContainer/propertiesContainer";
import {findAllProperties} from "../../utils/APIUtils";
import {PropertyType} from "../../types/inedex";

class RentContainer extends Component<any, any> {
    propertyModel = {
        allowedPets: ['cat', 'dog'],
        petsNotAllowed: true,
        postedDate: "2021/12/06",
        rentPrice: 550,
        bedroomsNb: 3,
        bathroomsNb: 2,
        area: 150,
        images: [],
        location: [10.6346, 35.8245],
        address: "312 River Chase Dr, Orlando, Fl 32807"
    };
    state = {
        properties: []
    }

    componentDidMount() {
        findAllProperties()
            .then(u => {
                this.setState({properties: u.data.map((u: PropertyType) => ({...u, availableDate: new Date(u.availableDate)}))});
            });
    }

    render() {
        const markersCoordinates = this.state.properties.map((u: any) => [u.latitude, u.longitude]);
        return <div style={{width: "100%", height: "100%", display: 'flex', flexDirection: "row"}}>
            <MapContainer markersCoordinates={markersCoordinates}
                          canDragMarker={false}
            />
            <PropertiesContainer properties={this.state.properties}/>
        </div>;
    }
}

export default RentContainer;