import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../actions/postActions'
import Error from '../components/Error'
import Loader from '../components/Loader'
import  isEmpty  from 'lodash.isempty'

const PostScreen = () => {
    const dispatch = useDispatch()
    const params = useParams()

    const singlePost = useSelector(state => state.singlePost)
    const { loading, error, post } = singlePost

    useEffect(() => {
        dispatch(getPost(params.slug))
    },[])
    return (
        <>
            {error ? <Error error={error} /> : null}
            {loading || isEmpty(singlePost) || !post.title ? <Loader /> :

            <div className='flex justify-center'>
                <div className='flex-col items-center container mx-auto  max-w-screen-md'>
                <h1 className=' flex justify-start text-3xl font-bold px-2 py-1'>{post.title}</h1>
                <h3 className='flex justify-start text-base font-medium px-2 py-1 text-gray-700'>{post.subTitle}</h3>
                <h4 className='flex justify-start text-sm font-light px-2 py-1 text-gray-700'>By {post.username}</h4>
                <img className='w-96 h-52 my-4 ml-2' src={post.url} alt='post'/>
                <p className='flex justify-start text-md px-2 py-1 leading-relaxed'>{post.body}</p>
                </div>

            </div>
            }
        </>
    )
}

export default PostScreen