import { CREATE_MOVIE_IMAGE, UPLOAD_MOVIE_IMAGE, UPLOAD_IMAGE_PROGRESS} from '../actions/types';

    const initialState ={
        createdImage:{
            imgPrevUrl:'',
            name:'',
            size:'',
        },
        uploadImgPercent:0
    }

    export default (state =initialState, action) => {
        switch (action.type) {
            case CREATE_MOVIE_IMAGE:
                return {...state, createdImage:action.payload};
            case UPLOAD_MOVIE_IMAGE:
                return {...state, uploadedImgUrl:action.payload};
            case UPLOAD_IMAGE_PROGRESS:
                return {...state, uploadImgPercent:action.payload}
            default:
                return state;

                
        }
    }
