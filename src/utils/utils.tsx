import YardTwoToneIcon from "@mui/icons-material/YardTwoTone";
import React from "react";
import BalconyTwoToneIcon from "@mui/icons-material/BalconyTwoTone";
import ElevatorIcon from "@mui/icons-material/ElevatorTwoTone";
import WaterTwoToneIcon from "@mui/icons-material/WaterTwoTone";
import ParkTwoToneIcon from "@mui/icons-material/ParkTwoTone";
import PoolTwoToneIcon from "@mui/icons-material/PoolTwoTone";
import PermIdentityTwoToneIcon from "@mui/icons-material/PermIdentityTwoTone";
import DepartureBoardTwoToneIcon from "@mui/icons-material/DepartureBoardTwoTone";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSatelliteDish} from "@fortawesome/free-solid-svg-icons";
import FireplaceTwoToneIcon from "@mui/icons-material/FireplaceTwoTone";
import SecurityTwoToneIcon from "@mui/icons-material/SecurityTwoTone";
import CountertopsTwoToneIcon from "@mui/icons-material/CountertopsTwoTone";
import KitchenTwoToneIcon from "@mui/icons-material/KitchenTwoTone";
import TvTwoToneIcon from "@mui/icons-material/TvTwoTone";
import LocalLaundryServiceTwoToneIcon from "@mui/icons-material/LocalLaundryServiceTwoTone";
import CompassCalibrationTwoToneIcon from "@mui/icons-material/CompassCalibrationTwoTone";
import MicrowaveTwoToneIcon from "@mui/icons-material/MicrowaveTwoTone";

export function getPropertyOptionsInfo(title: string) {
    switch (title) {
        case 'garden':
            return {
                label: 'Garden',
                icon: <YardTwoToneIcon/>,
                value: 'hasGarden',
            }
        case 'terrace':
            return {
                label: 'Terrace',
                icon: <BalconyTwoToneIcon/>,
                value: 'hasTerrace',
            }
        case 'elevator':
            return {
                label: "Elevator",
                icon: <ElevatorIcon/>,
                value: "hasElevator",
            }
        case 'seaView':
            return {
                label: "Sea views",
                icon: <WaterTwoToneIcon/>,
                value: "hasSeaView",
            }
        case 'mountainView':
            return {
                label: "Mountain views",
                icon: <ParkTwoToneIcon/>,
                value: "hasMountainView",
            }
        case 'swimmingPool':
            return {
                label: "Swimming pool",
                icon: <PoolTwoToneIcon/>,
                value: "hasSwimmingPool",
            }
        case 'concierge':
            return {
                label: "Concierge",
                icon: <PermIdentityTwoToneIcon/>,
                value: "hasConcierge",
            }
        case 'parking':
            return {
                label: "Parking",
                icon: <DepartureBoardTwoToneIcon/>,
                value: "hasParking",
            }
        case 'satelliteDish':
            return {
                label: "Satellite dish",
                icon: <FontAwesomeIcon icon={faSatelliteDish}/>,
                value: "hasSatelliteDish",
            }
        case 'fireplace':
            return {
                label: "Fireplace",
                icon: <FireplaceTwoToneIcon/>,
                value: "hasFirePlace",
            }
        case 'cooling':
            return {
                label: "Cooling",
                icon: <ElevatorIcon/>,
                value: "hasCooling",
            }
        case 'centralHeating':
            return {
                label: "Central Heating",
                icon: <WaterTwoToneIcon/>,
                value: "hasCentralHeating",
            }
        case 'security':
            return {
                label: "Security",
                icon: <SecurityTwoToneIcon/>,
                value: "hasSecurity",
            }
        case 'modernKitchen':
            return {
                label: "Modern Kitchen",
                icon: <CountertopsTwoToneIcon/>,
                value: "hasModernKitchen",
            }
        case 'refrigerator':
            return {
                label: "Refrigerator",
                icon: <KitchenTwoToneIcon/>,
                value: "hasRefrigerator",
            }
        case 'oven':
            return {
                label: "Oven",
                icon: <WaterTwoToneIcon/>,
                value: "hasOven",
            }
        case 'tv':
            return {
                label: "TV",
                icon: <TvTwoToneIcon/>,
                value: "hasTV",
            }
        case 'cleaningMachine':
            return {
                label: "Cleaning Machine",
                icon: <LocalLaundryServiceTwoToneIcon/>,
                value: "hasCleaningMachine",
            }
        case 'internet':
            return {
                label: "Internet",
                icon: <CompassCalibrationTwoToneIcon/>,
                value: "hasInternet",
            }
        case 'microwave':
            return {
                label: "Microwave",
                icon: <MicrowaveTwoToneIcon/>,
                value: "hasMicrowave",
            }
    }
}