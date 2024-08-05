import { LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from "../dispatchTypes"

interface authState {
    isAuth: boolean,
    error: null,
    user: null
}
const initialState: authState = {
    isAuth: false,
    error: null,
    user: null
}
const authReducer = (state : authState = initialState, action: any): authState => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuth: true,
                error: null
            }
        case REGISTER_FAIL:
            return {
                ...state,
                user: null,
                isAuth: false,
                error: action.payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state, 
                user: action.payload, 
                isAuth: true, 
                error: null
            };
        case LOGIN_FAIL:
            return {
                ...state,
                user: null,
                isAuth: false,
                error: action.payload,
            };
        default:
            return state;
    }

}

export default authReducer