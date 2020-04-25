import {
    CREATE_MOVIE_SUCCESS, 
    CREATE_MOVIE_FAILED,
    FETCH_MOVIES, 
    FETCH_MOVIE,
    CREATE_MOVIE_IMAGE,
    DELETE_MOVIE_SUCCESS,
    DELETE_MOVIE_FAILED,
} from './types';
import { storage } from '../../apis/fbConfig';

//we have to tell to firebase package about our project
export const createMovie = (formValues, history) =>  async (dispatch, getState, {getFirestore}) => {
    //we are pausing dispatch(thunk) while doing async stuff
    //getting firesotre and adding new document
    const firestore = getFirestore();
    const {image} = getState().movieImage
    const currentUserProfile = getState().googleAuth.response.currentUser.get().getBasicProfile()
    const userProfile = {
        userId:currentUserProfile.getId(),
        userName:currentUserProfile.getName(),
        userEmail:currentUserProfile.getEmail(),
        imageUrl:currentUserProfile.getImageUrl(),    
    }
    const uploadTask =  storage.ref(`images/${image.name}`).put(image)
    //on('state_changed', progress, error, complete)
    await uploadTask.on('state_changed', 
    (snapshot)=> {

    },
    (error)=> {console.log(error)
    },
    //to get image from firebase storage
    () => {
        storage.ref('images').child(image.name).getDownloadURL().then( async url => {
            await firestore.add(
                {collection :'cinema' },
                {
                ...formValues,
                image: url,
                createdBy: userProfile,                
                createdAt: new Date(),
            }).then((response) => {
                dispatch ( { type: CREATE_MOVIE_SUCCESS, payload:response })
            }).catch((err) =>{
                dispatch ( { type: CREATE_MOVIE_FAILED, payload:err })
            })
        })
    });
    //history.push('/')
}

// export const createMovie = (formValues) => async (dispatch) => {
//     formValues.createdAt = new Date();
//     const response = await movies.post('/movies', {...formValues })
//     dispatch ( { type: CREATE_MOVIE, payload:response.data }) 
//     //console.log('createMovie response', response)
// }

export const createMovieImage = (image) => async dispatch =>{
    image.imgPrevUrl = await URL.createObjectURL(image)
    dispatch({type:CREATE_MOVIE_IMAGE, payload:image})
}

export const deleteMovie = (id, history) => async (dispatch, getState, {getFirestore}) => {
    // console.log('delete action id', id)
    // console.log('delete action history', history)
    const firestore = getFirestore();
    await firestore.delete({ collection: 'cinema', doc:`${id}` }).then(() => {
        return({type:DELETE_MOVIE_SUCCESS});
    }).catch((error) => {
        return({type:DELETE_MOVIE_FAILED, payload:error})
    });
    history.push('/')
}

// export const fetchMovies = () => async (dispatch) => {
//     const response = await movies.get('/movies')
//     dispatch ({type:FETCH_MOVIES, payload:response.data})
// }

// export const fetchMovie = (id) => async (dispatch) => {
//     const response = await movies.get(`/movies/${id}`);
//     dispatch ({type:FETCH_MOVIE, payload:response.data})
//     //console.log('fetchMovie action:', response.data)
// }