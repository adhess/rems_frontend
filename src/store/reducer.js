import {LOGIN, LOGIN_MODAL, LOGOUT} from "./actions";

const initialState = {
    user: null,
    loginModal: false
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
        default:
            return state;
    }
}

export default reducer;