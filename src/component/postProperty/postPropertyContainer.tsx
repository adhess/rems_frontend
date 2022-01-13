import {Component, ComponentType} from "react";
import "./postPropertyContainer.scss";
import {
    Box, Button, Checkbox, FormControl, FormControlLabel,
    FormGroup, InputAdornment, InputLabel, MenuItem, OutlinedInput,
    Select, Step, StepLabel, Stepper, TextField
} from "@mui/material";
import PropertyForSell from "../../assets/img/property_for_sell.png";
import PropertyForRent from "../../assets/img/home_for_rent.png";
import React from "react";
import MapContainer from "../map/mapContainer";
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import {findAddress, postNewProperty} from "../../utils/APIUtils";
import PropertyLocationMarkerContext from "../../context/globalContext";
import config from '../map/config.json';
import {
    additionalInformation,
    FormType,
    generalInformation, interiorInformation,
    PropertyNature,
} from "../../types/inedex";
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterMoment';
import {getPropertyOptionsInfo} from "../../utils/utils";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {LOGIN_MODAL} from "../../store/actions";

type stateType = {
    [key: string]: any
}

class PostPropertyContainer extends Component<any, stateType> {

    state: stateType = {
        activeStep: 0,

        formType: FormType.RENT,
        propertyType: "",
        nbBedrooms: "",
        nbBathrooms: "",
        area: "",
        price: "",
        age: "",
        nbFloors: "",
        availableDate: new Date(),

        hasGarden: false,
        hasTerrace: false,
        hasElevator: false,
        hasSeaView: false,
        hasMountainView: false,
        hasSwimmingPool: false,
        hasConcierge: false,
        hasParking: false,

        hasSatelliteDish: false,
        hasFirePlace: false,
        hasCooling: false,
        hasCentralHeating: false,
        hasSecurity: false,

        hasModernKitchen: false,
        hasRefrigerator: false,
        hasOven: false,
        hasTV: false,
        hasCleaningMachine: false,
        hasInternet: false,
        hasMicrowave: false,

        images: [],

        address: {}
    }
    markerCoordinates = [...config.center];


    constructor(props: any) {
        super(props);
        if (!props.user) {
            this.props.history.push('/');
            this.props.setLoginModal(true);
        }
    }

