import {
    SIGN_IN, 
    SIGN_OUT,
    LOG_IN_SUCCESS,
    LOG_IN_FAILED,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILED,
    CREATE_USER_MAIL_FAILED,
    CREATE_USER_INFO_SUCCESS,
    CREATE_USER_INFO_FAILED,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    isLogedIn:null,
    signRes:[],
    logRes:[],
    userCreateRes:[],
    getUserRes:[],
}

export default  (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            return {...state, isSignedIn:true, isLogedIn:false, signRes:action.payload};
        case SIGN_OUT:
            return {...state, isSignedIn:false, isLogedIn:false, signRes:action.payload};
        case LOG_IN_SUCCESS:
            return {...state, isLogedIn:true, isSignedIn:false, logRes:action.payload};
        case LOG_IN_FAILED:
            return {...state, isLogedIn:false, logRes:action.payload};
        case LOG_OUT_SUCCESS:
            return {...state, isLogedIn:false, isSignedIn:false, logRes:action.payload};
        case LOG_OUT_FAILED:
            return {...state, isLogedIn:true, logRes:action.payload};
        case CREATE_USER_INFO_SUCCESS:
            return {...state, isLogedIn:true, isSignedIn:false, userCreateRes:action.payload}
        case CREATE_USER_INFO_FAILED:
            return {...state, isLogedIn:false, userCreateRes:action.payload}
        case GET_USER_INFO_SUCCESS:
            return {...state, getUserRes:action.payload}
        case GET_USER_INFO_FAILED:
            return {...state, getUserRes:action.payload}
            default:
            return state;

    }
}