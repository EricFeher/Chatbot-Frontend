import React, {useContext} from 'react'
import { useNavigate } from "react-router-dom";
import EndLoader from "../EndLoader";
import NavContext from '../../context/NavContext';
import AuthContext from '../../context/AuthContext';
import LoaderContext from '../../context/LoaderContext';

const Home = () => {

    const navigate = useNavigate()
    const nav = useContext(NavContext);
    const auth = useContext(AuthContext);
    const loader = useContext(LoaderContext);

    const toDashboard = () => {
        loader.load();
        navigate('/dashboard');
    }

    return (
        <>
            <div className="overflow-hidden h-screen relative flex items-center text-center justify-center z-[2]">
                <video className=" blur-sm min-w-[1920px] w-full min-h-screen absolute top-0 left-1/2 -translate-x-1/2 z-[1] opacity-100" src="/assets/videos/markacerV1.mp4" muted loop autoPlay playsInline preload="metadata"/>
                <div className="w-full h-full relative z-[3] text-activeFontColor">
                    <div className="flex items-center text-center justify-center space-y-2 h-full w-full bg-gradient-to-t from-lightGray via-transparent to-darkGray">
                        <div className='w-full'>
                            <h1 className='font-playfair text-6xl text-border'>Namebot</h1>
                            <h2 className='font-playfair text-2xl text-passiveFontColor'>The #1 chatbot in Twitch</h2>
                            <div className='w-full h-8  flex justify-center items-center'>
                                <div onClick={()=>{auth.auth ? toDashboard() : nav.setLoginOpen(true)}} className=' cursor-pointer h-full w-36 bg-darkGray flex justify-center items-center border-2 rounded-full'>
                                    {auth.auth ?<span>Go to Dashboard</span> :<span>Get Started</span>}
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
            <EndLoader/>
        </>



    )
}

export default Home