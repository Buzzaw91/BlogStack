import React from 'react'

const Featured = ({ users }) => {

    return (
        <>
            <div className='container flex-col items-center mt-10 mb-4 my-8'>
                {users.map((user) => (
                    <div className='flex justify-center px-2 py-2 max-w-lg my-2'>
                        <img className='mx-1 my-1 h-20 w-20 flex' src={user.avatar} alt='profile'/>
                        <div className='flex-col ml-6'>
                            <h1 className='flex font-semibold'>{user.blogName}</h1>
                            <h3 className='flex'>{user.description}</h3>
                            <h4 className='flex font-light py-2 text-sm'>By {user.username}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Featured