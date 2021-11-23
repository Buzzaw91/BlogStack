import React from 'react'

const Featured = ({ users }) => {
    console.log('Featured: ' ,users)

    return (
        <>
            <div className='container flex-col items-center mt-10 mb-4'>
                {users.map((user) => (
                    <div className='flex justify-center px-2 py-2'>
                        <img className='mx-1 my-1 h-20 w-20' src={user.avatar} alt='profile'/>
                        <h1>{user.username}</h1>
                        <h3>{user.description}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Featured