import React from 'react';
import { Link } from 'react-router-dom'

const NavButton = ({userInfo}) => {


    return (
        <>
            <button className='px-4  font-medium py-2 mt-11 text-white shadow-xl  rounded-lg bg-blue-500 mr-80 transition ease-in-out duration-300 transform hover:scale-105'>{userInfo ? 'Create Post': 'Sign In'}</button>
        </>
    )
}

export default NavButton