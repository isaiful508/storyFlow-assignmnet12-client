import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar/Navbar";



const MainLayouts = () => {
    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />         
             <Navbar></Navbar>
            <Outlet></Outlet>

        </div>
    );
};

export default MainLayouts;