import React, {useContext, useEffect} from "react";
import AuthContext from "../context/auth/authContext";

const CheckAuth = () =>  {
    const authContext = useContext(AuthContext)
    const {getUser, serverStatus} = authContext;

    useEffect(() => {
        getUser()
        //eslint-disable-next-line
    }, [serverStatus])
    return('')
}

export default CheckAuth