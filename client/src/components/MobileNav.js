import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { SidebarData } from './SidebarData'


const MobileNav = () => {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <div className='container overflow-x-hidden'>
          <IconContext.Provider value={{ color: '#312E81' }}>
        <div className='bg-indigo-200 h-20 flex justify-between items-center select-none'>
          <Link to='#' className='ml-8 text-3xl'>
            <FaIcons.FaBars onClick={showSidebar}/>
          </Link>
          <div className='mr-6'>
          <Link to='#' className='text-3xl'>
            <AiIcons.AiFillHome />
          </Link>
        </div>
        </div>
        <nav className={sidebar ? 'bg-indigo-200 w-64 h-screen flex justify-center fixed top-0 translate-x-0 transition transform duration-1500 ease-in-out' : 'bg-indigo-200 w-64 h-screen flex justify-center fixed top-0 -translate-x-full transition transform duration-1500 ease-in-out'}>
          <ul className='w-screen' onClick={showSidebar}>
            <li className='bg-indigo-200 w-full h-20 flex justify-start items-center ml-8 select-none'>
              <Link to='#' className='text-3xl'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
        </div>
    )
}
export default MobileNav