import YardTwoToneIcon from "@mui/icons-material/YardTwoTone";
import React from "react";
import BalconyTwoToneIcon from "@mui/icons-material/BalconyTwoTone";
import ElevatorIcon from "@mui/icons-material/ElevatorTwoTone";
import WaterTwoToneIcon from "@mui/icons-material/WaterTwoTone";
import ParkTwoToneIcon from "@mui/icons-material/ParkTwoTone";
import PoolTwoToneIcon from "@mui/icons-material/PoolTwoTone";
import PermIdentityTwoToneIcon from "@mui/icons-material/PermIdentityTwoTone";
import DepartureBoardTwoToneIcon from "@mui/icons-material/DepartureBoardTwoTone";
import {faSatelliteDish} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FireplaceTwoToneIcon from "@mui/icons-material/FireplaceTwoTone";
import SecurityTwoToneIcon from "@mui/icons-material/SecurityTwoTone";
import CountertopsTwoToneIcon from "@mui/icons-material/CountertopsTwoTone";
import KitchenTwoToneIcon from "@mui/icons-material/KitchenTwoTone";
import TvTwoToneIcon from "@mui/icons-material/TvTwoTone";
import LocalLaundryServiceTwoToneIcon from "@mui/icons-material/LocalLaundryServiceTwoTone";
import CompassCalibrationTwoToneIcon from "@mui/icons-material/CompassCalibrationTwoTone";
import MicrowaveTwoToneIcon from "@mui/icons-material/MicrowaveTwoTone";
import AirTwoToneIcon from "@mui/icons-material/AirTwoTone";

export type PropertyType = {
    id: number,

    [key: string]: any

    formType: FormType,
    propertyType: PropertyNature,
    nbBathrooms: number,
    nbBedrooms: number,
    nbFloors: number,
    age: number,
    area: number,
    price: number,
    availableDate: Date,

    hasCentralHeating: boolean,
    hasCleaningMachine: boolean,
    hasCooling: boolean,
    hasConcierge: boolean,
    hasElevator: boolean,
    hasFirePlace: boolean,
    hasGarden: boolean,
    hasParking: boolean,
    hasInternet: boolean,
    hasMicrowave: boolean,
    hasModernKitchen: boolean,
    hasMountainView: boolean,
    hasOven: boolean,
    hasRefrigerator: boolean,
    hasSatelliteDish: boolean,
    hasSeaView: boolean,
    hasSecurity: boolean,
    hasSwimmingPool: boolean,
    hasTV: boolean,
    hasTerrace: boolean,

    latitude: number,
    longitude: number,

    images: string[],

    address: {
        id: 11
        country: string
        country_code: string
        state: string
        state_district: string
        county: string
        postcode: string
    }
}

export enum FormType {SELL = "SELL", RENT = "RENT"}

export enum PropertyNature {HOUSE = "HOUSE", LOT = "LOT", FLAT = "FLAT", COMMERCIAL = "COMMERCIAL"}

export const generalInformation = ['garden', 'terrace', 'elevator', 'seaView', 'mountainView', 'swimmingPool', 'concierge', 'parking'];

export const interiorInformation = ['satelliteDish', 'fireplace', 'cooling', 'centralHeating', 'security'];

export const additionalInformation = ['modernKitchen', 'refrigerator', 'oven', 'tv', 'cleaningMachine', 'internet', 'microwave'];

export const propertyOptions = {
    garden: {
        label: 'Garden',
        icon: <YardTwoToneIcon/>,
        value: 'hasGarden',
    },
    terrace: {
        label: 'Terrace',
        icon: <BalconyTwoToneIcon/>,
        value: 'hasTerrace',
    },
    elevator: {
        label: "Elevator",
        icon: <ElevatorIcon/>,
        value: "hasElevator",
    },
    seaView: {
        label: "Sea views",
        icon: <WaterTwoToneIcon/>,
        value: "hasSeaView",
    },
    mountainView: {
        label: "Mountain views",
        icon: <ParkTwoToneIcon/>,
        value: "hasMountainView",
    },
    swimmingPool: {
        label: "Swimming pool",
        icon: <PoolTwoToneIcon/>,
        value: "hasSwimmingPool",
    },
    concierge: {
        label: "Concierge",
        icon: <PermIdentityTwoToneIcon/>,
        value: "hasConcierge",
    },
    parking: {
        label: "Parking",
        icon: <DepartureBoardTwoToneIcon/>,
        value: "hasParking",
    },
    satelliteDish: {
        label: "Satellite dish",
        icon: <FontAwesomeIcon icon={faSatelliteDish}/>,
        value: "hasSatelliteDish",
    },
    fireplace: {
        label: "Fireplace",
        icon: <FireplaceTwoToneIcon/>,
        value: "hasFirePlace",
    },
    cooling: {
        label: "Cooling",
        icon: <AirTwoToneIcon/>,
        value: "hasCooling",
    },
    centralHeating: {
        label: "Central Heating",
        icon: <WaterTwoToneIcon/>,
        value: "hasCentralHeating",
    },
    security: {
        label: "Security",
        icon: <SecurityTwoToneIcon/>,
        value: "hasSecurity",
    },
    modernKitchen: {
        label: "Modern Kitchen",
        icon: <CountertopsTwoToneIcon/>,
        value: "hasModernKitchen",
    },
    refrigerator: {
        label: "Refrigerator",
        icon: <KitchenTwoToneIcon/>,
        value: "hasRefrigerator",
    },
    oven: {
        label: "Oven",
        icon: <WaterTwoToneIcon/>,
        value: "hasOven",
    },
    tv: {
        label: "TV",
        icon: <TvTwoToneIcon/>,
        value: "hasTV",
    },
    cleaningMachine: {
        label: "Cleaning Machine",
        icon: <LocalLaundryServiceTwoToneIcon/>,
        value: "hasCleaningMachine",
    },
    internet: {
        label: "Internet",
        icon: <CompassCalibrationTwoToneIcon/>,
        value: "hasInternet",
    },
    microwave: {
        label: "Microwave",
        icon: <MicrowaveTwoToneIcon/>,
        value: "hasMicrowave",
    }
}