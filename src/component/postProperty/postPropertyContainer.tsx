import {Component} from "react";
import "./postPropertyContainer.scss";
import {
    Box, Button, Checkbox, FormControl, FormControlLabel,
    FormGroup, InputAdornment, InputLabel, MenuItem, OutlinedInput,
    Select, Step, StepLabel, Stepper, TextField
} from "@mui/material";
import PropertyForSell from "../../assets/img/property_for_sell.png";
import PropertyForRent from "../../assets/img/home_for_rent.png";
import YardTwoToneIcon from '@mui/icons-material/YardTwoTone';
import BalconyTwoToneIcon from '@mui/icons-material/BalconyTwoTone';
import ElevatorIcon from '@mui/icons-material/ElevatorTwoTone';
import WaterTwoToneIcon from '@mui/icons-material/WaterTwoTone';
import ParkTwoToneIcon from '@mui/icons-material/ParkTwoTone';
import PoolTwoToneIcon from '@mui/icons-material/PoolTwoTone';
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';
import SecurityTwoToneIcon from '@mui/icons-material/SecurityTwoTone';
import FireplaceTwoToneIcon from '@mui/icons-material/FireplaceTwoTone';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from "react";
import {faSatelliteDish} from "@fortawesome/free-solid-svg-icons";
import CountertopsTwoToneIcon from '@mui/icons-material/CountertopsTwoTone';
import KitchenTwoToneIcon from '@mui/icons-material/KitchenTwoTone';
import MicrowaveTwoToneIcon from '@mui/icons-material/MicrowaveTwoTone';
import TvTwoToneIcon from '@mui/icons-material/TvTwoTone';
import LocalLaundryServiceTwoToneIcon from '@mui/icons-material/LocalLaundryServiceTwoTone';
import CompassCalibrationTwoToneIcon from '@mui/icons-material/CompassCalibrationTwoTone';
import MapContainer from "../map/mapContainer";
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import {postNewProperty} from "../../utils/APIUtils";
import PropertyLocationMarkerContext from "../../context/globalContext";
import config from '../map/config.json';

class PostPropertyContainer extends Component<any, any> {

    state = {
        activeStep: 0,

        formType: "rent",
        propertyType: "",
        nbBedrooms: "",
        nbBathrooms: "",
        area: "",
        price: "",
        age: "",
        nbFloors: "",

        isGarden: false,
        isTerrace: false,
        isElevator: false,
        isSeaView: false,
        isMountainView: false,
        isSwimmingPool: false,
        isConcierge: false,

        isSatelliteDish: false,
        isFirePlace: false,
        isClimatisation: false,
        isCentralHeating: false,
        isSecurity: false,

        isModernKitchen: false,
        isRefrigerator: false,
        isOven: false,
        isTV: false,
        isCleaningMachine: false,
        isInternet: false,
        isMicrowave: false,

        images: [],
    }
    markerCoordinates = [...config.center];

