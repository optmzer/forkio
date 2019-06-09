import axios from 'axios';
import * as GoogleApi from './GoogleApi';
import * as Utils from './Utils';

//https://www.googleapis.com/books/v1/volumes?q=top+sellers+2019
// HOWTO: https://developers.google.com/books/docs/v1/using

export default class SearchModel{
    constructor(){
        // Empty constructor
        // this.query = query;
    }

    async getBooks(query){
        // Country code is desirable by manual but will work without it as well
        let res = null;
        try{
            res = await axios(`${GoogleApi.volume}?q=${query.replace(/ /g, "+")}`);
            // console.log("res => ", res.status === 200 ? res.data : res.statusText);
            // console.log("Result => ", res.data.items.length > 0 ? res.data.items : res);
        }catch(err){
            res.error = err;
            Utils.logError(err);
        }
        
        return res;
    }
    
    async getShelves(city){
        // Create Authenticated request to get user shelves
        // try {
        //     let res = await axios(`${GoogleApi.volume}?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
        //     // console.log("Res => ", res);
        //     // res.then(r => console.log("Result => ", r.data.city ? r.data.city.name : "no data"));
        //     console.log("Result => ", res.data.city ? res.data.city.name : "no data");
            
        //     this.volumeData.city = res.data.city ? res.data.city : "no data";
        // } catch (error) {
        //     console.log("L42 index.js => ", error);
        // } 
    }

    
}
