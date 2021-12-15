import React, {Component} from "react";
import Property from "./property/property";
import {PropertyType} from "../../types/inedex";
import PropertyDetailsModal from "./property/propertyDetailsModal/propertyDetailsModal";
import {connect} from "react-redux";

type PropsType = {
    properties: PropertyType[],
    isDetailsPropertyOpen: boolean,
}
class PropertiesContainer extends Component<PropsType, any> {

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
            {this.props.isDetailsPropertyOpen ? <PropertyDetailsModal/>: null}
            {
                this.props.properties.map((property: PropertyType) => <Property data={property}/>)
            }
        </div>
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
    }
}

const mapStateToProps = (state: any) => {
    return {
        isDetailsPropertyOpen: state.isDetailsPropertyOpen
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesContainer)