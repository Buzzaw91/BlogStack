import React from 'react';

const Profile = ({ user }) => {

    return (
        <div className='container mx-auto flex-col items-center max-w-screen-md font-robotoSlab border'>
            <h1 className='flex justify-center text-2xl py-2'>{user.username}</h1>
            <h1 className='flex justify-center text-md py-2'>{user.description}</h1>
            <h1 className='flex justify-center text-md py-2'>{user.email}</h1>
        </div>
    )
}

export default Profile