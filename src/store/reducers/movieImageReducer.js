import { CREATE_MOVIE_IMAGE} from '../actions/types';

    const initialState ={
        image:[]
    }

    export default (state =initialState, action) => {
        switch (action.type) {
            case CREATE_MOVIE_IMAGE:
                return {...state, image:action.payload};
            default:
                return state;

                
        }
    }
