// Global App Controller
import '../sass/main.scss'; // Created main.css
import SearchModel from './models/SearchModel';
import * as searchView from './views/SearchView';
import * as Highlights from './views/HighlightsView';
import {elements, renderSpinner} from './views/base';



/**
 * Global App State
 * State is stored in localStorage
 * - Search Object
 * - Current Object
 * - Shopping List Object
 * - Liked Object
 */

const state = {
    search: {}, // SearchModel
    volumeData: {} // Response
};

const form = searchView.getForm;

const searchControl = (query = "") => {
    renderSpinner(elements.searchResultList);

    if(query === ""){
        // if no params get query from form
        query = searchView.getSearchQuery();
    }
    
    // if there still no query do nothing
    if(query){
        //show loader
        
        state.search.getBooks(query)
            .then(res => {
                searchView.clearSearchResultList();

                state.volumeData = res;
                // console.log("L36 state.volumeData => ", res);
                if(res.data.items.length > 0){
                    searchView.populateSearchList(res.data.items);
                    // show first book in the list
                    Highlights.clearBookHighlights();
                    Highlights.renderBookHighlights(res.data.items[0]);
                } 
            }); //getSearch results
        form.reset(); //reset the form
    }
}

const init = (query) => {
    // initiate SearchModel
    state.search = new SearchModel();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("process.env.MOCKUP_ENV_VAR => ", process.env.MOCKUP_ENV_VAR);
        // console.log("process.env => ", process.env);
        // show spinner while search is fetching data and populating search list

        searchControl();
    });

    elements.searchResultDiv.addEventListener('click', (e) => {
        const li = e.target.closest("li.list__item");
        const paginationBtn = e.target.closest(".pagination-btn");

        if (paginationBtn) {
            const gotopage = paginationBtn.dataset.gotopage;
            searchView.clearSearchResultList();
            searchView.populateSearchList(state.volumeData.data.items, gotopage);
        }

        if (li){
            // TODO: get it from API rother then from state.volumeData
            const bookId = li.dataset.bookidtoshow;
            const book = state.volumeData.data.items.find(item => item.id === bookId);
            Highlights.clearBookHighlights();
            Highlights.renderBookHighlights(book);
        }
    });

    searchControl(query);
}

init("best seller 2019");