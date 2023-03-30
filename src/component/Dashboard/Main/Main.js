import { useEffect } from "react";
import EndLoader from "../../EndLoader";

function Main() {


  useEffect(()=>{

  },[])

    return (
      <>
      <div className="flex w-full h-full">
        <iframe
          className="w-3/4"
          src={`https://player.twitch.tv/?channel=${localStorage.getItem('username').toLowerCase()}&parent=localhost`}>
        </iframe>
        <iframe id="twitch-chat-embed"
          className="w-1/4"
          src={`https://www.twitch.tv/embed/${localStorage.getItem('username').toLowerCase()}/chat?parent=${process.env.REACT_APP_FRONTEND_LOCAL_URI.replace("http://","").replace(":3000","")}`}
          sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-modals allow-same-origin"
          >
        </iframe>
      </div>
      <div>
        <card>
          adssa
        </card>
      </div>
      <EndLoader/>
      </>
    );
  }
  
  export default Main;
  