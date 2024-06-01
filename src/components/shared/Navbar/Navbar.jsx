import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from './../../../Hooks/useAuth';



const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false)

    const navOptions =
        <> 
            <NavLink to='/'>Home</NavLink>
            <NavLink>Add Articles</NavLink>
            <NavLink to='/menu'>All Articles</NavLink>
            <NavLink to='/order/salad'>Subscription</NavLink>
            <NavLink to='/order/salad'>Dashboard</NavLink>
            <NavLink to='/order/salad'>My Articles</NavLink>
            <NavLink to='/order/salad'>Premium Articles</NavLink>

            {/* {
            user && isAdmin &&<NavLink to="/dashboard/adminHome">DASHBOARD</NavLink>
        }
        {
            user && !isAdmin &&<NavLink to="/dashboard/userHome">DASHBOARD</NavLink>
        } */}


        </>



    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        
                        {
                            navOptions
                        }
                        
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Story Flow</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-2">
                   
                   {
                    navOptions
                   }
                 
                </ul>
            </div>
            <div className="navbar-end">
              <Link to='/register'>Register</Link>
            </div>
        </div>
    );
};

export default Navbar;