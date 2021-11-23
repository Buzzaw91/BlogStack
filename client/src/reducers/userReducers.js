import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_RESET,
    USER_POSTS_REQUEST,
    USER_POSTS_SUCCESS,
    USER_POSTS_FAIL,
    USER_FEATURED_REQUEST,
    USER_FEATURED_SUCCESS,
    USER_FEATURED_FAIL
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        case USER_REGISTER_RESET:
            return { userInfo: null }
        default:
            return state
    }
}

export const userPostsReducer = (state = { posts:[] }, action) => {
    switch(action.type) {
        case USER_POSTS_REQUEST:
            return { loading: true }
        case USER_POSTS_SUCCESS:
            return { posts: action.payload }
        case USER_POSTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userFeatReducer = (state = { users: [] }, action) => {
    switch(action.type) {
        case USER_FEATURED_REQUEST:
            return { loading: true }
        case USER_FEATURED_SUCCESS:
            return { users: action.payload, loading: false }
        case USER_FEATURED_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}