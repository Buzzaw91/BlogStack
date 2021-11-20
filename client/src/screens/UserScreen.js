import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { info } from '../actions/userActions'

const UserScreen = () => {

    const dispatch = useDispatch()
    let params = useParams()


    const userPosts = useSelector(state => state.userPosts);
    const { loading, error, posts } = userPosts;



        useEffect(() => {
            if (!posts) {
                dispatch(info(params.slug))

            }
        },[params, dispatch, posts])
        console.log(params)
        console.log(posts)

    return(
        <>
        <div className='flex min-w-full bg-blue-100 min-h-screen justify-center'>
            <h1 className='font-robotoSlab'>{posts[0].username || 'No user found'}</h1>
        </div>
        </>
    )

}

export default UserScreen
