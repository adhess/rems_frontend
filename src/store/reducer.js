import {DETAILS_PROPERTY_MODAL, LOGIN, LOGIN_MODAL, LOGOUT} from "./actions";

const initialState = {
    user: null,
    loginModal: false,
    isDetailsPropertyOpen: false,
    propertyDetails: {},
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.user
            };
        case LOGOUT:
            return {
                ...state,
                user: null
            };
        case LOGIN_MODAL:
            return {
                ...state,
                loginModal: action.value
            }
        case DETAILS_PROPERTY_MODAL:
            return {
                ...state,
                isDetailsPropertyOpen: action.value,
                propertyDetails: action.data,
            }
        default:
            return state;
    }
}

export default reducer;