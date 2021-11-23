import {
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    CREATE_POST_RESET,
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    GET_POST_FAIL
    } from '../constants/postConstants'

export const postCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_POST_REQUEST:
            return { loading: true }
        case CREATE_POST_SUCCESS:
            return {
                    loading: false,
                    success: true,
                    post: action.payload }
        case CREATE_POST_FAIL:
            return { loading: false, error: action.payload }
        case CREATE_POST_RESET:
            return { }
        default:
            return state
    }
}

export const getPostReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_POST_REQUEST:
            return { loading: true }
        case GET_POST_SUCCESS:
            return {
                loading: false,
                post: action.payload
             }
        case GET_POST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}