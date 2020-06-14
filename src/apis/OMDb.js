import axios from 'axios';
import {APIKey} from './OMDbApi';


export default axios.create ({
    baseURL:`http://www.omdbapi.com/?apikey=${APIKey}&s=`
});