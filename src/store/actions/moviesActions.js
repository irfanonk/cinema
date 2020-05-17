import {
    CREATE_MOVIE_SUCCESS, 
    CREATE_MOVIE_FAILED,
    FETCH_MOVIES, 
    FETCH_MOVIE,
    CREATE_IMAGE,
    DELETE_MOVIE_SUCCESS,
    DELETE_MOVIE_FAILED,
    EDIT_MOVIE_SUCCESS,
    EDIT_MOVIE_FAILED,
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_PROGRESS,
    UPLOAD_IMAGE_ERROR,
    UPLOAD_IMAGE_METADATA,
    DELETE_IMAGE_SUCCESS,
    DELETE_IMAGE_FAILED,
    CLEAR_CREATE_VALUES,

} from './types';
import { storage } from '../../apis/fbConfig';

    export const uploadImage = (storageName, imageName) => (dispatch, getState) => {
   console.log( 'uploadImage invoked', storageName + '/' + imageName)
   
    const createdImage = getState().image.createdImage
    const uploadTask =  storage.ref(storageName + '/' + imageName).put(createdImage)
    console.log('uploadTask', uploadTask)
    uploadTask.on('state_changed',
    (snapshot) =>{
        const percent = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes)*100)
        dispatch({type:UPLOAD_IMAGE_PROGRESS, payload:percent})
        //console.log('progress', percent)
    },
    (error) => {
        dispatch({type:UPLOAD_IMAGE_ERROR, payload:error})
        //console.log('upload image error', error)
    },
    () => {
    storage.ref(storageName).child(imageName).getDownloadURL().then((url) => {
        dispatch({type:UPLOAD_IMAGE, payload:url})
        console.log('uploadImage', url)
    })

    storage.ref(storageName).child(imageName).getMetadata().then((metadata) =>{
        dispatch({type:UPLOAD_IMAGE_METADATA, payload:metadata})
       console.log('metadata', metadata)
    })
    
    })
    
}

export const deleteImage = (imageName) => (dispatch, getState) => {
    //console.log('ge movie', movie)

    storage.ref('images').child(`${imageName}`).delete().then((response) =>{
        dispatch({type:DELETE_IMAGE_SUCCESS})
        console.log('image delete success', response)
    }).catch((error) => {
        dispatch({type:DELETE_IMAGE_FAILED, payload:error})
        console.log('image delete error', error)
    })
}

export const createMovie = (formValues) =>  async (dispatch, getState, {getFirestore}) => {
    //console.log('createMovie fromValues', formValues)
    const firestore = getFirestore();
    const movieName= formValues.title.replace(/\s/g, "")
    firestore.add(
        {collection :'cinema' },
        {
        ...formValues,
        movieName,               
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
export const createImage = (image) => async dispatch =>{
    console.log('createImage', dispatch)
    image.imgPrevUrl = await URL.createObjectURL(image)
    dispatch({type:CREATE_IMAGE, payload:image})
}

export const deleteMovie = (movie, history) => (dispatch, getState, {getFirestore}) => {
    //console.log('delete action movie', movie)

    const firestore = getFirestore();
     firestore.delete({ collection: 'cinema', doc:`${movie.id}`, }).then(() => {
        dispatch({type:DELETE_MOVIE_SUCCESS});
    }).catch((error) => {
        dispatch({type:DELETE_MOVIE_FAILED, payload:error})
    });
    dispatch(deleteImage(movie.image.imageName))
    history.push('/')
}


export const editMovie = (formValues, movie, history) => (dispatch, getState, {getFirestore}) => {
    // console.log('edit form values', formValues)
    // console.log('edit form movie', movie)
    // console.log('edit form history', history)

    const firestore = getFirestore();
    const movieName= formValues.title.replace(/\s/g, "")
     firestore.update({ collection: 'cinema', doc:`${movie.id}`},
        {
        ...formValues,
        movieName,
        updateddAt: new Date(),

        }  
    ).then((response) => {
        dispatch({type:EDIT_MOVIE_SUCCESS, payload:response});
    }).catch((error) => {
        dispatch({type:EDIT_MOVIE_FAILED, payload:error})
    });
    history.push('/')
}



export const clearCreateValues = () => {
    //console.log('clearCreateValues invoked')
    return{ type:CLEAR_CREATE_VALUES}
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