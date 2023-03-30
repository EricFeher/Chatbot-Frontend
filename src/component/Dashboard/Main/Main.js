import { useState } from "react";
import { useEffect } from "react";
import EndLoader from "../../EndLoader";

function Main() {
  const [channel, setChannel] = useState(localStorage.getItem('username').toLowerCase())
  const [siteUrl, setSiteUrl] = useState("")

  useEffect(()=>{
    if(window.location.href.includes("localhost")){
      setSiteUrl("localhost")
    } else{
      setSiteUrl(process.env.REACT_APP_FRONTEND_URI.replace("https://",""))
    }
  },[])



    return (
      <>
      <div className="flex w-full h-full">
        <iframe
          className="w-3/4"
          src={`https://player.twitch.tv/?channel=${channel}&parent=${siteUrl}`}>
        </iframe>
        <iframe id="twitch-chat-embed"
          className="w-1/4"
          src={`https://www.twitch.tv/embed/${channel}/chat?parent=${siteUrl}`}
          sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-modals allow-same-origin"
          >
        </iframe>
      </div>
      <EndLoader/>
      </>
    );
  }
  
  export default Main;
  