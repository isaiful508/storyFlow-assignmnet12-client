import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'


import { AiOutlineBars } from 'react-icons/ai'

import { NavLink } from 'react-router-dom'

import { Link } from 'react-router-dom'
import { MdArticle,MdOutlineLibraryBooks } from 'react-icons/md'
import useAuth from '../../../Hooks/useAuth'
import { IoHome } from 'react-icons/io5'
import { FaUsers } from 'react-icons/fa'
import { Toaster } from 'react-hot-toast'

const Sidebar = () => {

    const { logOut } = useAuth()
    const [isActive, setActive] = useState(false);

      // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

    return (
        <>
         <Toaster
                position="top-center"
                reverseOrder={false}
            /> 
        {/* Small Screen Navbar */}
        <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
          <div>
            <div className='block cursor-pointer p-4 font-bold'>
              <Link to='/'>
                <img
                  // className='hidden md:block'
                  src='https://ibb.co/Qr82tyY'
                  alt='logo'
                  width='100'
                  height='100'
                />
              </Link>
            </div>
          </div>
  
          <button
            onClick={handleToggle}
            className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
          >
            <AiOutlineBars className='h-5 w-5' />
          </button>
        </div>
  
        {/* Sidebar */}
        <div
          className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
            isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
        >
          <div>
            <div>
              <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg items-center justify-between gap-2 bg-[#5f59f7]'>
                
                <Link to='/'>
                  <img
                    // className='hidden md:block'
                    src='https://i.ibb.co/z4JP3vK/newslogo.png'
                    alt='logo'
                    width='100'
                    height='100'
                  />
                </Link>
                <h2 className='text-2xl noto-600 text-white'>Story Flow</h2>
              </div>
            </div>
  
            {/* Nav Items */}
            <div className='flex flex-col justify-between flex-1 mt-6 noto-700'>
              {/* Conditional toggle button here.. */}
  
              {/*  Menu Items */}
              <nav>
                {/* Statistics */}
                <NavLink
                  to='/dashboard'
                  end
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                  }
                >
                  <IoHome className='w-5 h-5' />
  
                  <span className='mx-4 font-medium'>Admin Home</span>
                </NavLink>
  
                {/* All users */}
                <NavLink
                  to='all-users'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                  }
                >
                  <FaUsers className='w-5 h-5' />
  
                  <span className='mx-4 font-medium'>All Users</span>
                </NavLink>
                {/* All articles */}
                <NavLink
                  to='all-articles'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                  }
                >
                  <MdArticle className='w-5 h-5' />
  
                  <span className='mx-4 font-medium'>All Articles</span>
                </NavLink>
                  {/* add-publisher */}
                <NavLink
                  to='add-publisher'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                    }`
                  }
                >
                  <MdOutlineLibraryBooks className='w-5 h-5' />
  
                  <span className='mx-4 font-medium'>Add Publisher</span>
                </NavLink>
              </nav>
            </div>
          </div>
  
          <div>
            <hr />
  
            {/* Profile Menu */}
            <NavLink
              to='/myProfile'
              className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                  isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                }`
              }
            >
              <FcSettings className='w-5 h-5' />
  
              <span className='mx-4 nato-600'>Profile</span>
            </NavLink>
            <button
              onClick={logOut}
              className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
            >
              <GrLogout className='w-5 h-5' />
  
              <span className='mx-4 nato-600'>Logout</span>
            </button>
          </div>
        </div>
      </>
    );
};

export default Sidebar;