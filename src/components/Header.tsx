import { Link, useLocation } from "react-router-dom";

import { House, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logoutThunk } from "../store/authThunk";

const Header = () => {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const handleLogout = () => {
        dispatch(logoutThunk());
        alert('success!');
    };
    
    return (
        <div className="mb-3 md:mb-3 lg:mb-[1.5rem] lg:text-sm xl:text-sm ">
            <header className="bg-[#D9D9D9] mb-[1.2rem] lg:mb-[2rem] flex px-4 py-5 gap-3">
                <p className="text-red-600">logo</p>
                <p>SearchBar</p>
            </header>

            <header className="bg-[#c8c8c8] w-[93%] lg:w-[97%] m-auto border-[3px] border-solid border-[#AEAEAE] 
            flex shadow-xl rounded-lg justify-between">
                <div className="flex">
                    <Link to="/" className={`border-r-[#AEAEAE] border-r-[2px] border-solid px-8 py-3 lg:py-6 
                     ${location.pathname === '/' ? 'text-red-500 font-bold' : 'text-[#767676] hover:text-black hover:font-bold' }
                    font-bold hover:bg-[#D6D6D6] `} >
                        <p className="hidden lg:block">Home</p>
                        <House className="lg:hidden" />
                    </Link>
                    <Link to="/Fav" className={`border-r-[#AEAEAE] border-r-[2px] border-solid px-7 py-3 lg:py-6 
                    ${location.pathname === '/Fav' ? 'text-red-500 font-bold' : 'text-[#767676] hover:text-black hover:font-bold' }
                    font-bold hover:bg-[#D6D6D6] text-center `} >
                        <p className="hidden lg:block">Favorites</p>
                        <Star className="lg:hidden" />
                    </Link>
                </div>

                {isLoggedIn ? (
                    <p onClick={handleLogout} className="border-l-[#AEAEAE] border-l-[2px] border-solid px-8 py-3 lg:py-6 
                    text-[#767676] focus:text-red-500 
                    font-bold hover:bg-[#D6D6D6] hover:text-black hover:font-bold">Logout</p>
                ) : (
                    <Link to="/SignIn" className={`border-l-[#AEAEAE] border-l-[2px] border-solid px-8 py-3 lg:py-6
                    ${location.pathname === '/SignIn' ? 'text-red-500 font-bold' : 'text-[#767676] hover:text-black hover:font-bold' }
                    font-bold hover:bg-[#D6D6D6] text-center `}>
                        <p>Sign in</p>
                    </Link>
                )}
            </header>
        </div>
    )
};

export default Header;