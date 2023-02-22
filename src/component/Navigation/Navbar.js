import React, {useContext, useState} from 'react';
import TopNavbar from './TopNavbar';
import Sidebar from './Sidebar';
import Login from '../Login';
import AuthTopNavbar from "./AuthTopNavbar";
import AuthContext from "../../context/AuthContext";


const Navbar = () => {

    const auth = useContext(AuthContext)

    return (
    <>
          <Login/>
          {auth.auth ? <AuthTopNavbar/> : <TopNavbar/>}
          <Sidebar/>
      <div className='h-12'></div>
          
    </>
  );
};

export default Navbar;
