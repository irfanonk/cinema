import {SIGN_IN,SIGN_OUT} from '../actions/types';

export const signIn = (response) =>{
    return({type:SIGN_IN, payload:response})
} 

export const signOut = (response) =>{
    return({type:SIGN_OUT, payload:response})
} 