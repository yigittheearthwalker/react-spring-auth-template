import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children, ...rest}) => {
    const authContext = useContext(AuthContext)
    const {isAuthenticated, authLoading} = authContext;
    
    if (authLoading) {
        return ''
    } else {
        return(
            isAuthenticated ? children : <Navigate to="/" />
        )
    }
}

export default PrivateRoute