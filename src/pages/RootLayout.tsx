import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const RootLayout = () => {
    return (
        <div className="h-full bg-[#C0C0C1] pb-[2rem] ">
            <Header />
            <div>
                <Outlet />
            </div>
        </div>
    )
};

export default RootLayout;