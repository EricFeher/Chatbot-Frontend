import { useLocation, useNavigate } from "react-router-dom";
import AuthenticationService from "../../service/AuthenticationService";
import { useEffect, useContext } from "react";
import { GridLoader  } from "react-spinners"
import LoaderContext from "../../context/LoaderContext";
import AuthContext from "../../context/AuthContext";

function Authentication() {
    const location = useLocation()
    const navigate = useNavigate()
    const code = new URLSearchParams(location.search).get('code');
    let called = false;

    const loader = useContext(LoaderContext);
    const auth = useContext(AuthContext);

    useEffect(()=>{
        const authentication = async () => {
            if(!called){
                loader.setLoader(true)
                called=!called
                await AuthenticationService.login(code)
                loader.setLoader(false)
                auth.setAuth(!!localStorage.getItem("access_token"))
                navigate('/')
            }
        }
        authentication()
    },[])
    
    return (
        <>
        </>
    );
  }
  
  export default Authentication;