import React, { useReducer } from "react";
import AuthContext from './authContext'
import authReducer from './authReducer'
import axios from "axios";
import { API_BASE_URL } from "../../utils/urlHelpers";
import setAuthToken from "../../utils/setAuthToken";

import {
    CHECKING_SERVER,
    SERVER_READY,
    SERVER_FAILED,
    AUTH_LOADING,
    AUTH_FAILED,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGOUT,
    LOGIN_FAIL
} from "../types";

const AuthState = props => {
    const initialState = {
        serverStatus: false,
        checkingServer: false,
        isAuthenticated: false,
        authLoading: true,
        token: localStorage.getItem('token'),
        user: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const checkServerStatus = () => {
        dispatch({
            type: CHECKING_SERVER
        })
        var config = {
            method: 'get',
            url: API_BASE_URL + '/test',
            headers: {}
        };

        axios(config)
            .then(function (response) {
                dispatch({
                    type: SERVER_READY
                })
            })
            .catch(function (error) {
                dispatch({
                    type: SERVER_FAILED
                })
            });
    }

    const submitLogin = (email, password) => {
        var config = {
            method: 'POST',
            url: API_BASE_URL + '/auth/signup',
            headers: {
                'Content-type': 'application/json',
                'Accept': '*'
            },
            data: { email, password }
        }

        axios(config)
            .then((response) => {
                localStorage.setItem('token', response.data.accessToken);
                delete response.data.jwt
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response.data
                })
                getUser()
            })
            .catch((error) => {
                dispatch({
                    type: LOGIN_FAIL,
                })
            })
    }

    const getUser = () => {
        dispatch({ type: AUTH_LOADING })
        if (localStorage.getItem('jwt')) {
            setAuthToken(localStorage.getItem('jwt'))
        }

        var config = {
            method: 'GET',
            url: API_BASE_URL + '/user/me',
            headers: {
                'Content-type': 'application/json',
                'Accept': '*',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        axios(config)
            .then((response) => {
                dispatch({
                    type: USER_LOADED,
                    payload: response.data
                })

            })
            .catch((error) => {
                dispatch({
                    type: AUTH_FAILED
                })
            })
    }

    const logout = () => {
        localStorage.removeItem('token');

        dispatch({ type: LOGOUT })
    }
    return (
        <AuthContext.Provider
            value={{
                serverStatus: state.serverStatus,
                checkingServer: state.checkingServer,
                isAuthenticated: state.isAuthenticated,
                authLoading: state.authLoading,
                token: state.token,
                user: state.user,
                checkServerStatus: checkServerStatus,
                submitLogin: submitLogin,
                getUser: getUser,
                logout: logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState