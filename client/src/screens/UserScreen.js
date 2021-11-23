import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { info } from '../actions/userActions'
import Loader from '../components/Loader';
import Post from '../components/Post';
import  isEmpty  from 'lodash.isempty';

const UserScreen = () => {

    const dispatch = useDispatch()
    let params = useParams()


    const userPosts = useSelector(state => state.userPosts);
    const { loading, posts } = userPosts;




        useEffect(() => {
                dispatch(info(params.user))
        },[])
        console.log(params)

    return(
        <>
        <div className='flex min-w-full bg-white min-h-screen flex-col items-center'>
            {loading && <Loader />}
            {posts && posts.map((post) => (
                <Link to={`/${params.user}/${post.slug}`}>
                    <Post title={post.title} url={post.url} body={post.body} />
                </Link>
            ))}
        </div>
        </>
    )

}

export default UserScreen
