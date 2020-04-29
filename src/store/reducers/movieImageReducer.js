import { CREATE_MOVIE_IMAGE, UPLOAD_MOVIE_IMAGE} from '../actions/types';

    const initialState ={
        createdImage:[],
        uploadedImage:[]
    }

    export default (state =initialState, action) => {
        switch (action.type) {
            case CREATE_MOVIE_IMAGE:
                return {...state, createdImage:action.payload};
            case UPLOAD_MOVIE_IMAGE:
                return {...state, uploadedImage:action.payload};
            default:
                return state;

                
        }
    }
