import { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../context/AuthContext";
import AlertboxService from "../../../../service/AlertboxService";
import AuthenticationService from "../../../../service/AuthenticationService";
import EndLoader from "../../../EndLoader";
import ErrorContext from "../../../../context/ErrorContext";

function ChannelPointType() {

    const authContext = useContext(AuthContext)
    const errorContext = useContext(ErrorContext)

    const [ttsVolume, setTtsVolume] = useState(80)
    const navigate = useNavigate()
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData()
        data.append("tts", ttsVolume)
        data.append("type","channelPoints")
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
        setTtsVolume(80)
      }

      const handleTtsChange = (e) => {
        setTtsVolume(e.target.value)
      }

    return (
      <>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="text-activeFontColor w-full">
            <h1 className=' text-activeFontColor text-2xl font-bold pb-3'>Channel Points</h1>
            <div>To use Channel Points to read text when redeemed, just name one redemption "Read Message".</div>
            <div className="flex justify-start text-left">
                <div className="w-1/3 font-medium ">
                    <div className="h-8 mb-2 pr-2 justify-end align-middle flex">TTS Volume: {ttsVolume}%</div>    
                </div>
                <div className="w-2/3">
                    <div className="flex justify-start w-full pb-2">
                        <div className="max-w-[56rem] w-full">
                            <input name="tts" type="range" value={ttsVolume} onChange={handleTtsChange} className="w-5/6 h-2 bg-darkGray rounded-lg appearance-none cursor-pointer range-lg"></input>
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
      <EndLoader/>
      </>
    );
  }

export default ChannelPointType;
  