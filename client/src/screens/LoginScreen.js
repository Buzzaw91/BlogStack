import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../actions/userActions'

const LoginScreen = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    let navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin;


    useEffect(() => {
        if (userInfo) {
            navigate('/user')
        }
    }, [navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(username, password));


    }


    return (
        <div className='h-screen bg-white flex justify-center items-start mt-24'>
        <form className='w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg' onSubmit={submitHandler}>
          <label className='text-gray-700 font-bold py-2'>Username</label>
          <input className='text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3' type='text' onChange={(e) => setUsername(e.target.value)}></input>
          <label className='text-gray-700 font-bold py-2'>Password</label>
          <input className='text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline' type='password' onChange={(e) => setPassword(e.target.value)}></input>
          <div className='flex justify-between items-center my-4'>
            <button className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded py-2 px-4' type='submit'>
              Sign In
            </button>
            <Link className='text-indigo-600 hover:text-indigo-800 font-bold' to='/login'>
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    )




}

export default LoginScreen