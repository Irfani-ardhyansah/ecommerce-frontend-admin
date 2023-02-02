import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from "jwt-decode"

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('dataLogin')
    const alert = {status: false, message: 'You are not authenticated yet!'}

    if(isAuthenticated) {
        const token     = JSON.parse(isAuthenticated).token
        const decoded   = jwt_decode(token)
        const dateNow   = new Date() 

        if(decoded.exp < dateNow / 1000) {
            const alert_exp = {...alert, name: {status:false, message: 'You\'r token is expired'}}
            localStorage.clear()
            return <Navigate to="/" state={{alert_exp}} />
        } else {
            return <Outlet />
        }
    } else {
        return <Navigate to="/" state={{alert}} />
    }
}

export default ProtectedRoute;