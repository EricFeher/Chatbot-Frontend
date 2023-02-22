import { Link } from 'react-router-dom';
import React, { useContext } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import NavContext from '../../context/NavContext';
import LoaderContext from "../../context/LoaderContext";


const Sidebar = () => {
    const nav = useContext(NavContext);
    const loader = useContext(LoaderContext)

    
    return (
    <>
        <aside className={`z-[97] w-64 h-full fixed font-medium text-activeFontColor font-roboto text-2xl ease-in-out transition duration-300 bg-darkGray ${
        nav.showSidebar ? 'transform translate-x-0 ' : 'transform translate-x-[-256px]'}`}>
            
            <div className='pt-1 pl-1 z-[96]'>
                <div className='flex cursor-pointer hover:bg-lightGray rounded-full w-10 h-10 justify-center items-center'>
                    <GiHamburgerMenu onClick={()=>nav.setShowSidebar(!nav.showSidebar)} className='h-12'/>
                </div>
            </div>
            <nav className='flex justify-center w-full bg-transparent'>
                <ul className='space-y-5 '>
                    <li><Link to="/" onClick={loader.load}>Home</Link></li>
                    <li><Link to="/asd" onClick={loader.load}>asd</Link></li>
                    <li><Link to="/adas" onClick={loader.load}>Hodasdame</Link></li>
                </ul>
            </nav>  
        </aside>
    </>
  );
};

export default Sidebar;
