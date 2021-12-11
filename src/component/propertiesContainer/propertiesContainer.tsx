import {Component} from "react";
import Property from "./property/property";
import {PropertyType} from "../../types/inedex";

type PropsType = {
    properties: PropertyType[]
}
export default class PropertiesContainer extends Component<any, any> {

    render() {
        return <div style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            width: "40%",
            height: '100%',
            overflowY: "scroll",
            background: 'white',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px;'
        }}>
            {
                this.props.properties.map((property: PropertyType) => <Property data={property}/>)
            }
        </div>
    }
}