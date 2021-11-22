import React, { useEffect } from 'react'
import isEmpty from 'lodash.isempty'
import { useSelector, useDispatch } from 'react-redux'
import { featured } from '../actions/userActions'

const HomeScreen = () => {

    const dispatch = useDispatch()
    const featuredUsers = useSelector(state => state.featuredUsers)
    const { error, loading, feat } = featuredUsers

    useEffect(() => {
        if(isEmpty(feat)) {
            dispatch(featured())
        }
    }, [feat,dispatch])

    return (
        <>
            <div className='container mx-auto border flex justify-center'>
                <div className='flex-col'>
                    <h1 className='font-robotoSlab text-5xl py-4'>The Home For Fantastic Writing</h1>
                    <h4 className='font-serif text-base py-4 flex justify-center'>We believe that what you read matters and great writing is valuable.</h4>
                </div>
            </div>
        </>
    )
}

export default HomeScreen
