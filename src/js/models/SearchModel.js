import axios from 'axios';
import { ConsoleLogger } from '@aws-amplify/core';

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
        
        console("L18 SearchModel Env => ", process.env);
        let res;
        try {
            res = await axios(`${process.env.OPEN_WEATHER_API_CITY_SEARCH}?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
        } catch (error) {
            console.log("L21 SearchModel error => ", error);
        }
        
        return res;
    }
}
