import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer, userPostsReducer, userFeatReducer, userDetailsReducer } from './reducers/userReducers';
import { postCreateReducer, getPostReducer } from './reducers/postReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userPosts: userPostsReducer,
    userDetails: userDetailsReducer,
    createdPost: postCreateReducer,
    featuredUsers: userFeatReducer,
    singlePost: getPostReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(
    localStorage.getItem('userInfo')
  ) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    userPosts: {}
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

