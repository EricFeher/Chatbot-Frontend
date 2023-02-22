import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import AuthenticationService from "../../../service/AuthenticationService";
import CommandService from "../../../service/CommandService";
import { MdClose } from 'react-icons/md'
import { useEffect } from "react";
import CommandContext from "../../../context/CommandContext";
import ErrorContext from "../../../context/ErrorContext";


function EditCommand() {

    const authContext = useContext(AuthContext)
    const commandContext = useContext(CommandContext)
    const errorContext = useContext(ErrorContext)
    let navigate = useNavigate()

    let message = useRef(null)
    let command = useRef(null)

    let [isNewEntry, setIsNewEntry] = useState(false)  
    
    useEffect(()=>{
        message.current.value = commandContext.message || ""
        if(commandContext.command === ""){
            setIsNewEntry(true)
        }

    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const msg = message.current.value

        let command = isNewEntry ? e.target[0].value : commandContext.command
        command = (command[0]==='!' ? "": "!" )+command.replaceAll(" ","")

        const data = new FormData()
        data.append("message",msg)
        data.append("command",command)
        data.append("userid", localStorage.getItem("id"))
        await AuthenticationService.isAccessable(navigate,authContext.setAuth)
        let res = await CommandService.setCommand(data);
        if(res.data.status !== 200){
            errorContext.setError(res.data.message)
            errorContext.setIsError(true)
            return
        }
        let refreshedData = commandContext.data.filter(element => {
            return element.command !== commandContext.command
        })
        refreshedData.push({result:msg,command})
        commandContext.setData(refreshedData)

        commandContext.setIsEditOpen(false)
    }


    return (
      <>
        <div className='fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 z-[901]'>
            <div className='w-full h-full flex items-center justify-center'>
                <div className='bg-lightGray bg-opacity-100 w-96 h-52 border text-activeFontColor space-y-3 z-[101]'>
                    <div onClick={()=> commandContext.setIsEditOpen(false)} className='flex justify-end pr-1 pt-1'>
                        <MdClose className='fill-activeFontColor hover:cursor-pointer hover:bg-darkGray rounded-full'/>
                    </div>
                    <form onSubmit={handleSubmit} className="text-activeFontColor w-full text-center">
                        {isNewEntry ? <h1 className=' text-activeFontColor text-xl font-bold pb-3'>Add a new one</h1> :
                        <h1 className=' text-activeFontColor text-xl font-bold pb-3'>Edit: {commandContext.command}</h1>}
                        <div className="flex justify-start text-left">
                            <div className="w-1/3 font-medium ">
                                {isNewEntry ? <div className="h-8 mb-2 pr-2 justify-end align-middle flex ">Command:</div> :<></>}
                                <div className="h-8 mb-2 pr-2 justify-end align-middle flex ">Message:</div>
                            </div>
                            <div className="w-2/3">
                                {isNewEntry ? <div className="flex justify-start w-full">
                                    <div className="max-w-[56rem] w-full pb-2">
                                        <input ref={command} name="message" type="text" className="w-5/6 h-8 bg-darkGray rounded-sm border border-activeFontColor"/>
                                    </div>
                                </div> : <></>}
                                <div className="flex justify-start w-full">
                                    <div className="max-w-[56rem] w-full pb-2">
                                        <input ref={message} name="message" type="text" className="w-5/6 h-8 bg-darkGray rounded-sm border border-activeFontColor"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center w-full">
                            <div className="w-16 h-8 hover:bg-darkGray cursor-pointer border-2 rounded-md border-darkGray">
                                <input className="cursor-pointer" type="submit" value="Save"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div onClick={()=> commandContext.setIsEditOpen(false)} className='fixed w-screen h-screen z-[900] bg-black bg-opacity-60 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2'></div>
      </>
    );
  }
  
export default EditCommand;
  