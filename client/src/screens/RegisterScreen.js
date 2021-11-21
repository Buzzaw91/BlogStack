import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { register } from '../actions/userActions'
import useStateWithValidation from '../hooks/useStateWithValidation'
import Error from '../components/Error'

const RegisterScreen = () => {
    const [username, setUsername, userIsValid] = useStateWithValidation( name => name.length > 5, '')
    const [password, setPassword, passIsValid] = useStateWithValidation(str => str.length > 10, '')
    const [passwordConfirm, setPasswordConfirm, confirmIsValid] = useStateWithValidation(str => str.length > 10, '')
    const [email, setEmail, emailIsValid] = useStateWithValidation(str => str.length > 5 && str.includes('@'), '')
    const [avatar, setAvatar] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [showError, setShowError] = useState(false)

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
      } else if (!userIsValid || !passIsValid || !confirmIsValid || !emailIsValid) {
        setShowError(true)
      }
      else {
        setShowError(false)
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
      <>
        {error ? <Error error={error} /> : <div className='h-screen bg-white flex justify-center items-start mt-24'>
        <form className='w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg' onSubmit={submitHandler}>
          <label className='text-gray-700 font-bold py-2'>Username</label>
          {showError && !userIsValid && <Error />}
          <input className='text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3' type='text' onChange={(e) => setUsername(e.target.value)}></input>
          <label className='text-gray-700 font-bold py-2'>Email</label>
          {showError && !emailIsValid && <Error />}
          <input className='text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3' type='email' onChange={(e) => setEmail(e.target.value)}></input>
          <label className='text-gray-700 font-bold py-2'>Password</label>
          {showError && !passIsValid && <Error />}
          <input className='text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline' type='password' onChange={(e) => setPassword(e.target.value)}></input>
          <label className='text-gray-700 font-bold py-2'>Confirm Password</label>
          {showError && !confirmIsValid && <Error />}
          <input className='text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline' type='password' onChange={(e) => setPasswordConfirm(e.target.value)}></input>
          <label className='text-gray-700 font-bold py-2'>Avatar</label>
          <input className='text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3' type='file' alt='avatar' onChange={uploadFileHandler}></input>
          <div className='flex justify-between items-center my-4'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4' type='submit'>
              Sign Up
            </button>
            <Link className='text-blue-500 hover:text-blue-700 font-bold' to='/login'>
              Sign In
            </Link>
          </div>
        </form>
      </div> }
    </>
    )
}

export default RegisterScreen