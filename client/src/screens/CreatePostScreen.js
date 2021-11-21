import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { createPost } from '../actions/postActions'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'

const CreatePostScreen = () => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [body, setBody] = useState('')
    const [published, setPublished] = useState(false)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const { id } = userInfo

    const createdPost = useSelector(state => state.createdPost)
    const { success, error, loading } = createdPost

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        if (success === true) {
            navigate('/user')
        }
    },[userInfo, navigate, success, createdPost])

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
          const config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }
          const { data } = await axios.post(`/api/v1/images`, formData, config)
          setUrl(data.imagePath);
          setUploading(false)
      } catch (error) {
          console.error(error);
          setUploading(false);
      }
  }

  const submitHandler = (e) => {
      e.preventDefault()
      if ((title.length || body.length) === 0) {
          alert('A post title and content cannot be empty')
      } else {
          dispatch(createPost({id ,title, url, body, published}))
      }
  }

    return (
    <>
        <h1 className='text-4xl font-robotoSlab flex justify-center'>Create New Post</h1>
        <div className='h-screen bg-white flex justify-center items-start mt-24'>
            {error && <Error error={error} />}
            {loading ? <Loader /> : <form className='w-full max-w-lg bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg' onSubmit={submitHandler}>
          <label className='text-gray-700 font-bold py-2'>Title</label>
          <input className='text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3' type='text' onChange={(e) => setTitle(e.target.value)}></input>
          <label className='text-gray-700 font-bold py-2'>Text</label>
          <input className='text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-12 px-3 mb-3' type='text' onChange={(e) => setBody(e.target.value)}></input>
          <label className='text-gray-700 font-bold py-2'>Public</label>
          <input className='text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3' type='checkbox'  onClick={() => setPublished(!published)}></input>
          <label className='text-gray-700 font-bold py-2'>Title Image</label>
          <input className='text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-4 px-3 mb-3' type='file' alt='avatar' onChange={uploadFileHandler}></input>
          <div className='flex justify-between items-center my-4'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4' type='submit'>
              Create Post
            </button>
          </div>
        </form>}
        
    </div>
    </>
    )

}

export default CreatePostScreen