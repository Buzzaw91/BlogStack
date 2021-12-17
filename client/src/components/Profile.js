import React from 'react';

const Profile = ({ user }) => {

    return (
        <div className='container mx-auto flex-col items-center max-w-screen-md font-robotoSlab border'>
            <h1 className='flex justify-center text-2xl py-2'>{user.blogName}</h1>
            <div className='flex justify-center'>
                <img className='mx-1 my-1 h-20 w-20' src={user.avatar} alt='profile'/>
            </div>
            <h1 className='flex justify-center text-2xl py-2'>{user.username}</h1>
            <h3 className='flex justify-center text-sm py-2'>{user.bio}</h3>
            <h1 className='flex justify-center text-sm py-2'>{user.description}</h1>
            <h1 className='flex justify-center text-sm py-2'>{user.email}</h1>
        </div>
    )
}

export default Profile