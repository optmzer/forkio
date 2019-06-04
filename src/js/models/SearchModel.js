import axios from 'axios';

export default class SearchModel{
    constructor(){
        // Empty constructor
        // this.query = query;
    }

    async getAlbums(city, countryCode){
        // Country code is desirable by manual but will work without it as well
        return await axios(`${process.env.OPEN_WEATHER_API_CITY_SEARCH}?q=${city},${countryCode}&appid=${process.env.OPEN_WEATHER_API_KEY}`)
    }
    
    async getAlbums(city){
        // Country code is desirable by manual but will work without it as well
        return await axios(`${process.env.OPEN_WEATHER_API_CITY_SEARCH}?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`);;
    }
}
