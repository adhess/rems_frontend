import {Component} from "react";
import MapContainer from "../map/mapContainer";
import PropertiesContainer from "../propertiesContainer/propertiesContainer";

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
    properties: any = [];
    state = {
        properties: []
    }

    constructor(props: any) {
        super(props);
        this.generateDummyProperties();
    }

    private generateDummyProperties() {
        for (let i = 0; i < 10; i++) {
            const property = Object.assign({}, this.propertyModel);
            const lat = 10.6346 + Math.pow(-1, Math.floor(2 * Math.random())) * Math.random();
            const log = 35.8245 + Math.pow(-1, Math.floor(2 * Math.random())) * Math.random();
            property.location = [lat, log];
            property.area = Math.round(4000 * Math.random());
            property.rentPrice = Math.round(4000 * Math.random());
            property.bedroomsNb = Math.round(10 * Math.random());
            property.bathroomsNb = Math.round(5 * Math.random());
            this.properties.push(property);

            switch (Math.round(4 * Math.random())) {
                case 0:
                    property.allowedPets = [];
                    break;
                case 1:
                    property.allowedPets = ['cat'];
                    break;
                case 2:
                    property.allowedPets = ['dog'];
                    break;
                case 3:
                    property.allowedPets = ['cat', 'dog'];
                    break;
            }

        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({properties: this.properties})
        }, 1000)
    }

    render() {
        const markersCoordinates = this.properties.map((u: any) => u.location);
        return <div style={{width: "100%", height: "100%", display: 'flex', flexDirection: "row"}}>
            <MapContainer markersCoordinates={markersCoordinates}/>
            <PropertiesContainer properties={this.state.properties}/>
        </div>;
    }
}

export default RentContainer;