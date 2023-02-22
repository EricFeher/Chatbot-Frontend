import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import AuthenticationService from "../../../service/AuthenticationService";
import CommandService from "../../../service/CommandService";
import EndLoader from "../../EndLoader";
import EditCommand from "./EditCommand";
import { MdModeEditOutline } from "react-icons/md"
import { BsTrashFill } from "react-icons/bs"
import CommandContext from "../../../context/CommandContext";


function Commands() {

    const authContext = useContext(AuthContext)
    let [fetched, setFetched] = useState(false)
    let [called, setCalled] = useState(false)
    let [data, setData] = useState([])
    let [isEditOpen, setIsEditOpen] = useState(false)
    let navigate = useNavigate()

    let [message, setMessage] = useState("")
    let [command, setCommand] = useState("")

    useEffect(()=>{
        if(!called) {
            called = true
            fetchData()
        }
    },[])

    const fetchData = async () => {
        let data = { userid: localStorage.getItem('id')}
        await AuthenticationService.isAccessable(navigate,authContext.setAuth)
        let result = await CommandService.getCommands(data)
        setData(result.data?.data)
        setFetched(true)
    }

    const onEditCommand = (message, command) => {
        setMessage(message)
        setCommand(command)
        setIsEditOpen(true)
    }

    const deleteCommand = async (command) => {
        let cmdData = { userid: localStorage.getItem('id'), command}
        await AuthenticationService.isAccessable(navigate,authContext.setAuth)
        let result = await CommandService.deleteCommand(cmdData)
        let newData = data.filter(element => {return element.command !== command})
        setData(newData)
    }

    return (
      <>
      <div className="flex justify-center text-center p-3">
        <div className="w-full">
          <h1 className='text-activeFontColor text-3xl font-bold'>Commands</h1>
          
            <div className="shadow-md rounded-lg p-3">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-passiveFontColor uppercase bg-darkGray">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Command
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Message
                            </th>
                            <th scope="col" className="px-6 py-3">  
                                <div onClick={() => onEditCommand("","")} className="flex justify-center text-center items-center h-6 w-16 border-2 border-lightGray hover:bg-lightGray cursor-pointer">
                                    <button >NEW</button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-xs text-passiveFontColor">
                        {data.map(element => (
                        <tr key={element.command} className="border-black border-b">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                {element.command}
                            </th>
                            <td className="px-6 py-4">
                                {element.result}
                            </td>
                            <td className="px-6 py-4 flex">
                                <div onClick={()=> onEditCommand(element.result, element.command)} className="flex justify-center text-center items-center h-6 w-6 hover:bg-darkGray rounded-full cursor-pointer">
                                    <MdModeEditOutline className="text-lg"/>
                                </div>
                                
                                <div onClick={()=> deleteCommand(element.command)} className="flex justify-center text-center items-center h-6 w-6 hover:bg-darkGray rounded-full cursor-pointer">
                                    <BsTrashFill className="text-base" />
                                </div>
                                
                                
                            </td>
                        </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
      </div>
      <CommandContext.Provider value={{message, command, setIsEditOpen, data, setData}}>
        { isEditOpen ? <EditCommand/> : <></>}
      </CommandContext.Provider>
      
      {fetched ? <EndLoader/> : <></>}
      </>
    );
  }
  
export default Commands;
  