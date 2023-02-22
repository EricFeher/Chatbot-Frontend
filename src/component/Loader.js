import { GridLoader  } from "react-spinners"

function Loader() {
    return (
        <>
            <div className="h-full w-full top-0 right-0 fixed bg-lightGray z-[1000]">
                <div className="flex items-center w-full h-full justify-center">
                    <GridLoader color="#FFFFFF" size="25px"/>
                </div>
            </div>
        </>
    );
}

export default Loader;