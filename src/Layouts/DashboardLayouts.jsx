import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";


const DashboardLayouts = () => {
    return (
        <div className='relative min-h-screen md:flex'>
           <Toaster
                position="top-center"
                reverseOrder={false}
            /> 
        {/* Sidebar */}
        <Sidebar />
        
  
        {/* Outlet --> Dynamic content */}
        <div className='flex-1 md:ml-64'>
          <div className='p-5'>
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default DashboardLayouts;