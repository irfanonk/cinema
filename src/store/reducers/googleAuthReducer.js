import {SIGN_IN, SIGN_OUT} from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    response: [],
}
export default  (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            return {...state, isSignedIn:true, response:action.payload};
        case SIGN_OUT:
            return {...state, isSignedIn:false, response:action.payload};
        default:
            return state;

    }
}