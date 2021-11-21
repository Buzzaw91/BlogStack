import {
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL
    } from '../constants/postConstants'

export const postCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_POST_REQUEST:
            return { loading: true }
        case CREATE_POST_SUCCESS:
            return {
                    loading: false,
                    success: true,
                    createdPost: action.payload }
        case CREATE_POST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}