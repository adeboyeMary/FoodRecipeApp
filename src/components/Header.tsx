import { Link } from "react-router-dom";

import { House, Star } from "lucide-react";

const Header = () => {
    return (
        <div className="mb-3 md:mb-3 lg:mb-[1.5rem] ">
            <header className="bg-[#D9D9D9] mb-[1.2rem] lg:mb-[2rem] flex px-4 py-5 gap-3">
                <p className="text-red-600">logo</p>
                <p>SearchBar</p>
            </header>

            <header className="bg-[#c8c8c8] w-[93%] lg:w-[97%] m-auto border-[3px] border-solid border-[#AEAEAE] 
            flex shadow-xl rounded-lg justify-between">
                <div className="flex">
                    <Link to="/" className="border-r-[#AEAEAE] border-r-[2px] border-solid px-8 py-3 lg:py-6 
                    text-[#767676] 
                    font-bold hover:bg-[#D6D6D6] hover:text-black hover:font-bold ">
                        <p className="hidden lg:block">Home</p>
                        <House className="lg:hidden" />
                    </Link>
                    <div className="border-r-[#AEAEAE] border-r-[2px] border-solid px-7 py-3 lg:py-6 
                    text-[#767676] 
                    font-bold hover:bg-[#D6D6D6] hover:text-black hover:font-bold text-center ">
                        <p className="hidden lg:block">Favorites</p>
                        <Star className="lg:hidden" />
                    </div>
                </div>

                <Link to="/SignIn" className="border-l-[#AEAEAE] border-l-[2px] border-solid px-8 py-3 lg:py-6 
                text-[#767676] 
                font-bold hover:bg-[#D6D6D6] hover:text-black hover:font-bold">
                    <p>Sign in</p>
                </Link>
            </header>
        </div>
    )
};

export default Header;