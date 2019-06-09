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
    search: {},
    volumeData: {}
};

let form = searchView.getForm;

const searchControl = () => {
    const query = searchView.getSearchQuery();

    if(query){
        searchView.clearSearchResultList();
        //show loader

        state.search = new SearchModel();
        state.search.getBooks(query)
            .then(res => {
                state.volumeData = res;
                console.log("L36 state.volumeData => ", res);
                if(res.data.items.length > 0){
                    searchView.populateSearchList(res.data.items);
                } 
            }); //getSearch results
        form.reset(); //reset the form
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("process.env.MOCKUP_ENV_VAR => ", process.env.MOCKUP_ENV_VAR);
    // console.log("process.env => ", process.env);
    // show spinner while search is fetching data and populating search list
    searchControl();
});

