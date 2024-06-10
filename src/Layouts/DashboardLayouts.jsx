import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";
import Charts from "../pages/Dashboard/Charts/Charts";


const DashboardLayouts = () => {
  const location = useLocation();
    
  // Conditionally show Charts only on the admin home page
  const isAdminHome = location.pathname === '/dashboard'; 
    return (
        <div className='relative min-h-screen md:flex'>
           <Toaster
                position="top-center"
                reverseOrder={false}
            /> 
        {/* Sidebar */}
        <Sidebar />
         {/* google charts */}
        
  
        {/* Outlet --> Dynamic content */}
        <div className='flex-1 md:ml-64'>
         
          <div className='p-5'>
            <Outlet />
            {isAdminHome && <Charts />}
          </div>
        </div>
      </div>
    );
};

export default DashboardLayouts;