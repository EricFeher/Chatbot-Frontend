import { useContext } from "react";
import ErrorContext from "../../context/ErrorContext";
import { MdClose } from 'react-icons/md';

function ErrorModal() {
    const errorContext = useContext(ErrorContext)

    return (
      <>
        <div className='fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 z-[901]'>
            <div className='w-full h-full flex items-center justify-center'>
                <div className='bg-lightGray bg-opacity-100 w-72 h-52 border text-activeFontColor space-y-3 z-[101]'>
                    <div onClick={()=> errorContext.setIsError(false)} className='flex justify-end pr-1 pt-1'>
                        <MdClose className='fill-activeFontColor hover:cursor-pointer hover:bg-darkGray rounded-full'/>
                    </div>
                    <div className=" text-center">
                        {errorContext.error}
                    </div>
                    <div onClick={() => errorContext.setIsError(false)} className="flex w-full justify-center text-center items-center">
                        <button className="flex w-full justify-center text-center items-center h-6 w-16 border-2 border-darkGray hover:bg-darkGray cursor-pointer" >Ok</button>
                    </div>
                </div>
            </div>
        </div>
        <div onClick={()=> errorContext.setIsError(false)} className='fixed w-screen h-screen z-[900] bg-black bg-opacity-60 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2'></div>
      </>
    );
  }
  
export default ErrorModal
  