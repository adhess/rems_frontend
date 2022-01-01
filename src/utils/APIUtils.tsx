import {API_BASE_URL, ACCESS_TOKEN} from "../constants";
import axios from "axios";

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return axios(API_BASE_URL + "/user/me");
}

export function login(loginRequest: any) {
    return axios.post(API_BASE_URL + "/auth/login", loginRequest);
}

export function signup(signupRequest: any) {
    return axios.post(API_BASE_URL + "/auth/signup", signupRequest);
}

export function postNewProperty(form: any) {
    return axios.post(API_BASE_URL + "/post/property", form);
}