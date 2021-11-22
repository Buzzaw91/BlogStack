import React from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { Menu } from '@headlessui/react'
import { logout } from '../actions/userActions'
import logo from '../images/logos/logo_transparent.png'
import NavButton from './NavButton'


const Navbar = () => {
    const dispatch = useDispatch()

    const  userLogin  = useSelector(state => state.userLogin, shallowEqual)
    const { userInfo } = userLogin;
    const path = userInfo ? '/create': '/login'

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div className='overflow-x-hidden overflow-y-visible min-w-full'>
            <div className='flex justify-between bg-white select-none h-48'>
                <Link to='/' className='px-2 py-2'>
                    <img src={logo} alt='logo' height='100' width='100'/>
                </Link>
                <Link to={path}>
                    <NavButton userInfo={userInfo} />
                </Link>
                    <Menu as='div' className='absolute right-1 px-4 py-2 pt-12 pr-4 mr-24 w-40 text-sm font-normal text-black bg-white rounded-md opacity-80'>
                        <Menu.Button className='font-medium bg-blue-100 rounded-lg bg-opacity-50 hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 px-6 py-2'>{userInfo ? userInfo.username : 'Menu'}</Menu.Button>
                        <Menu.Items as='ul' className='py-4'>
                            <Menu.Item as='li' className='py-1 my-2'>
                                {({ active }) => (
                                    <Link to='/profile' className={`${active && 'bg-blue-100 rounded py-2 px-2 bg-opacity-50'}`}>
                                        <FaIcons.FaHome className='inline-block mr-4 mb-1' />My Profile
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item as='li' className='py-1 my-2'>
                                {({ active }) => (
                                    <Link to='/posts' className={`${active && 'bg-blue-100 rounded py-2 px-2 bg-opacity-50'}`}>
                                        <FaIcons.FaListAlt className='inline-block mr-4 mb-1' />My Posts
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item as='li' className='py-1 my-2'>
                                {({ active }) => (
                                    <Link to='/' className={`${active && 'bg-blue-100 rounded py-2 px-2 bg-opacity-50'}`} onClick={logoutHandler}>
                                        <FaIcons.FaPowerOff className='inline-block mr-4 mb-1' />Logout
                                    </Link>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
            </div>
        </div>
    )

}

export default Navbar;