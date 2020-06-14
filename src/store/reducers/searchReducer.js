import {
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_ERROR,
    FETCH_MOVIE_SUCCESS,
    FETCH_MOVIE_ERROR,
} from '../actions/types';

const initialState = {
    text : '',
    movies : [],
    errror:[],
    loading : false,
    movie : [], 
}

export default function (state = initialState, action) {
    switch (action.type) {
        // case SEARCH_MOVIE:
        //     return {
        //         ...state,
        //         text: action.payload,
        //         loading: false,
        //     }
            case FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                movies: action.payload,
                loading:false,
            }
            case FETCH_MOVIE_SUCCESS:
            return {
                ...state,
                movie: action.payload,
                loading:false,
            }

        default :
        return state
    }
}