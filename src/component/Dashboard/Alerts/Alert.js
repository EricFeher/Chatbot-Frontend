import { Routes, Route, useNavigate } from 'react-router-dom'
import {BiCopyAlt} from 'react-icons/bi'
import PageNotFound from '../../NotFound';
import AlertType from './Types/AlertType';
import LoaderContext from '../../../context/LoaderContext';
import { useContext, useEffect, useState } from 'react';
import ChannelPointType from './Types/ChannelPointTpye';
import BasicFunctions from '../../../utils/BasicFunctions';


function Alert() {

  const loader = useContext(LoaderContext)
  const navigate = useNavigate()
  
  let [page,setPage] = useState(null)

  useEffect(() =>{
      if(page!=null){
          let temp = page
          setPage(null)
          navigate(`/dashboard/alertbox/${temp}`);
      }
  },[page])

    return (
      <>
      <div className="flex justify-center text-center p-3">
        <div className="w-full">
          <h1 className=' text-activeFontColor text-3xl font-bold'>Alert Box</h1>
          <div className="w-full h-12 flex justify-center items-center">
            <div className="flex justify-left p-2 items-center w-[50rem] h-8 bg-darkGray rounded-l-lg">
              <div className='blur-sm text-activeFontColor text-clip overflow-hidden scrollbar'>
              {`${BasicFunctions.getCorrectFrontendUrl()}/alerts/${localStorage.getItem("id")}`}
              </div>
              
            </div>
            <div onClick={() => {navigator.clipboard.writeText(`${BasicFunctions.getCorrectFrontendUrl()}/alerts/${localStorage.getItem("id")}`)}}
             className="flex justify-center items-center w-[6rem] h-8 bg-activeFontColor rounded-r-lg active:bg-passiveFontColor cursor-pointer">
              <BiCopyAlt/>
            </div>
          </div>
          <div className="w-full flex justify-center pb-5">
            <div className="h-10 flex space-x-2 overflow-scroll scrollbar text-activeFontColor text-sm p-1 rounded w-[56rem]">
              <div onClick={() => setPage("follow")} className="flex items-center justify-center text-center h-full hover:bg-lightGray cursor-pointer w-32 min-w-32 bg-darkGray rounded-md border-2 border-darkGray">
                <span className="">
                  Follow
                </span>
              </div>
              
              <div onClick={() => setPage("subscription")} className="flex items-center justify-center text-center h-full hover:bg-lightGray cursor-pointer w-32 min-w-32 bg-darkGray rounded-md border-2 border-darkGray">
                <span className="">
                Subscription
                </span>
              </div>
              
              <div onClick={() => setPage("resub")} className="flex items-center justify-center text-center h-full hover:bg-lightGray cursor-pointer w-32 min-w-32 bg-darkGray rounded-md border-2 border-darkGray">
                <span className="">
                Resub
                </span>
              </div>
              
              <div onClick={() => setPage("subgift")} className="flex items-center justify-center text-center h-full hover:bg-lightGray cursor-pointer w-32 min-w-32 bg-darkGray rounded-md border-2 border-darkGray">
                <span className="">
                Subgift
                </span>
              </div>
              
              <div onClick={() => setPage("cheer")} className="flex items-center justify-center text-center h-full hover:bg-lightGray cursor-pointer w-32 min-w-32 bg-darkGray rounded-md border-2 border-darkGray">
                <span className="">
                Cheer
                </span>
              </div>
              
              <div onClick={() => setPage("raid")} className="flex items-center justify-center text-center h-full hover:bg-lightGray cursor-pointer w-32 min-w-32 bg-darkGray rounded-md border-2 border-darkGray">
                <span className="">
                Raid
                </span>
              </div>
           
              <div onClick={() => setPage("channelpoints")} className="flex items-center justify-center text-center h-full hover:bg-lightGray cursor-pointer w-32 min-w-32 bg-darkGray rounded-md border-2 border-darkGray">
                <span className="">
                ChannelPoints
                </span>
              </div>
            </div>
          </div>
          <Routes>
            <Route>
                <Route path='/' element={<AlertType type="Follow" />}/>
                <Route path='/follow' element={<AlertType type="Follow" />}/>
                <Route path='/subscription' element={<AlertType type="Subscription" />}/>
                <Route path='/resub' element={<AlertType type="Resub" tts="" />}/>
                <Route path='/subgift' element={<AlertType type="Subgift" />}/>
                <Route path='/cheer' element={<AlertType type="Cheer" tts="" />}/>
                <Route path='/raid' element={<AlertType type="Raid" />}/>
                <Route path='/channelpoints' element={<ChannelPointType/>}/>
                <Route path='*' element={<PageNotFound/>}/>
            </Route>
        </Routes>
        </div>
      </div>
      </>
    );
  }
  
  export default Alert;
  