    render() {
        const step0 = <div className="step0Container">
            <div className="sellRentContainer">
                <div
                    className={["propertyCard", this.state.formType === FormType.SELL ? "propertyCardSelected" : ""].join(" ")}>
                    <h3>Property To Sell</h3>
                    <div onClick={() => this.setState({formType: FormType.SELL})}>
                        <img src={PropertyForSell} alt=""/>
                    </div>
                </div>
                <div
                    className={["propertyCard", this.state.formType === FormType.RENT ? "propertyCardSelected" : ""].join(" ")}>
                    <h3>Property To Rent</h3>
                    <div onClick={() => this.setState({formType: FormType.RENT})}>
                        <img src={PropertyForRent} alt=""/>
                    </div>
                </div>
            </div>

            <FormControl fullWidth>
                <InputLabel>Property Type *</InputLabel>
                <Select onChange={(event) => this.setState({propertyType: event.target.value})}
                        value={this.state.propertyType}
                        label="Property Type *">
                    {
                        [
                            ["Mansion, Villa, Townhouse, House...", PropertyNature.HOUSE],
                            ["Lot, Agricultural Parcel...", PropertyNature.LOT],
                            ["Flat", PropertyNature.FLAT],
                            ["Commercial, Garage...", PropertyNature.COMMERCIAL]
                        ].map(u => <MenuItem key={u[0]} value={u[1]}>{u[0]}</MenuItem>)
                    }
                </Select>
            </FormControl>

            <FormControl variant="outlined"
                         onChange={(event: any) => event.target.value.length > 3 || event.target.value.startsWith("-") ? null :
                             this.setState({nbBedrooms: event.target.value})}>
                <InputLabel>How many Bedrooms?</InputLabel>
                <OutlinedInput value={this.state.nbBedrooms}
                               type="number"
                               label="How many Bedrooms?"
                               endAdornment={<InputAdornment position="end">Rooms</InputAdornment>}/>
            </FormControl>

            <FormControl variant="outlined"
                         onChange={(event: any) => event.target.value.length > 3 || event.target.value.startsWith("-") ? null :
                             this.setState({nbBathrooms: event.target.value})}>
                <InputLabel inputMode="numeric">How many Bathrooms?</InputLabel>
                <OutlinedInput value={this.state.nbBathrooms}
                               type="number"
                               label="How many Bathrooms?"
                               endAdornment={<InputAdornment position="end">Rooms</InputAdornment>}/>
            </FormControl>

            <FormControl variant="outlined"
                         onChange={(event: any) => event.target.value.length > 13 || event.target.value.startsWith("-") ? null :
                             this.setState({area: this.valueWithoutSeparation(event.target.value)})}>
                <InputLabel>Area *</InputLabel>
                <OutlinedInput value={this.thousandSeparatorValue(this.state.area)}
                               label="Area *"
                               endAdornment={<InputAdornment position="end">㎡</InputAdornment>}/>
            </FormControl>

            <FormControl variant="outlined"
                         onChange={
                             (event: any) => event.target.value.length > 12 || event.target.value.startsWith("-") ?
                                 null : this.setState({price: this.valueWithoutSeparation(event.target.value)})
                         }>
                <InputLabel>Price</InputLabel>
                <OutlinedInput value={this.thousandSeparatorValue(this.state.price)}
                               label="Price"
                               endAdornment={<InputAdornment position="end">DT</InputAdornment>}/>
            </FormControl>

            <FormControl variant="outlined"
                         onChange={
                             (event: any) => event.target.value.length > 3 || event.target.value.startsWith("-") ?
                                 null : this.setState({age: event.target.value})
                         }>
                <InputLabel>Building Age</InputLabel>
                <OutlinedInput value={this.state.age}
                               label="Building Age"
                               type="number"
                               endAdornment={<InputAdornment position="end">Years Old</InputAdornment>}/>
            </FormControl>

            <FormControl variant="outlined"
                         onChange={(event: any) => event.target.value.length > 3 || event.target.value.startsWith("-") ? null :
                             this.setState({nbFloors: event.target.value})}>
                <InputLabel>How many floors in the building?</InputLabel>
                <OutlinedInput value={this.state.nbFloors}
                               label="How many floors in the building?"
                               type="number"
                               endAdornment={<InputAdornment position="end">Floors</InputAdornment>}/>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>

                <MobileDatePicker
                    label="When the property will be available to use?"
                    inputFormat="DD/MM/yyyy"
                    value={this.state.availableDate}
                    onChange={(m) => this.setState({availableDate: m})}
                    // onChange={(event: any) => this.setState({availableDate: event.target.value})}
                    renderInput={(params: any) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </div>
        const step1 = <FormGroup className="propertyFeaturesSection">
            {
                generalInformation.map((title: string, index: number) => {
                        const info = getPropertyOptionsInfo(title);
                        if (!info) return null;

                        const value: string = info?.value;
                        const label: string = info?.label;
                        const icon: ReactJSXElement = info?.icon;

                        return <FormControlLabel
                            key={"pch-" + index}
                            color="success"
                            control={
                                <Checkbox
                                    checked={this.state[value]}
                                    onChange={(event: any) => this.setState({[value]: event.target.checked})}
                                />
                            }
                            label={
                                <div className="featureCheckbox">
                                    {icon}
                                    <h4>{label}</h4>
                                </div>
                            }/>
                    }
                )
            }
        </FormGroup>
        const step2 = <FormGroup className="propertyFeaturesSection">
            {
                interiorInformation.map((title: string, index: number) => {
                        const info = getPropertyOptionsInfo(title);
                        if (!info) return null;

                        const value: string = info?.value;
                        const label: string = info?.label;
                        const icon: ReactJSXElement = info?.icon;

                        return <FormControlLabel
                            key={"ich-" + index}
                            color="success"
                            control={
                                <Checkbox
                                    checked={this.state[value]}
                                    onChange={(event: any) => this.setState({[value]: event.target.checked})}
                                />
                            }
                            label={
                                <div className="featureCheckbox">
                                    {icon}
                                    <h4>{label}</h4>
                                </div>
                            }/>
                    }
                )
            }
        </FormGroup>
        const step3 = <FormGroup className="propertyFeaturesSection">
            {
                additionalInformation.map((title: string, index: number) => {
                        const info = getPropertyOptionsInfo(title);
                        if (!info) return null;

                        const value: string = info?.value;
                        const label: string = info?.label;
                        const icon: ReactJSXElement = info?.icon;

                        return <FormControlLabel
                            key={"ach-" + index}
                            color="success"
                            control={
                                <Checkbox
                                    checked={this.state[value]}
                                    onChange={(event: any) => this.setState({[value]: event.target.checked})}
                                />
                            }
                            label={
                                <div className="featureCheckbox">
                                    {icon}
                                    <h4>{label}</h4>
                                </div>
                            }/>
                    }
                )
            }
        </FormGroup>
        const step4 = <div>
            <PropertyLocationMarkerContext.Provider value={{coordinates: this.markerCoordinates}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <p>Move the marker to the property location</p>
                    |
                    <h4>Or</h4>
                    |
                    <Button
                        onClick={() => alert("if you are using 3G, 4G or 5G mobile internet connexion, " +
                            "click locate me button, otherwise you can download the app xxx to locate your building " +
                            "and enter the building location bellow. " +
                            "will be implemented in a next batch...")}>Enter property coordinates manually</Button>
                </div>
                <MapContainer zoom={7}
                              canDragMarker={true}
                              height={window.innerHeight * 63 / 100}
                              width={"100%"}
                              markersCoordinates={[this.markerCoordinates]}/>

                {/*<div style={{marginTop: '1em'}}>*/}
                {/*    <FormControl variant="outlined"*/}
                {/*                 style={{marginRight: "1em", width: 'calc(50% - 0.5em)'}}*/}
                {/*                 onChange={(event: any) => this.setState({latitude: event.target.value})}>*/}
                {/*        <InputLabel htmlFor="outlined-adornment-password" inputMode="numeric">Latitude</InputLabel>*/}
                {/*        <OutlinedInput value={this.state.latitude}*/}
                {/*                       label="Latitude"*/}
                {/*                       type="number"/>*/}
                {/*    </FormControl>*/}
                {/*    <FormControl variant="outlined"*/}
                {/*                 style={{width: 'calc(50% - 0.5em)'}}*/}
                {/*                 onChange={(event: any) => this.setState({longitude: event.target.value})}>*/}
                {/*        <InputLabel htmlFor="outlined-adornment-password" inputMode="numeric">Longitude</InputLabel>*/}
                {/*        <OutlinedInput value={this.state.longitude}*/}
                {/*                       label="Longitude"*/}
                {/*                       type="number"/>*/}
                {/*    </FormControl>*/}
                {/*</div>*/}
            </PropertyLocationMarkerContext.Provider>
        </div>
        const step5 = <div>
            <p>-) Upload your images to google drive and make the links public.</p>
            <p>-) Past the links below. (Each image link in a separate line)</p>
            <TextField style={{width: 'calc(100% - 1em)'}}
                       label="Images"
                       multiline
                       rows={4}
                       value={this.state.images.join("\n")}
                       onChange={(event: any) => this.setState({images: event?.target?.value?.split("\n")})}
            />
        </div>

        const stepsTitle = ['Property Information', 'General Information', 'Interior Information', 'Additional Information', "Location", "Images"];

        const handleNextStep = () => {
            if (this.state.activeStep === stepsTitle.length - 1) handleSubmit();
            else this.setState((state: any) => ({
                activeStep: state.activeStep + 1
            }));
        };

        const handleBackStep = () => {
            this.setState((state: any) => ({
                activeStep: state.activeStep - 1
            }));
        };

        const handleSubmit = () => {
            // Todo: Submit form
            const form: any = Object.assign({}, this.state);
            delete form?.activeStep;

            [form.latitude, form.longitude] = [...this.markerCoordinates];

            findAddress(form.longitude, form.latitude).then(u => {
                form.address = u.address;
                console.log(form);
                postNewProperty(form)
                    .then(response => {

                    })
                    .catch(error => {

                    })

            })
        };

        const nextButtonDisabled = () => {
            return !this.state.area
                || !this.state.propertyType;
        }

        return <div className="postPropertyContainer">
            <Box sx={{
                '& .MuiTextField-root': {m: 1, width: '18ch', marginBottom: '1em'},
                background: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 'fit-content',
                padding: "2em",
                borderRadius: 1,
                // height: 'calc(100% - 2em)'
            }}
            >
                <Stepper activeStep={this.state.activeStep}>
                    {
                        stepsTitle.map(
                            (value, index) => <Step key={"step " + index}><StepLabel>{value}</StepLabel></Step>
                        )
                    }
                </Stepper>
                <React.Fragment>

                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2, marginBottom: '1em'}}>
                        <Button
                            color="inherit"
                            disabled={this.state.activeStep === 0}
                            onClick={handleBackStep}
                            sx={{mr: 1}}
                        >
                            <ArrowBackIosNewTwoToneIcon/>
                            Back
                        </Button>

                        <Box sx={{flex: '1 1 auto'}}/>

                        <Button onClick={handleNextStep} disabled={nextButtonDisabled()}>
                            {this.state.activeStep === stepsTitle.length - 1 ? 'Submit' : 'Next'}
                            <ArrowForwardIosTwoToneIcon/>
                        </Button>
                    </Box>
                    {
                        [step0, step1, step2, step3, step4, step5][this.state.activeStep]
                    }
                </React.Fragment>
            </Box>
            {/*<JSONPretty data={this.state}/>*/}
        </div>;
    }

    private thousandSeparatorValue(price: string) {
        if (price.length === 0) return "";
        let ans = "" + price[price.length - 1];
        for (let i = price.length - 2; i >= 0; i--) {
            if ((i - price.length + 1) % 3 === 0) {
                ans = ',' + ans;
            }
            ans = price.charAt(i) + ans;
        }
        return ans;
    }

    private valueWithoutSeparation(value: string) {
        return value.split('').filter((c: any) => '0' <= c && c <= '9').join('');
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setLoginModal: (val: any) => dispatch({type: LOGIN_MODAL, value: val})
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user
    }
}

export default compose<ComponentType>(withRouter, connect(mapStateToProps, mapDispatchToProps))(PostPropertyContainer);