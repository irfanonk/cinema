import {
    SIGN_IN, 
    SIGN_OUT,
    LOG_IN_SUCCESS,
    LOG_IN_FAILED,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILED,
    CREATE_USER_INFO_SUCCESS,
    CREATE_USER_INFO_FAILED,
} from './types';
import firebase from 'firebase/app';
import { getFirestore } from 'redux-firestore';


export const signIn = (response) =>{
    return({type:SIGN_IN, payload:response})
} 

export const signOut = () =>{
    return({type:SIGN_OUT, payload:'Sign out successfull'})
} 

export const logIn = (email, password, history, ) => dispatch => {

    firebase.auth().signInWithEmailAndPassword(email, password).then((response)=>{
        dispatch({type:LOG_IN_SUCCESS, payload:response})
        
    })
    .catch((error) =>{
        dispatch({type:LOG_IN_FAILED, payload:error})
        console.log('login error', error)
      });
}
export const createUser = (formValues, history) => (dispatch, getState, {getFirestore}) => {
    const { email, password, name, lastname} = formValues;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((response) =>{
        //console.log('create user', response)
        dispatch({type:LOG_IN_SUCCESS, payload:response})

        const firestore = getFirestore();
        const userPhotoUrl = getState().image.uploadedImgUrl;
        const userName = name + ' ' + lastname;
        const profileName = userName.replace(/\s/g, "");
        firestore.collection('users').doc(response.user.uid).set({
            userName,
            profileName,
            userEmail:email, 
            userId:response.user.uid,  
            userPhotoUrl,         
            createdAt: new Date(),
        }).then((response) => {
              dispatch ( { type: CREATE_USER_INFO_SUCCESS, payload:response })
        }).catch((err) =>{
              dispatch ( { type: CREATE_USER_INFO_FAILED, payload:err })
        })
          
    })
    .catch(function(error) {
        console.log('create user', error)
        dispatch({type:LOG_IN_FAILED, payload:error})
    });
 
}

export const logOut = () => dispatch =>{
    firebase.auth().signOut().then(()=>{
        dispatch({type:LOG_OUT_SUCCESS, payload:'Log out successfull'})
    })
    .catch((error) =>{
        dispatch({type:LOG_OUT_FAILED, payload:error})
      });
      
}


