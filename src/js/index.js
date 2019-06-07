// Global App Controller
import '../sass/main.scss'; // Created main.css
import SearchModel from './models/SearchModel';
import * as searchView from './views/SearchView';
import {elements} from './views/base';



/**
 * Global App State
 * State is stored in localStorage
 * - Search Object
 * - Current Object
 * - Shopping List Object
 * - Liked Object
 */

const state = {
    search: {}
};

let form = searchView.getForm;

const searchControl = () => {
    const query = searchView.getSearchQuery();

    if(query){
        state.search = new SearchModel(query);
        //show loader

        state.search.getAlbums(query); //getSearch results
        form.reset(); //reset the form
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("process.env.MOCKUP_ENV_VAR => ", process.env.MOCKUP_ENV_VAR);
    // console.log("process.env => ", process.env);
    searchControl();
});

