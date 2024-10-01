import { useState } from "react";

import SideBarForm from "./SideBarForm";

import {Menu, } from "lucide-react";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const clickHandler = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-[14%] md:w-[100%] lg:w-[100%] col-span-1 m:bg-[#D9D9D9] lg:bg-[#D9D9D9] 
        md:rounded-lg lg:rounded-lg lg:border-solid 
        lg:border-[1px] lg:border-[#AEAEAE] lg:shadow-2xl">
            <div className="hidden md:hidden lg:block">
                <p className="p-4 text-2xl font-bold">Recipes:</p>
                <hr className="border-solid border-[1px] border-[#AEAEAE]" />
                
                <SideBarForm />
            </div>
            
            <button onClick={clickHandler} className="pl-2 block md:block lg:hidden">
                <Menu />
            </button>
            
            <div className={`md:block lg:hidden fixed top-[12rem] left-0 bg-[#D9D9D9] w-[60%] h-[70vh] z-50 
                transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform`}>
                    <button onClick={clickHandler} className='text-5xl text-red-600 float-end pr-3 pb-3'>
                        &times;
                    </button>
                <SideBarForm />
            </div>

            <div onClick={clickHandler} className={`fixed top-0 left-0 w-full h-full bg-[black] 
        bg-opacity-50 transition-opacity duration-300 ease-in 
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} lg:hidden`} >
            </div>

        </div>
    )
};



    // className={`md:block lg:hidden fixed top-[9rem] left-0 bg-[#D9D9D9] w-[70%] h-[70vh] z-50 transform
        // ${isOpen ? 'translate-y-0' : '-translate-y-[120%]'} transition-transform duration-300`}

    

export default SideBar;