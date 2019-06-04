import axios from 'axios';
import * as USER_SECRETS from '../USER_SECRETS';

export default class SearchModel{
    constructor(){
        // Empty constructor
        // this.query = query;
    }

    async getAlbums(city, countryCode){
        // Country code is desirable by manual but will work without it as well
        return await axios(`${USER_SECRETS.API_CITY_SEARCH}?q=${city},${countryCode}&appid=${USER_SECRETS.SPOTIFY_API_KEY}`)
    }
    
    async getAlbums(city){
        // Country code is desirable by manual but will work without it as well
        return await axios(`${USER_SECRETS.API_CITY_SEARCH}?q=${city}&appid=${USER_SECRETS.SPOTIFY_API_KEY}`)
    }
}
