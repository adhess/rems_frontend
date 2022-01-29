import {ACCESS_TOKEN} from "../constants";
import axios from "axios";

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return axios("/api/user/me");
}

export function login(loginRequest: any) {
    return axios.post("/api/auth/login", loginRequest);
}

export function signup(signupRequest: any) {
    return axios.post("/api/auth/signup", signupRequest);
}

export function postNewProperty(form: any) {
    return axios.post("/api/property/post", form);
}

export function findAllProperties() {
    return axios.get("/api/property/findAll?pageSize=10&page=1");
}

export function findAddress(lat: Number, lon: Number) {
    return fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat)
        .then(res => res.json());
}

export function findUserInfoByPropertyId(id: Number) {
    return axios.get("/api/property/findUserInfoByPropertyId?propertyId=" + id)
        .then(res => res.data);
}