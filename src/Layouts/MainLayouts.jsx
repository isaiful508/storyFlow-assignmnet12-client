import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";



const MainLayouts = () => {
    return (
        <div>
            <Toaster
  position="top-center"
  reverseOrder={false}
/>
            <Outlet></Outlet>
            
        </div>
    );
};

export default MainLayouts;