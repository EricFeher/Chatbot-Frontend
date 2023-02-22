import axios from "axios"

const login = async (code) => {
    let response
    const data = {
        code: code,
    }
    try{
        response = await axios.post(process.env.REACT_APP_BACKEND_LOCAL_URI+"/auth",{data},{withCredentials: true})
    }catch(error){
        console.log(error.response)
        return
    }
    //NOTE: LOGIN WAS SUCCESSFUL
    localStorage.setItem("access_token", response.data.access_token)
    localStorage.setItem("username", response.data.user.displayName)
    localStorage.setItem("picture", response.data.user.picture)
    localStorage.setItem("id", response.data.user.id)
}

const logout = async (navigate, setAuth) => {
    let response = await axios.post(process.env.REACT_APP_BACKEND_LOCAL_URI+"/deleteSession",null, {withCredentials:true })
    console.log(response);
    localStorage.removeItem("access_token")
    localStorage.removeItem("username")
    localStorage.removeItem("picture")
    localStorage.removeItem("id")
    setAuth(false);
    navigate("/");
}

const isAccessable = async (navigate, setAuth) => {
    let accessToken = localStorage.getItem("access_token")
    try{
        let response = await axios.post(process.env.REACT_APP_BACKEND_LOCAL_URI+"/validateSession", {accessToken},{withCredentials: true})
        localStorage.setItem("access_token", response.data.access_token)
        return true;
    }catch (error){
        console.log(error)
        logout(navigate, setAuth)
        return false
    }
}

const AuthenticationService = {
    login,
    logout,
    isAccessable
}

export default AuthenticationService