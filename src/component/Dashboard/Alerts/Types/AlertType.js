import { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../context/AuthContext";
import AlertboxService from "../../../../service/AlertboxService";
import AuthenticationService from "../../../../service/AuthenticationService";
import EndLoader from "../../../EndLoader";
import ErrorContext from "../../../../context/ErrorContext";
import {HiInformationCircle} from "react-icons/hi"

function AlertType(props) {

    const followURI = `${process.env.REACT_APP_BACKEND_LOCAL_URI}/editFollow`
    const authContext = useContext(AuthContext)
    const errorContext = useContext(ErrorContext)

    const [volume, setVolume] = useState(80)
    const [duration, setDuration] = useState(10)
    const [ttsVolume, setTtsVolume] = useState(80)
    const [tooltip, setTooltip] = useState("")
    let image = useRef(null)
    let audio = useRef(null)
    let message = useRef(null)
    const navigate = useNavigate()
    
    useEffect(()=>{
        switch(props.type) {
            case "Resub":
                setTooltip("Use {user} to show username in message and {amount} to show months subscribed.")
            break
            case "Cheer":
                setTooltip("Use {user} to show username in message and {amount} to show cheer amount.")
            break
            case "Raid":
                setTooltip("Use {user} to show username in message and {amount} to show viewer amount.")
            break
            default:
                setTooltip("Use {user} to show username in message.")
            
        }
    },[props.type])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = e.target[0].value
        const image = e.target[1].files[0]
        const audio = e.target[2].files[0]
        
        const data = new FormData()
        data.append("message",message)
        data.append("audio",audio)
        data.append("volume",volume)
        data.append("image",image)
        data.append("duration",duration)
        data.append("type",props.type.toLowerCase())
        if(props.tts !== undefined) data.append("tts", ttsVolume)
        data.append("id", localStorage.getItem("id"))
        data.append("accessToken", localStorage.getItem("access_token"))
        setDefault()
        await AuthenticationService.isAccessable(navigate,authContext.setAuth)
        const res = await AlertboxService.alertboxFollowChange(data);
        if(res.data.status !== 200){
            errorContext.setError(res.data.message)
            errorContext.setIsError(true)
            return
        }
    }

      const setDefault = () => {
        setVolume(80);
        setDuration(10);
        image.current.value = null
        audio.current.value = null
        message.current.value = ""
      }

      const handleVolumeChange = (e) => {
        setVolume(e.target.value)
      }

      const handleDurationChange = (e) => {
        setDuration(e.target.value)
      }

      const handleTtsChange = (e) => {
        setTtsVolume(e.target.value)
      }

    return (
      <>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="text-activeFontColor w-full">
            <h1 className=' text-activeFontColor text-2xl font-bold pb-3'>{props.type}</h1>
            <div className="flex justify-start text-left">
                <div className="w-1/3 font-medium ">
                    <div className="h-8 mb-2 pr-2 justify-end align-middle flex">
                        <div  className="text-activeFontColor tooltip flex space-x-3">
                            <div className="flex justify-center align-middle"><HiInformationCircle/></div>
                            <div className="tooltiptext">{tooltip}</div>
                        </div>
                        Message:
                    </div>
                    <div className="h-8 mb-2 pr-2 justify-end align-middle flex ">Image:</div>
                    <div className="h-8 mb-2 pr-2 justify-end align-middle flex ">Audio:</div>
                    <div className="h-8 mb-2 pr-2 justify-end align-middle flex">Volume: {volume}%</div>
                    <div className="h-8 mb-2 pr-2 justify-end align-middle flex">Duration: {duration}s</div>
                    {props.tts !== undefined ? <div className="h-8 mb-2 pr-2 justify-end align-middle flex">TTS Volume: {ttsVolume}%</div>
                    : <></>}
                </div>
                <div className="w-2/3">
                    <div className="flex justify-start w-full">
                        <div className="max-w-[56rem] w-full pb-2">
                            <input ref={message} name="message" type="text" placeholder="Thank you dear {user}" className="w-5/6 h-8 bg-darkGray rounded-sm border border-activeFontColor p-2"/>
                        </div>
                    </div>
                    <div className="flex justify-start w-full pb-2">
                        <div className="max-w-[56rem] w-full">
                            <input ref={image} name="image" type="file" accept="image/gif" className="w-5/6 h-8 bg-darkGray rounded-sm border border-activeFontColor"/>
                        </div>
                    </div>
                    <div className="flex justify-start w-full pb-2">
                        <div className="max-w-[56rem] w-full">
                            <input ref={audio} name="audio" type="file" accept="audio/mp3" className="w-5/6 h-8 bg-darkGray rounded-sm border border-activeFontColor"/>
                        </div>
                    </div>
                    <div className="flex justify-start w-full pb-4">
                        <div className="max-w-[56rem] w-full">
                            <input name="volume" type="range" value={volume} onChange={handleVolumeChange} className="w-5/6 h-2 bg-darkGray rounded-lg appearance-none cursor-pointer range-lg"></input>
                        </div>
                    </div>
                    <div className="flex justify-start w-full pb-4">
                        <div className="max-w-[56rem] w-full">
                            <input name="volume" type="range" value={duration} onChange={handleDurationChange} className="w-5/6 h-2 bg-darkGray rounded-lg appearance-none cursor-pointer range-lg"></input>
                        </div>
                    </div>
                    {props.tts !== undefined ? <>
                        <div className="flex justify-start w-full pb-2">
                            <div className="max-w-[56rem] w-full">
                                <input name="tts" type="range" value={ttsVolume} onChange={handleTtsChange} className="w-5/6 h-2 bg-darkGray rounded-lg appearance-none cursor-pointer range-lg"></input>
                            </div>
                        </div>
                    </> : <></>}
                </div>
            </div>
            <div className="flex justify-center w-full">
                <div className="w-16 h-8 hover:bg-darkGray cursor-pointer border-2 rounded-md border-darkGray">
                    <input className="cursor-pointer" type="submit" value="Save"/>
                </div>
            </div>
        </form>
      </div>
      <EndLoader/>
      </>
    );
  }

export default AlertType;
  