import { useContext, useEffect, useRef, useState } from "react";
import EndLoader from "../EndLoader";
import NavContext from "../../context/NavContext";

function AlertType() {

    const navContext = useContext(NavContext)
    const [socket, setSocket] = useState(null);
    let [init, setInit] = useState(true);
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    let [ttsAudioLoaded, setTtsAudioLoaded] = useState(false)
    let [soundAudioLoaded, setSoundAudioLoaded] = useState(false)
    const [imageSrc, setImageSrc] = useState("")

    const imageRef = useRef(null)

    useEffect(() => {
        if(init){
            document.documentElement.style="margin: 0px; background-color: transparent;"
            document.body.style="margin: 0px; background-color: transparent;"
            init = false;
            navContext.setNavbarVisible(false)
            connectToWebSocket()
            return () => {
                let interval = setInterval(() =>{
                    if(socket!==null){
                        socket.close();
                        clearInterval(interval);
                    }
                },100)
            };
        }
    }, [])

    const connectToWebSocket = async () => {
        const newSocket = await new WebSocket(`ws://localhost:8000`);

        newSocket.onopen = () => {
            console.log('WebSocket connected');
            let url = window.location.pathname.split('/').pop() === '' ? window.location.pathname.slice(0,-1) : window.location.pathname
            let userid = url.split('/').pop()
            newSocket.send(`Connect:${userid}`)
          };
      
        newSocket.onmessage = (event) => {
            let data = JSON.parse(event.data.toString())
            setTtsAudioLoaded(false)
            setSoundAudioLoaded(false)
            decideEventType(data)
        };
      
        setSocket(newSocket);
        
    }

    const decideEventType = (data) =>{
        
        //TODO: Channel Points
        if(data.data.type==="channelPoints"){
            sayTtsForChannelPoints(data)
        } else if(data.data.type==="resub"){
            data.event.message = data.event.message.text
            showAlertBox(data)
        }
        else{
            showAlertBox(data)
        }

    }

    const sayTtsForChannelPoints = (data) =>{
        let message = `${data.event.user_name} said: ${data.event.user_input}`
        let url = `${process.env.REACT_APP_BACKEND_LOCAL_URI}/alertBoxTts?text=${encodeURIComponent(message)}`
         
        let ttsAudio = getSoundData(url, data.data.ttsVolume, "tts")

        let waitForTts = setInterval(()=>{
            if(ttsAudioLoaded){
                ttsAudio.play()
                clearInterval(waitForTts)
            }
        },50)
    }

    const showAlertBox = (data) => {
        setImageSrc(data.data.imageUrl);
        let soundAudio = getSoundData(data.data.audioUrl, data.data.volume , "sound")
        let url = `${process.env.REACT_APP_BACKEND_LOCAL_URI}/alertBoxTts?text=${encodeURIComponent(data.event.message)}`
        let ttsAudio = data.data.ttsVolume ? getSoundData(url, data.data.ttsVolume || 0, "tts") : new Audio('')
        let soundEnded = false
        soundAudio.onended = () => {
            soundEnded=true
        }

        soundAudio.onpause = () => {
            soundEnded=true
        }

        editText(data)

        setMessage(data.data.message)

        let duration = parseInt(data.data.duration)

        let wait = setInterval(()=>{
            if(imageRef.current.complete && soundAudioLoaded){
                soundAudio.play()
                setShowAlert(true)
                let intreval = setInterval(()=>{
                    setShowAlert(false)
                    soundAudio.pause()
                    soundAudio.currentTime = 0
                    //soundEnded = true
                    clearInterval(intreval)
                }, duration*1000)
                clearInterval(wait)
            }
        },50)

        if(typeof data.data.ttsVolume === "string"){
            let waitForTts = setInterval(()=>{
                if(ttsAudioLoaded && soundEnded){
                    setTimeout(()=>{
                        soundEnded=false
                        ttsAudio.play()
                        clearInterval(waitForTts)
                    },200)
                }
            },50)
        }
    }

    
        
    const editText = (data) => {
        const eventUser = data.event.user_name || data.event.from_broadcaster_user_name || ""
        const eventAmount = data.event.bits || data.event.viewers || data.event.total || ""
        
        data.data.message = data.data.message.replace('{user}', eventUser)
        data.data.message = data.data.message.replace('{amount}', eventAmount)
    }


    const getSoundData = (url, volume, type) =>{
        const audio = new Audio(url)
        audio.volume = parseInt(volume)/100.0 || 0
        audio.volume = parseInt(volume)/100.0 || 0

        audio.addEventListener('canplaythrough', () => {
            if(type==="sound"){
                soundAudioLoaded=true
            } else{
                ttsAudioLoaded=true
            }
          });
        audio.addEventListener('ended', () => {
            if(type==="sound"){
                soundAudioLoaded=false
            } else{
                ttsAudioLoaded=false
            }
        });
        audio.addEventListener('paused', () => {
            if(type==="sound"){
                soundAudioLoaded=false
            } else{
                ttsAudioLoaded=false
            }
        });
        return audio
    }

    return (
      <>
      <EndLoader/>
      <div className={`w-screen h-screen flex justify-center items-center`}>
        <div className={`${showAlert ? "opacity-100" : "opacity-0" } transition-opacity duration-3000 ease-in-out flex max-h-[30rem] w-full`}>
            <img ref={imageRef} className="p-3 w-[30vw]" src={imageSrc}/>
            <div className="flex items-center text-[6vw] w-[70vw] font-extrabold text-activeFontColor break-words font-stroke-black">{message}</div>
        </div>
      </div>
      </>
    );
  }

export default AlertType;
  