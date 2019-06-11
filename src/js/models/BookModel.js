import axios from 'axios';
import * as GoogleApi from './GoogleApi';

import * as Utils from './Utils';

export default class BookModel {

    constructor(){ 
     }

    async getBookById(id){
        this.id = id;

        let book = null;
        try {
            let uri = `${GoogleApi.VOLUMES}/${this.id}`;
            book = await axios(uri);
            // Utils.logOutput("L18 book => ", book);
            if(book.status === 200){
                this.title = book.data.volumeInfo.title ;
                this.authors = book.data.volumeInfo.authors ;
                this.averageRating = book.data.volumeInfo.averageRating ;
                this.industryIdentifiers = book.data.volumeInfo.industryIdentifiers ;
                this.description = book.data.volumeInfo.description ;
                this.thumbnailSmall = book.data.volumeInfo.imageLinks.small;
                this.thumbnailMedium = book.data.volumeInfo.imageLinks.medium;
                this.thumbnailLarge = book.data.volumeInfo.imageLinks.large;
            } else {
                Utils.logOutput("L29 getBookById status != 200", book);
            }
        } catch (error) {
            console.log("L32 Book Error => ", error);
        }
    }
}

