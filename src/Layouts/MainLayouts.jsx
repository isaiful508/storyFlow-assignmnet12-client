import { Outlet } from "react-router-dom";
import Home from "../components/Home/Home/Home";


const MainLayouts = () => {
    return (
        <div>
            <Home></Home>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayouts;