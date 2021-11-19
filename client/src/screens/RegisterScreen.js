import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { register } from '../actions/userActions'

const RegisterScreen = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [uploading, setUploading] = useState(false)

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister;

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
      if (userInfo) {
          navigate('/user')
      } else {
      }
  }, [navigate, userInfo])

    const submitHandler = (e) => {
      e.preventDefault()
      if (password !== passwordConfirm) {
        alert('Passwords do not match')
      } else {
        dispatch(register(username, password, email, avatar))
      }
    }

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

        setAvatar(data.imagePath);
        setUploading(false)
    } catch (error) {
        console.error(error);
        setUploading(false);
    }
}

    return (
        <div className='h-screen bg-white flex justify-center items-start mt-24'>
        <form className='w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg' onSubmit={submitHandler}>
          <label className='text-gray-700 font-bold py-2'>Username</label>
          <input className='text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3' type='text' onChange={(e) => setUsername(e.target.value)}></input>
          <label className='text-gray-700 font-bold py-2'>Email</label>
          <input className='text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3' type='email' onChange={(e) => setEmail(e.target.value)}></input>
          <label className='text-gray-700 font-bold py-2'>Password</label>
          <input className='text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline' type='password' onChange={(e) => setPassword(e.target.value)}></input>
          <label className='text-gray-700 font-bold py-2'>Confirm Password</label>
          <input className='text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline' type='password' onChange={(e) => setPasswordConfirm(e.target.value)}></input>
          <label className='text-gray-700 font-bold py-2'>Avatar</label>
          <input className='text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3' type='file' alt='avatar' onChange={uploadFileHandler}></input>
          <div className='flex justify-between items-center my-4'>
            <button className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded py-2 px-4' type='submit'>
              Sign Up
            </button>
            <Link className='text-indigo-600 hover:text-indigo-800 font-bold' to='/login'>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    )
}

export default RegisterScreen