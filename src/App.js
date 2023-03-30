import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './component/Navigation/Navbar';
import Home from './component/Home/Home';
import NotFound from './component/NotFound';
import Authentication from './component/Auth/Authentication';
import {useRef, useState} from "react";
import LoaderContext from "./context/LoaderContext";
import AuthContext from "./context/AuthContext";
import Loader from "./component/Loader";
import Login from "./component/Login";
import NavContext from './context/NavContext';
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from './utils/PublicRoute';
import Dashboard from './component/Dashboard/Dashboard';
import Alerts from './component/Alerts/Alerts';
import { useEffect } from 'react';
import ErrorContext from './context/ErrorContext';
import ErrorModal from './component/Modal/ErrorModal';

function App() {
  let [loader,setLoader] = useState(true)
  let [auth,setAuth] = useState(!!localStorage.getItem("access_token"))
  let [isError, setIsError] = useState(false);
  let [navbarVisible, setNavbarVisible] = useState(true);
  let [error, setError] = useState("This is the default error message");

  
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const loaderRef = useRef(null)

  const loaderStyle = () => {
    if(loader){
      if(!loaderRef.current.classList.contains("hidden")) return
      loaderRef.current.classList.replace("hidden","")
    } else{
      setTimeout(()=>(loaderRef.current.classList+=" hidden"),500);
    }
  }

  useEffect(()=>{
    loaderStyle()
  },[loader])

  const load = () =>{
    setLoader(true);
    setShowSidebar(false)
}

  return (
    <>
    <BrowserRouter> 
    <NavContext.Provider value={{showSidebar,setShowSidebar,isLoginOpen,setLoginOpen, navbarVisible, setNavbarVisible}}>
      <LoaderContext.Provider value={{loader,setLoader,loaderStyle,load}}>
        <AuthContext.Provider value={{auth,setAuth}}>
          <ErrorContext.Provider value={{error,isError,setError,setIsError}}>

          <div ref={loaderRef}
              className={`fixed top-0 right-0 w-full h-full z-[999] ${
              loader ? 'opacity-100 block' : 'transition-opacity duration-500 ease-out opacity-0'}`}
               >
              
            <Loader/>
          </div>

          <div className="w-full h-full overflow-hidden scrollbar">
            {auth ? (navbarVisible ? <Navbar/> : <></>) : <Login/>}
            {isError ? <ErrorModal/> : <></>}
            <Routes>
              <Route element={<PublicRoute/>}>
                <Route path='/' element={<Home />} />
                <Route path='/auth' element={<Authentication />} />
                <Route path='/login' element={<Login />} />
                <Route path='/alerts/*' element={<Alerts />} />
              </Route>
              <Route element={<PrivateRoute/>}>
                <Route path='/dashboard/*' element={<Dashboard />}/>
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>

          </ErrorContext.Provider>
        </AuthContext.Provider>
      </LoaderContext.Provider>
      </NavContext.Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
