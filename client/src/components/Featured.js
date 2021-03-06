import React from 'react'
import { Link } from 'react-router-dom'

const Featured = ({ users }) => {

    return (
        <>
            <div className='container flex-col items-center mt-10 mb-4 my-8'>
                {users.map((user) => (
                    <Link to={`/${user.username}`}>
                        <div className='flex justify-center px-2 py-2 my-2 w-2/4'>
                            <img className='mx-1 my-1 h-20 w-20 flex' src={user.avatar} alt='profile'/>
                            <div className='flex-col ml-6'>
                                <h1 className='flex font-semibold'>{user.blogName}</h1>
                                <h3 className='flex mx-2 py-1'>{user.description}</h3>
                                <h4 className='flex font-light py-2 text-sm'>By {user.username}</h4>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Featured