import { CHECKING_SERVER, SERVER_READY, SERVER_FAILED, AUTH_LOADING, USER_LOADED, AUTH_FAILED, LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL } from "../types";

const authReducer = (state, action) => {
    switch (action.type) {
        case SERVER_READY:
            return{
                ...state,
                checkingServer: false,
                serverStatus: true
            }
        case SERVER_FAILED:
            return{
                ...state,
                checkingServer: false,
                serverStatus: false
            }
        case CHECKING_SERVER:
            return{
                ...state,
                checkingServer: true,
                serverStatus: false
            }
        case AUTH_LOADING:
            return{
                ...state,
                authLoading: true
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
            }
        case USER_LOADED:
            return{
                ...state,
                authLoading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGIN_FAIL:
        case AUTH_FAILED:
        case LOGOUT:
            return{
                ...state,
                isAuthenticated: false,
                authLoading: false,
                token: null,
                user: null
            }
        default:
            break;
    }
}

export default authReducer