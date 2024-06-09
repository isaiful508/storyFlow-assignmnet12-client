import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from './../../../Hooks/useAuth';
import { AiOutlineMenu } from "react-icons/ai";
import UseAdmin from "../../../Hooks/UseAdmin";



const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isAdmin] = UseAdmin();
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)

    const navOptions =
        <> 
            <NavLink to='/'>Home</NavLink>
            {
                user && <><NavLink to='/addArticles' className={({ isActive }) => isActive ? 'text-[#3665b8] poppins-medium rounded-lg border-2 p-2 border-[#3665b8] ' : ''}>Add Articles</NavLink>

                <NavLink to='/userAllArticles'  className={({ isActive }) => isActive ? 'text-[#3665b8] poppins-medium rounded-lg border-2 p-2 border-[#3665b8] font-600' : 'font-500'}>All Articles</NavLink>

                <NavLink to='/subscription/premiumDuo/1000'  className={({ isActive }) => isActive ? 'text-[#3665b8] poppins-medium rounded-lg border-2 p-2 border-[#3665b8] font-600' : 'font-500'}>Subscription</NavLink>

                {
              user && isAdmin && <NavLink to='/dashboard'  className={({ isActive }) => isActive ? 'text-[#3665b8] poppins-medium rounded-lg border-2 p-2 border-[#3665b8] font-600' : 'font-500'}>Dashboard</NavLink>
            }    

                <NavLink to='/myArticles'  className={({ isActive }) => isActive ? 'text-[#3665b8] poppins-medium rounded-lg border-2 p-2 border-[#3665b8] font-600' : 'font-500'}>My Articles</NavLink>

                <NavLink to='/premiumArticles'  className={({ isActive }) => isActive ? 'text-[#3665b8] poppins-medium rounded-lg border-2 p-2 border-[#3665b8] font-600' : 'font-500'}>Premium Articles</NavLink></> 
            }
            

            {/* {
            user && isAdmin &&<NavLink to="/dashboard/adminHome">DASHBOARD</NavLink>
        }
        {
            user && !isAdmin &&<NavLink to="/dashboard/userHome">DASHBOARD</NavLink>
        } */}


        </>



    return (
        <div className="navbar fixed bg-opacity z-10 text-center  lg:text-white bg-[#15151580]">
            <div className="navbar-start">
                <div className="dropdown">
                    <div  onClick={() => setIsOpen2(!isOpen2)} tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        
                        {
                            navOptions
                        }
                        
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl text-white">Story Flow</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal flex items-center justify-between noto-700 px-1 space-x-3">
                   
                   {
                    navOptions
                   }
                 
                </ul>
            </div>
            <div className="navbar-end">
            <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu className="text-white" />
                  <div className='hidden md:block'>
                    {/* Avatar */}
                    <img
                      className='rounded-full'
                      referrerPolicy='no-referrer'
                      src={user && user.photoURL ? user.photoURL : ''}
                      alt='profile'
                      height='30'
                      width='30'
                    />
                  </div>
                </div>
            {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-[#15151580] overflow-hidden right-0 top-12 text-sm text-white'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-400 transition font-semibold'
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                        <Link to='/myProfile' className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'>My Profile</Link> 
                        <div
                          onClick={logOut}
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                        >
                          Logout
                        </div>
                       
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Login
                        </Link>

                        <Link
                          to='/register'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Register
                        </Link>

                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
        </div>
    );
};

export default Navbar;