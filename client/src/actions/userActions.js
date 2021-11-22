import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_POSTS_REQUEST,
    USER_POSTS_SUCCESS,
    USER_POSTS_FAIL,
    USER_FEATURED_REQUEST,
    USER_FEATURED_SUCCESS,
    USER_FEATURED_FAIL
 }
from '../constants/userConstants'

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            '/api/v1/users/login',
            { username, password },
            config
            )

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            });

            localStorage.setItem('userInfo', JSON.stringify(data));

    } catch(error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        });
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
}

export const register = (username, password, email, avatar) => async (dispatch) => {
    const info = {
        username,
        password,
        email,
        avatar
    }
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.post('/api/v1/users', info, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    }   catch(error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
}

export const info = (username) => async (dispatch) => {

    try {
        dispatch({
            type: USER_POSTS_REQUEST
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.get(`/api/v1/users/${username}`, config)

        dispatch({
            type: USER_POSTS_SUCCESS,
            payload: data
        });

    }   catch(error) {
        dispatch({
            type: USER_POSTS_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
}

export const featured = () => async (dispatch) => {

    try {
        dispatch({
            type: USER_FEATURED_REQUEST
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.get('/api/v1/users/feat', config)

        dispatch({
            type: USER_FEATURED_SUCCESS,
            payload: data
        });

    }   catch(error) {
        dispatch({
            type: USER_FEATURED_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
}