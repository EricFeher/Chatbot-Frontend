import React, {useContext, useState} from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { SlLogout } from 'react-icons/sl'
import NavContext from '../../context/NavContext';
import AuthenticationService from "../../service/AuthenticationService";
import { useNavigate } from "react-router-dom";
import AuthContext from '../../context/AuthContext';

const TopNavbar = () => {
    const nav = useContext(NavContext);
    const auth = useContext(AuthContext);
    const navigate = useNavigate()

    let [picture, setPicture] = useState(localStorage.getItem("picture"))
    let [username, setUsername] = useState(localStorage.getItem("username"))
    return (
        <>
            <div className='fixed h-12 w-full z-[95]'>
                <nav className="w-full h-full bg-darkGray text-activeFontColor font-roboto text-2xl">
                    <div className='flex h-full w-full'>
                        <div className='pt-1 pl-1'>
                            
                        <div onClick={()=>AuthenticationService.logout(navigate, auth.setAuth)} className='w-10 h-10 rounded-3xl hover:bg-lightGray hover:cursor-pointer items-center justify-center flex'>
                                    <SlLogout className='text-center'/>
                                </div>
                        </div>
                        <div className='space-x-5 h-full w-full flex items-center'>
                            <div className='flex w-full justify-end space-x-2 pr-2'>
                                <div className='w-auto h-10 items-center justify-center flex'>
                                    <span className='text-center text-base'>{username}</span>
                                </div>

                                <div className='w-10 h-10 hover:cursor-pointer items-center justify-center flex'>
                                    <img src={picture} alt="Profile Picture" className="mx-auto rounded-3xl w-8 h-8 border-2 "/>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default TopNavbar;
