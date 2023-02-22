import React, { useContext, useEffect, useState } from 'react'
import {AiOutlineHome} from 'react-icons/ai'
import {BiCategory, BiMessageRounded, BiLineChart} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import LoaderContext from '../../../context/LoaderContext'


function Sidebar() {

    const loader = useContext(LoaderContext)
    const navigate = useNavigate()
    
    let [page,setPage] = useState(null)

    useEffect(() =>{
        if(page!=null){
            let temp = page
            loader.load()
            setPage(null)
            navigate(`/dashboard/${page}`);
        }
    },[page])

  return (
    <>
        <aside className='fixed top-12 left-0 h-full w-16 bg-darkGray z-[800]'>
            <div className="flex justify-center items-center pt-3 w-full h-full">
                <div>
                    <div>
                        <hr className='w-10 border-1 rounded border-lightGray'/>
                    </div>
                    <div className="flex justify-center text-center items-center  pb-2 rounded-full w-10 h-10 hover:bg-lightGray hover:border-2 hover:border-activeFontColor cursor-pointer">
                        <AiOutlineHome className=' text-2xl text-activeFontColor'/>
                    </div>
                    <div onClick={() => setPage("alertbox")} className="flex justify-center text-center items-center pb-2 rounded-full w-10 h-10 hover:bg-lightGray hover:border-2 hover:border-activeFontColor cursor-pointer">
                        <BiCategory className=' text-2xl text-activeFontColor'/>
                    </div>
                    <div onClick={() => setPage("commands")} className="flex justify-center text-center items-center pb-2 rounded-full w-10 h-10 hover:bg-lightGray hover:border-2 hover:border-activeFontColor cursor-pointer">
                        <BiMessageRounded className=' text-2xl text-activeFontColor'/>
                    </div>
                    <div className="flex justify-center text-center items-center pb-2 rounded-full w-10 h-10 hover:bg-lightGray hover:border-2 hover:border-activeFontColor cursor-pointer">
                        <BiLineChart className=' text-2xl text-activeFontColor'/>
                    </div>
                    <div>
                        <hr className='w-10 border-1 rounded border-lightGray'/>
                    </div>

                </div>
            </div>
        </aside>
    </>
  );
}

export default Sidebar;
