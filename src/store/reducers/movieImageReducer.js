import { CREATE_MOVIE_IMAGE, 
    UPLOAD_MOVIE_IMAGE, 
    UPLOAD_IMAGE_PROGRESS,
    UPLOAD_IMAGE_ERROR,
    UPLOAD_MOVIE_IMAGE_METADATA,
    DELETE_IMAGE_SUCCESS,
    DELETE_IMAGE_FAILED,
    CLEAR_CREATE_VALUES,
} from '../actions/types';

    const initialState ={
        createdImage:{
            imgPrevUrl:'',
            name:'',
            size:'',
            imageType:'',
        },
        uploadedImgUrl:'',
        uploadImgPercent:0,
        uploadError:'',
        deleteImg:false,
        deleteImgError:'',
        imageMetadata:'',
    }

    export default (state =initialState, action) => {
        switch (action.type) {
            case CREATE_MOVIE_IMAGE:
                return {...state, createdImage:action.payload};
            case UPLOAD_MOVIE_IMAGE:
                return {...state, uploadedImgUrl:action.payload};
            case UPLOAD_IMAGE_PROGRESS:
                return {...state, uploadImgPercent:action.payload}
            case CLEAR_CREATE_VALUES:
                return {...state, ...initialState}
            case UPLOAD_IMAGE_ERROR:
                return {...state, uploadError:action.payload}
            case DELETE_IMAGE_SUCCESS:
                return {...state, deleteImg:true}
            case DELETE_IMAGE_FAILED:
                return {...state, deleteImg:false, deleteImgError:action.payload}
            case UPLOAD_MOVIE_IMAGE_METADATA:
                return {...state, imageMetadata:action.payload}
        default:

                return state;

                
        }
    }
