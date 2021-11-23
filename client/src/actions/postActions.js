import axios from 'axios'
import {
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    GET_POST_FAIL
} from '../constants/postConstants'

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_POST_REQUEST
        })

        const userInfo = JSON.parse(localStorage.getItem('userInfo'))

        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(`/api/v1/posts`, post, config)

        dispatch({
            type: CREATE_POST_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: CREATE_POST_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
}

export const getPost = (slug) => async (dispatch) => {
    try {
        dispatch({
            type: GET_POST_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.get(`/api/v1/posts/single/${slug}`, config)

        dispatch({
            type: GET_POST_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: GET_POST_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })

    }
}