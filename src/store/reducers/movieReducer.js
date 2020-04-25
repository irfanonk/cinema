import _ from 'lodash';
import { 
    FETCH_MOVIES, 
    FETCH_MOVIE, 
    CREATE_MOVIE_SUCCESS,
    CREATE_MOVIE_FAILED,
    DELETE_MOVIE_SUCCESS,
    DELETE_MOVIE_FAILED,
} from '../actions/types';


    export default (state = {movie:[], error:[],}, action) => {
        switch (action.type) {
            // case FETCH_MOVIES:
            //     //_mapKeys turns array into an object taking 'id' as a key
            //     //it takes action.payload array and create an obj. 
            //     //  ... adds them into new object
            //     return { ...state, ..._.mapKeys(action.payload, 'title') };
            case CREATE_MOVIE_SUCCESS:
                return {...state, movie:action.payload, isCreateOk:true};
            case CREATE_MOVIE_FAILED:
                return {...state, error:action.payload,  isCreateOk:false };
            case DELETE_MOVIE_SUCCESS:
                return {...state, isDeleteOk:true};
            case DELETE_MOVIE_FAILED:
                return {...state, error:action.payload,  isDeleteOk:false};
            // case FETCH_MOVIE:
            //     return {...state, [action.payload.id]:action.payload};
            default:
                return state;

                
        }
    }
