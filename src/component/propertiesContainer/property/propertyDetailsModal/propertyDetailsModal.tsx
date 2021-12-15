import React, {Component} from "react";
import {Box, Button, IconButton, ModalUnstyled, styled} from "@mui/material";
import {connect} from "react-redux";
import {DETAILS_PROPERTY_MODAL} from "../../../../store/actions";
import "./propertyDetailsModal.scss";
import img from "../../../../assets/img/image.jpg";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import {PropertyType} from "../../../../types/inedex";
import millify from "millify";
import BathtubTwoToneIcon from "@mui/icons-material/BathtubTwoTone";
import HotelTwoToneIcon from "@mui/icons-material/HotelTwoTone";
import MapContainer from "../../../map/mapContainer";
import KitchenTwoToneIcon from '@mui/icons-material/KitchenTwoTone';
import LocalFireDepartmentTwoToneIcon from '@mui/icons-material/LocalFireDepartmentTwoTone';
import AirTwoToneIcon from '@mui/icons-material/AirTwoTone';
import DepartureBoardTwoToneIcon from '@mui/icons-material/DepartureBoardTwoTone';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import PetsTwoToneIcon from '@mui/icons-material/PetsTwoTone';
import CallIcon from '@mui/icons-material/Call';
import FireplaceTwoToneIcon from '@mui/icons-material/FireplaceTwoTone';
import ConnectWithoutContactTwoToneIcon from '@mui/icons-material/ConnectWithoutContactTwoTone';
import TollTwoToneIcon from '@mui/icons-material/TollTwoTone';
import LensBlurTwoToneIcon from '@mui/icons-material/LensBlurTwoTone';

type propsType = {
    isDetailsPropertyOpen: boolean,
    data: PropertyType,
    setDetailsPropertyOpen: Function,
} | any;

class PropertyDetailsModal extends Component<propsType, any> {

    render() {
        const StyledModal = styled(ModalUnstyled)`
          position: fixed;
          z-index: 1300;
          right: 0;
          bottom: 0;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        `;
        const Backdrop = styled('div')`
          z-index: -1;
          position: fixed;
          right: 0;
          bottom: 0;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.5);
          -webkit-tap-highlight-color: transparent;
          outline: none;
          box-shadow: none;

        `;
        const style = {
            width: "70%",
            height: "100%",
            bgcolor: 'background.paper',
            borderRadius: '6px',
            p: 2,
            px: 4,
            pb: 3,
            boxShadow: 'none',
            outline: 'none'
        };

        return <>
            <StyledModal open={this.props.isDetailsPropertyOpen}
                         onClose={() => this.props.setDetailsPropertyOpen(false)}
                         BackdropComponent={Backdrop}>
                <Box sx={style} className='box'>
                    <div className="propertyDisplaySection" style={{width: '60%'}}>
                        <img src={img} alt="" width="100%"/>
                        <div className="propertyImages">
                            <img src={img} alt=""/>
                            <img src={img} alt=""/>
                            <img src={img} alt=""/>
                            <img src={img} alt=""/>
                            <img src={img} alt=""/>
                            <img src={img} alt=""/>
                            <img src={img} alt=""/>
                        </div>
                    </div>
                    <div className="propertyDisplaySection" style={{width: '40%', paddingBottom: '5em'}}>
                        <div className='row'
                             style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
                            <h2 style={{margin: "0.5em 1em"}}>ZLand</h2>
                            <div>
                                <Button
                                    onClick={() => alert("save to favorite feature will be implemented in a future batch...")}>
                                    <FavoriteTwoToneIcon style={{marginRight: '0.2em'}}/> Save
                                </Button>
                                <Button
                                    onClick={() => alert("report problem feature will be implemented in a future batch...")}
                                    color="error">
                                    <ErrorTwoToneIcon/>
                                </Button>
                            </div>
                        </div>
                        <hr/>
                        <div>
                            <div style={{display: 'flex', flexDirection: 'row', flexFlow: 'wrap'}}>
                                <div style={{margin: 'auto 3em auto 1em'}}>
                                    <strong style={{fontSize: 24}}>${
                                        !this.props?.data?.rentPrice ? null :
                                            millify(this.props?.data?.rentPrice,
                                                {precision: 3, decimalSeparator: ',', units: ['', '']})}</strong>
                                    <strong style={{fontSize: 11}}>/mo</strong>
                                </div>

                                <div className='property-infos'>
                                    <div className='property-info'>
                                        <p>{this.props.data.bathroomsNb}</p>
                                        <BathtubTwoToneIcon/>
                                    </div>
                                    <div className='property-info'>
                                        <p>{this.props.data.bedroomsNb}</p>
                                        <HotelTwoToneIcon/>
                                    </div>
                                    <div className='property-info'>
                                        <p>{this.props.data.area}</p>
                                        <span style={{fontWeight: 200}}>㎡</span>
                                    </div>
                                </div>
                            </div>


                            <p style={{marginLeft: '1em'}}>{this.props.data.address}</p>
                        </div>
                        {/*{this.props?.data?.rentPrice}*/}
                        <MapContainer center={this.props.data.location}
                                      zoom={18}
                                      height={300}
                                      width={"100%"}
                                      markersCoordinates={[this.props.data.location]}/>
                        <h3 style={{marginLeft: '1em'}}>Rental facts and features</h3>
                        <div style={{marginLeft: '1em', display: 'flex', flexDirection: 'row', flexFlow: 'wrap'}}>
                            <div className='centerRow'>
                                <EventAvailableTwoToneIcon/>
                                <h5 style={{marginRight: '1em', width: '100% !important'}}>Date available:</h5>
                            </div>

                            <div className='centerRow'>
                                <p>Man Jan 17 2022</p>
                            </div>

                            <div className='centerRow'>
                                <AirTwoToneIcon/>
                                <h5>Cooling</h5>
                            </div>
                            <div className='centerRow'>
                                <DepartureBoardTwoToneIcon/>
                                <h5>Parking</h5>
                            </div>
                            <div className='centerRow'>
                                <KitchenTwoToneIcon/>
                                <h5>Refrigerator</h5>
                            </div>
                            <div className='centerRow'>
                                <LocalFireDepartmentTwoToneIcon/>
                                <h5>Gas Range</h5>
                            </div>
                            <div className='centerRow'>
                                <PetsTwoToneIcon/>
                                <h5>Pets</h5>
                            </div>
                            <div className='centerRow'>
                                <ConnectWithoutContactTwoToneIcon/>
                                <h5>Smart Home</h5>
                            </div>
                            <div className='centerRow'>
                                <LensBlurTwoToneIcon/>
                                <h5>Heating</h5>
                            </div>
                            <div className='centerRow'>
                                <FireplaceTwoToneIcon/>
                                <h5>Fireplace</h5>
                            </div>
                            <div className='centerRow'>
                                <TollTwoToneIcon/>
                                <h5>others</h5>
                            </div>

                        </div>
                        <div style={{marginLeft: '1em'}}>
                            <h3>Contact Name Text</h3>
                            <p>Company Name Text</p>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: "center"}}>
                                <CallIcon style={{width: 17}}/>
                                <h5 style={{margin: 0}}>(+216) 55 379 899</h5>
                            </div>
                        </div>
                    </div>
                </Box>
            </StyledModal>
        </>;
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setDetailsPropertyOpen: (val: boolean) => dispatch({type: DETAILS_PROPERTY_MODAL, value: val})
    }
}

const mapStateToProps = (state: any) => {
    return {
        isDetailsPropertyOpen: state.isDetailsPropertyOpen,
        data: state.propertyDetails
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetailsModal);