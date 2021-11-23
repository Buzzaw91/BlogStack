import React, { useEffect } from 'react'
import isEmpty from 'lodash.isempty'
import { useSelector, useDispatch } from 'react-redux'
import { featured } from '../actions/userActions'
import Featured from '../components/Featured'
import Loader from '../components/Loader'
import Error from '../components/Error'

const HomeScreen = () => {

    const dispatch = useDispatch()
    const featuredUsers = useSelector(state => state.featuredUsers)
    const { error, loading, users } = featuredUsers

    useEffect(() => {
            dispatch(featured())
    },[dispatch])

    return (
        <>
            <div className='container mx-auto border flex justify-center'>
                <div className='flex-col'>
                    <h1 className='font-robotoSlab text-5xl py-4'>The Home For Fantastic Writing</h1>
                    <h4 className='font-serif text-base py-4 flex justify-center'>We believe that what you read matters and great writing is valuable.</h4>
                    {error ? <Error error={error} /> : null}
                    {loading ? <Loader />  : null}
                    {isEmpty(users) ? null : <Featured users={users} />}
                </div>
            </div>
        </>
    )
}

export default HomeScreen
