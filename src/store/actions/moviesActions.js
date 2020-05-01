import {
    CREATE_MOVIE_SUCCESS, 
    CREATE_MOVIE_FAILED,
    FETCH_MOVIES, 
    FETCH_MOVIE,
    CREATE_MOVIE_IMAGE,
    DELETE_MOVIE_SUCCESS,
    DELETE_MOVIE_FAILED,
    EDIT_MOVIE_SUCCESS,
    EDIT_MOVIE_FAILED,
    UPLOAD_MOVIE_IMAGE,
    UPLOAD_IMAGE_PROGRESS,

} from './types';
import { storage } from '../../apis/fbConfig';

    export const uploadMovieImage = () => (dispatch, getState) => {
   // console.log( 'uploadMovieImage invoked')
    const {createdImage} = getState().movieImage;
    const uploadTask =  storage.ref(`images/${createdImage.name}`).put(createdImage)
    console.log('uploadTask', uploadTask)
    uploadTask.on('state_changed',
    (snapshot) =>{
        const percent = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes)*100)
        dispatch({type:UPLOAD_IMAGE_PROGRESS, payload:percent})
        console.log('progress', percent)
    },
    (error) => {
        console.log('error', error)
    },
    () => {
    storage.ref('images').child(createdImage.name).getDownloadURL().then((url) => {
        dispatch({type:UPLOAD_MOVIE_IMAGE, payload:url})
        console.log('uploadMovieImage', url)
    })
    
    })
    
}

export const createMovie = (formValues) =>  async (dispatch, getState, {getFirestore}) => {
    // console.log('createMovie fromValues', formValues)
    const {createdImage} = getState().movieImage;
    //console.log('create movie image', createdImage)
    const url  = getState().movieImage.uploadedImgUrl
    console.log('action url', url)
    const firestore = getFirestore();
    const currentUserProfile = getState().googleAuth.response.currentUser.get().getBasicProfile();
    const userProfile = {
        userId:currentUserProfile.getId(),
        userName:currentUserProfile.getName(),
        userEmail:currentUserProfile.getEmail(),
        imageUrl:currentUserProfile.getImageUrl(),    
    };
    const imageProfile = {
        imageUrl:url,
        imageName:createdImage.name,
        imageSize:createdImage.size,
        imageType:createdImage.type,
    };
    firestore.add(
        {collection :'cinema' },
        {
        ...formValues,
        image:imageProfile,
        createdBy: userProfile,                
        createdAt: new Date(),
    }).then((response) => {
        dispatch ( { type: CREATE_MOVIE_SUCCESS, payload:response })
    }).catch((err) =>{
        dispatch ( { type: CREATE_MOVIE_FAILED, payload:err })
    })
}

// export const createMovie = (formValues) => async (dispatch) => {
//     formValues.createdAt = new Date();
//     const response = await movies.post('/movies', {...formValues })
//     dispatch ( { type: CREATE_MOVIE, payload:response.data }) 
//     //console.log('createMovie response', response)
// }

//to use image as a blob for preview
export const createMovieImage = (image) => async dispatch =>{
    image.imgPrevUrl = await URL.createObjectURL(image)
    dispatch({type:CREATE_MOVIE_IMAGE, payload:image})
}

export const deleteMovie = (movie, history) => (dispatch, getState, {getFirestore}) => {
    console.log('delete action movie', movie)
    // console.log('delete action history', history)

    //to delete date from store
    const firestore = getFirestore();
     firestore.delete({ collection: 'cinema', doc:`${movie.id}`, }).then(() => {
        dispatch({type:DELETE_MOVIE_SUCCESS});
    }).catch((error) => {
        dispatch({type:DELETE_MOVIE_FAILED, payload:error})
    });
    //to delete image from storage
    storage.ref('images').child(`${movie.image.imageName}`).delete().then((response) =>{
        console.log('image delete success', response)
    }).catch((error) => {
        console.log('image delete error', error)
    })
    history.push('/')
}


export const editMovie = (formValues, history, movie ) => (dispatch, getState, {getFirestore}) => {
    

    const firestore = getFirestore();
     firestore.update({ collection: 'cinema', doc:`${movie.id}`},
        {
        ...formValues,
        updateddAt: new Date(),

        }  
    ).then((response) => {
        dispatch({type:EDIT_MOVIE_SUCCESS, payload:response});
    }).catch((error) => {
        dispatch({type:EDIT_MOVIE_FAILED, payload:error})
    });
    //history.push('/')
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