
const getCorrectBackendUrl = () => {
    if(window.location.href.includes("localhost")){
        return process.env.REACT_APP_BACKEND_LOCAL_URI
    }
    return process.env.REACT_APP_BACKEND_URI
    
}

const getCorrectFrontendUrl = () => {
    if(window.location.href.includes("localhost")){
        return process.env.REACT_APP_FRONTEND_LOCAL_URI
    }
    return process.env.REACT_APP_FRONTEND_URI
    
}

const getCorrectAuthUrl = () => {
    if(window.location.href.includes("localhost")){
        return process.env.REACT_APP_TWITCH_AUTH_LOCAL
    }
    return process.env.REACT_APP_TWITCH_AUTH_GLOBAL
}

const getCorrectWebsocketUrl = () => {
    if(window.location.href.includes("localhost")){
        return "ws://"+process.env.REACT_APP_WEBSOCKET_LOCAL_URI
    }
    return "wss://"+process.env.REACT_APP_WEBSOCKET_URI
}


const BasicFunctions = {
    getCorrectBackendUrl,
    getCorrectFrontendUrl,
    getCorrectWebsocketUrl,
    getCorrectAuthUrl
}

export default BasicFunctions