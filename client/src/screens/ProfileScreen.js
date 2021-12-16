import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserDetails } from '../actions/userActions'
import isEmpty from 'lodash.isempty'
import Loader from '../components/Loader'
import Error from '../components/Error'



const ProfileScreen = () => {
    const dispatch = useDispatch()
    const params = useParams()

    const userDetails = useSelector(state => state.userDetails)
    const { user, loading, error } = userDetails

    useEffect(() => {
        if (isEmpty(userDetails)) {
            dispatch(getUserDetails(params.id))
        }
    },[dispatch, userDetails, params.id])
    console.log(userDetails)

    return (
        <>
            <div className='flex justify-center'>
                <div className='container mx-auto flex-col items-center max-w-screen-md'>
                    {error ? <Error error={error} /> : null}
                    {loading ? <Loader />  : null}
                </div>
            </div>
        </>
    )
}

export default ProfileScreen