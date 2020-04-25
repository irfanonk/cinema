import { combineReducers } from 'redux';
import { reducer as fromReducer } from 'redux-form';
import movieReducer from './movieReducer';
import movieImageReducer from './movieImageReducer';
import googleAuthReducer from './googleAuthReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

//firestoreReducer automatically sycns 'firestore' obj at database
//but we need to tell i which data to be synced
export default combineReducers({
    form:fromReducer,
    movie:movieReducer,
    movieImage:movieImageReducer,
    googleAuth:googleAuthReducer,
    firestore:firestoreReducer,
})