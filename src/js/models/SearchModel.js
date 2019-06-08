import axios from 'axios';

export default class SearchModel{
    constructor(){
        // Empty constructor
        // this.query = query;
        this.result = {};
    }

    async getAlbums(city, countryCode){
        // Country code is desirable by manual but will work without it as well
        return await axios(`${process.env.OPEN_WEATHER_API_CITY_SEARCH}?q=${city},${countryCode}&appid=${process.env.OPEN_WEATHER_API_KEY}`)
    }
    
    async getAlbums(city){
        // Country code is desirable by manual but will work without it as well
        try {
            let res = await axios(`${process.env.OPEN_WEATHER_API_CITY_SEARCH}?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
            // console.log("Res => ", res);
            // res.then(r => console.log("Result => ", r.data.city ? r.data.city.name : "no data"));
            console.log("Result => ", res.data.city ? res.data.city.name : "no data");
            
            this.result.city = res.data.city ? res.data.city : "no data";
        } catch (error) {
            console.log("L42 index.js => ", error);
        } 
    }
}
