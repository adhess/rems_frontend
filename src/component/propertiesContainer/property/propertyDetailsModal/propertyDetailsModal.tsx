import React, {Component} from "react";
import {Box, Button, styled} from "@mui/material";
import {connect} from "react-redux";
import {DETAILS_PROPERTY_MODAL} from "../../../../store/actions";
import "./propertyDetailsModal.scss";
import img from "../../../../assets/img/image.jpg";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import {additionalInformation, generalInformation, interiorInformation, PropertyType} from "../../../../types/inedex";
import millify from "millify";
import BathtubTwoToneIcon from "@mui/icons-material/BathtubTwoTone";
import HotelTwoToneIcon from "@mui/icons-material/HotelTwoTone";
import MapContainer from "../../../map/mapContainer";
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import CallIcon from '@mui/icons-material/Call';
import AddressRow from "../../../../common/AddressRow/AddressRow";
import {getPropertyOptionsInfo} from "../../../../utils/utils";
import {findUserInfoByPropertyId} from "../../../../utils/APIUtils";
import PersonIcon from '@mui/icons-material/Person';
import PhoneNumber from "../../../../common/PhoneNumber";
import Modal from "styled-react-modal";

type propsType = {
    isDetailsPropertyOpen: boolean,
    data: PropertyType,
    setDetailsPropertyOpen: Function,
};

class PropertyDetailsModal extends Component<propsType, any> {
    state = {
        name: '',
        phoneNumber: '',
        imgUrl: '',
    }

    componentDidMount() {
        findUserInfoByPropertyId(this.props.data.id).then(info => {
            this.setState(info);
        })
    }

    render() {
        const StyledModal = Modal.styled`
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
            <StyledModal isOpen={this.props.isDetailsPropertyOpen}
                         afterClose={() => this.props.setDetailsPropertyOpen(false)}
                         >
                <Box sx={style} className='box'>
                    <div className="propertyDisplaySection" style={{width: '60%'}}>

                        {
                            <img src={this.props.data.images.length > 0 ? this.props.data.images[0] : img} alt=""
                                 width="100%"/>
                        }
                        <div className="propertyImages">
                            {
                                this.props.data.images.map((url: string, index) => {
                                    return index === 0 ? null : <img key={index} src={url} alt="" width="100%"/>
                                })
                            }
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
                                        !this.props?.data?.price ? null :
                                            millify(this.props?.data?.price,
                                                {precision: 3, decimalSeparator: ',', units: ['', '']})}</strong>
                                    <strong style={{fontSize: 11}}>/mo</strong>
                                </div>

                                <div className='property-infos'>
                                    <div className='property-info'>
                                        <p>{this.props.data.nbBathrooms}</p>
                                        <BathtubTwoToneIcon/>
                                    </div>
                                    <div className='property-info'>
                                        <p>{this.props.data.nbBedrooms}</p>
                                        <HotelTwoToneIcon/>
                                    </div>
                                    <div className='property-info'>
                                        <p>{this.props.data.area}</p>
                                        <span style={{fontWeight: 200}}>㎡</span>
                                    </div>
                                </div>
                            </div>

                            <AddressRow {...this.props?.data?.address}/>
                        </div>

                        <MapContainer center={[this.props.data.latitude, this.props.data.longitude]}
                                      zoom={18}
                                      canDragMarker={false}
                                      height={300}
                                      width={"100%"}
                                      markersCoordinates={[[this.props.data.latitude, this.props.data.longitude]]}/>
                        <h3 style={{marginLeft: '1em'}}>Rental facts and features</h3>
                        <div style={{marginLeft: '1em', display: 'flex', flexDirection: 'row', flexFlow: 'wrap'}}>
                            <div className='centerRow'>
                                <EventAvailableTwoToneIcon/>
                                <h5 style={{marginRight: '1em', width: '100% !important'}}>Date available:</h5>
                            </div>

                            <div className='centerRow'>
                                <p>{this.props.data.availableDate.getDay()}/{this.props.data.availableDate.getMonth()}/{this.props.data.availableDate.getFullYear()}</p>
                            </div>
                            {
                                generalInformation
                                    .map((title: string) => getPropertyOptionsInfo(title)?.value)
                                    .find(value => !value || this.props.data[value]) === undefined ? null :
                                    <h4 style={{width: '100%'}}>General Information:</h4>
                            }
                            {
                                generalInformation.map((title: string, index) => {
                                    const info = getPropertyOptionsInfo(title);
                                    if (!info) return null;

                                    return !this.props.data[info?.value] ? null :
                                        <div className='centerRow' key={'gi-' + index}>
                                            {info?.icon}
                                            <h5>{info?.label}</h5>
                                        </div>
                                })
                            }


                            {
                                interiorInformation
                                    .map((title: string) => getPropertyOptionsInfo(title)?.value)
                                    .find(value => !value || this.props.data[value]) === undefined ? null :
                                    <h4 style={{width: '100%'}}>Interior Information:</h4>
                            }
                            {
                                interiorInformation.map((title: string, index) => {
                                    const info = getPropertyOptionsInfo(title);
                                    if (!info) return null;

                                    return !this.props.data[info?.value] ? null :
                                        <div className='centerRow' key={'ii-' + index}>
                                            {info?.icon}
                                            <h5>{info?.label}</h5>
                                        </div>
                                })
                            }
                            {
                                additionalInformation
                                    .map((title: string) => getPropertyOptionsInfo(title)?.value)
                                    .find(value => !value || this.props.data[value]) === undefined ? null :
                                    <h4 style={{width: '100%'}}>Additional Information:</h4>
                            }

                            {
                                additionalInformation.map((title: string, index) => {
                                    const info = getPropertyOptionsInfo(title);
                                    if (!info) return null;

                                    return !this.props.data[info?.value] ? null :
                                        <div className='centerRow' key={'ai-' + index}>
                                            {info?.icon}
                                            <h5>{info?.label}</h5>
                                        </div>
                                })
                            }

                        </div>
                        <div style={{marginLeft: '1em'}}>
                            <h3>Owner</h3>

                            <div style={{display: 'flex', flexDirection: 'row', alignItems: "center"}}>
                                <PersonIcon style={{width: 17}}/>
                                <h5 style={{margin: "0 0 0 5px"}}>{this.state.name}</h5>
                            </div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                <CallIcon style={{width: 17}}/>
                                <h5 style={{margin: "0 0 0 5px"}}>
                                    <PhoneNumber value={this.state.phoneNumber}/>
                                </h5>
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
