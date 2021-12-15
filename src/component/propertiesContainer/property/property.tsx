import React, {Component} from "react";
import './property.scss';
import image from '../../../assets/img/image.jpg';
import {PropertyType} from "../../../types/inedex";
import HotelTwoToneIcon from '@mui/icons-material/HotelTwoTone';
import BathtubTwoToneIcon from '@mui/icons-material/BathtubTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import {connect} from "react-redux";
import {DETAILS_PROPERTY_MODAL} from "../../../store/actions";

type propsType = {
    data: PropertyType,
    setDetailsPropertyOpen: Function
}

class Property extends Component<propsType, any> {
    render() {
        const openDetailsPropertyHandler = () => {
            this.props.setDetailsPropertyOpen(true, this.props.data);
        }
        return <div className='propertyContainer' onClick={openDetailsPropertyHandler}>
            <div>
                <img src={image} alt=""/>
                <h4 className='price'>${this.props.data.rentPrice}/mo</h4>
                <FavoriteTwoToneIcon className="favorite"/>
            </div>
            <div>
                <div className='property-infos'>
                    <div className='property-info'><p>{this.props.data.bathroomsNb}</p> <BathtubTwoToneIcon/></div>
                    <div className='property-info'><p>{this.props.data.bedroomsNb}</p> <HotelTwoToneIcon/></div>
                    <div className='property-info'><p>{this.props.data.area}</p><span style={{fontWeight: 200}}>㎡</span></div>
                </div>

                <p>{this.props.data.address}</p>
            </div>
        </div>;
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setDetailsPropertyOpen: (val: boolean, data: any) => dispatch({type: DETAILS_PROPERTY_MODAL, value: val, data: data})
    }
}

const mapStateToProps = (state: any) => {
    return {
        isDetailsPropertyOpen: state.isDetailsPropertyOpen
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Property)