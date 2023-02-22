import LoaderContext from "../context/LoaderContext";
import {useContext, useEffect} from "react";

function EndLoader() {
    const loader = useContext(LoaderContext);

    useEffect(()=>{
        loader.setLoader(false)
    })
    return (<></>);
}

export default EndLoader;