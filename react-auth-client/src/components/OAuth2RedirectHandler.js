import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const OAuth2RedirectHandler = () => {
    console.log('hello');
    
    const queryParams = useLocation().search;
    const getUrlParameter = (value) => {
        value = value.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + value + '=([^&#]*)');

        var results = regex.exec(queryParams);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const token = getUrlParameter('token');
    if (token) {
        console.log(token);
        localStorage.setItem('token', token);
        return <Navigate to='/user' />;
    } else {
        return <Navigate to='/' />;
    }
}

export default OAuth2RedirectHandler
