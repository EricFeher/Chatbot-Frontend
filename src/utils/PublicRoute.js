import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import EndLoader from "../component/EndLoader";

const PublicRoute = ({ children, ...rest }) => {

    return (<>
        <Outlet/> <EndLoader/>
    </>)
}

export default PublicRoute;
