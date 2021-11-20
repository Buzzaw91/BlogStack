import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { info } from '../actions/userActions'
import Loader from '../components/Loader';
import Post from '../components/Post';

const UserScreen = () => {

    const dispatch = useDispatch()
    let params = useParams()


    const userPosts = useSelector(state => state.userPosts);
    const { loading, error, posts } = userPosts;



        useEffect(() => {
            if(!posts) {
                dispatch(info(params.slug))
            }

        },[params, dispatch, posts])
        console.log(params)
        console.log(posts)

    return(
        <>
        <div className='flex min-w-full bg-white min-h-screen flex-col justify-start  items-end'>
            {loading && <Loader />}
            {posts && posts.map((post) => (
                 <Post title={post.title} url={post.url} body={post.body} />
            ))}
        </div>
        </>
    )

}

export default UserScreen