    render() {
        const step0 = <div className="step0Container">
            <div className="sellRentContainer">
                <div
                    className={["propertyCard", this.state.formType === "sell" ? "propertyCardSelected" : ""].join(" ")}>
                    <h3>Property To Sell</h3>
                    <div onClick={() => this.setState({formType: "sell"})}>
                        <img src={PropertyForSell} alt=""/>
                    </div>
                </div>
                <div
                    className={["propertyCard", this.state.formType === "rent" ? "propertyCardSelected" : ""].join(" ")}>
                    <h3>Property To Rent</h3>
                    <div onClick={() => this.setState({formType: "rent"})}>
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
                        ["Mansion, Villa, Townhouse, House...", "Lot, Agricultural Parcel...", "Flat", "Commercial, Garage..."]
                            .map(u => <MenuItem key={u} value={u}>{u}</MenuItem>)
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
        </div>
        const step1 = <FormGroup className="propertyFeaturesSection">
            <FormControlLabel color="success"
                              control={<Checkbox checked={this.state.isGarden}
                                                 onChange={(event: any) => this.setState({isGarden: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <YardTwoToneIcon/>
                                      <h4>Garden</h4>
                                  </div>
                              }/>
            <FormControlLabel color="success"
                              control={<Checkbox checked={this.state.isTerrace}
                                                 onChange={(event: any) => this.setState({isTerrace: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <BalconyTwoToneIcon/>
                                      <h4>Terrace</h4>
                                  </div>
                              }/>
            <FormControlLabel color="success"
                              control={<Checkbox checked={this.state.isElevator}
                                                 onChange={(event: any) => this.setState({isElevator: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <ElevatorIcon/>
                                      <h4>Elevator</h4>
                                  </div>
                              }/>
            <FormControlLabel color="success"
                              control={<Checkbox checked={this.state.isSeaView}
                                                 onChange={(event: any) => this.setState({isSeaView: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <WaterTwoToneIcon/>
                                      <h4>Sea views</h4>
                                  </div>
                              }/>
            <FormControlLabel color="success"
                              control={<Checkbox checked={this.state.isMountainView}
                                                 onChange={(event: any) => this.setState({isMountainView: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <ParkTwoToneIcon/>
                                      <h4>Mountain views</h4>
                                  </div>
                              }/>
            <FormControlLabel color="success"
                              control={<Checkbox checked={this.state.isSwimmingPool}
                                                 onChange={(event: any) => this.setState({isSwimmingPool: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <PoolTwoToneIcon/>
                                      <h4>Swimming pool</h4>
                                  </div>
                              }/>
            <FormControlLabel color="success"
                              control={<Checkbox checked={this.state.isConcierge}
                                                 onChange={(event: any) => this.setState({isConcierge: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <PermIdentityTwoToneIcon/>
                                      <h4>Concierge</h4>
                                  </div>
                              }/>
        </FormGroup>
        const step2 = <FormGroup className="propertyFeaturesSection">
            <FormControlLabel color="success"
                              control={<Checkbox checked={this.state.isSatelliteDish}
                                                 onChange={(event: any) => this.setState({isSatelliteDish: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <FontAwesomeIcon icon={faSatelliteDish}/>
                                      <h4>A satellite dish</h4>
                                  </div>
                              }/>
            <FormControlLabel color="success"
                              control={<Checkbox checked={this.state.isFirePlace}
                                                 onChange={(event: any) => this.setState({isFirePlace: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <FireplaceTwoToneIcon/>
                                      <h4>Fireplace</h4>
                                  </div>
                              }/>
            <FormControlLabel color="success"
                              control={<Checkbox checked={this.state.isClimatisation}
                                                 onChange={(event: any) => this.setState({isClimatisation: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <ElevatorIcon/>
                                      <h4>Climatisation</h4>
                                  </div>
                              }/>
            <FormControlLabel color="success" control={<Checkbox checked={this.state.isCentralHeating}
                                                                 onChange={(event: any) => this.setState({isCentralHeating: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <WaterTwoToneIcon/>
                                      <h4>Central Heating</h4>
                                  </div>
                              }/>
            <FormControlLabel color="success" control={<Checkbox checked={this.state.isSecurity}
                                                                 onChange={(event: any) => this.setState({isSecurity: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <SecurityTwoToneIcon/>
                                      <h4>Security</h4>
                                  </div>
                              }/>
        </FormGroup>
        const step3 = <FormGroup className="propertyFeaturesSection">
            <FormControlLabel color="success"
                              control={<Checkbox checked={this.state.isModernKitchen}
                                                 onChange={(event: any) => this.setState({isModernKitchen: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <CountertopsTwoToneIcon/>
                                      <h4>Modern Kitchen</h4>
                                  </div>
                              }/>
            <FormControlLabel color="success"
                              control={<Checkbox checked={this.state.isRefrigerator}
                                                 onChange={(event: any) => this.setState({isRefrigerator: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <KitchenTwoToneIcon/>
                                      <h4>Refrigerator</h4>
                                  </div>
                              }/>
            <FormControlLabel color="success"
                              control={<Checkbox checked={this.state.isOven}
                                                 onChange={(event: any) => this.setState({isOven: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <WaterTwoToneIcon/>
                                      <h4>Oven</h4>
                                  </div>
                              }/>
            <FormControlLabel color="success"
                              control={<Checkbox checked={this.state.isTV}
                                                 onChange={(event: any) => this.setState({isTV: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <TvTwoToneIcon/>
                                      <h4>TV</h4>
                                  </div>
                              }/>

            <FormControlLabel color="success"
                              control={<Checkbox checked={this.state.isCleaningMachine}
                                                 onChange={(event: any) => this.setState({isCleaningMachine: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <LocalLaundryServiceTwoToneIcon/>
                                      <h4>Cleaning Machine</h4>
                                  </div>
                              }/>

            <FormControlLabel color="success"
                              control={<Checkbox checked={this.state.isInternet}
                                                 onChange={(event: any) => this.setState({isInternet: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <CompassCalibrationTwoToneIcon/>
                                      <h4>Internet</h4>
                                  </div>
                              }/>

            <FormControlLabel color="success"
                              control={<Checkbox checked={this.state.isMicrowave}
                                                 onChange={(event: any) => this.setState({isMicrowave: event.target.checked})}/>}
                              label={
                                  <div className="featureCheckbox">
                                      <MicrowaveTwoToneIcon/>
                                      <h4>Microwave</h4>
                                  </div>
                              }/>
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
            <p>-) Past the links below. (each image link in a separate line)</p>
            <TextField style={{width: 'calc(100% - 1em)'}}
                       label="Images"
                       multiline
                       rows={4}
                       value={this.state.images.join("\n")}
                       onChange={(event: any) => this.setState({images: event?.target?.value?.split("\n")})}
            />
        </div>

        const steps = ['Property Information', 'General Information', 'Interior Information', 'Additional Information', "Location", "Images"];

        const handleNextStep = () => {
            if (this.state.activeStep === steps.length - 1) handleSubmit();
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

            form.latitude = this.markerCoordinates[0];
            form.longitude = this.markerCoordinates[1];

            console.log(form);
            postNewProperty(form)
                .then(response => {

                })
                .catch(error => {

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
                        steps.map(
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
                            {this.state.activeStep === steps.length - 1 ? 'Submit' : 'Next'}
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

export default PostPropertyContainer;