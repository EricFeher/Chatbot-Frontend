import React, {useEffect, useState, useContext} from 'react'
import { Outlet, useNavigate} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AuthenticationService from "../service/AuthenticationService";

const PrivateRoute = ({ children, ...rest }) => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    let [called, setCalled] = useState(false)


    const access = async () => {
        if(!called){
            called=true
            let result = await AuthenticationService.isAccessable(navigate,auth.setAuth)
            if(!result) return false
            return result;
        }
    }

    useEffect(()=>{
        access()
    },[])

    return (<>
        <Outlet/>
    </>)
}

export default PrivateRoute;
