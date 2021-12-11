import {Component} from "react";
import './property.scss';
import image from '../../../assets/img/image.jpg';
import {PropertyType} from "../../../types/inedex";
import HotelTwoToneIcon from '@mui/icons-material/HotelTwoTone';
import BathtubTwoToneIcon from '@mui/icons-material/BathtubTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';

type propsType = {
    data: PropertyType
}

export default class Property extends Component<propsType, any> {
    render() {
        return <div className='propertyContainer'>
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