import {
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_ERROR, 
    FETCH_MOVIE_SUCCESS,
    FETCH_MOVIE_ERROR, 

} from './types';
import axios from 'axios';
//import APIKey from '../../apis/OMDbApi';

const APIKey='abbb376d'

export const fetchMovies = (formValues) => dispatch => {
    //console.log(APIKey)
    console.log(formValues.text)
    axios.get(`http://www.omdbapi.com/?apikey=${APIKey}&s=${formValues.text}`)
    .then(response => {
        console.log('fetchMovies res', response.data)
        dispatch({ type:FETCH_MOVIES_SUCCESS, payload: response.data})
    })
    .catch((err) =>{
        console.log('fetchMovies err', err)
        dispatch({type:FETCH_MOVIES_ERROR, payload:err})
    })    
 } 

 export const fetchMovie = id => dispatch => {
   axios.get(`http://www.omdbapi.com/?apikey=${APIKey}&i=${id}`)
   .then(response => dispatch({
       type:FETCH_MOVIE_SUCCESS,
       payload: response.data
   }))
   .catch(err =>{
    dispatch({type:FETCH_MOVIE_ERROR, payload:err})
   })
} 