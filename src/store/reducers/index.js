import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import movieReducer from './movieReducer';
import imageReducer from './imageReducer';
import authReducer from './authReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

//firestoreReducer automatically sycns 'firestore' obj at database
//but we need to tell i which data to be synced
export default combineReducers({
    form:formReducer,
    movie:movieReducer,
    image:imageReducer,
    auth:authReducer,
    firestore:firestoreReducer,
    firebase:firebaseReducer,
})