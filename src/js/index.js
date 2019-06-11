// Global App Controller
import '../sass/main.scss'; // Created main.css
import SearchModel from './models/SearchModel';
import BookModel from './models/BookModel';

import * as searchView from './views/SearchView';
import * as Highlights from './views/HighlightsView';
import * as DescriptionView from './views/DescriptionView';

import {elements, renderSpinner, clearHtmlElement} from './views/base';
import * as Utils from './models/Utils';


/**
 * Global App State
 * State is stored in localStorage
 * - Search Object
 * - Current Object
 * - Shopping List Object
 * - Liked Object
 */

const state = {
    search: new SearchModel(), // SearchModel
    volumeData: {}, // Response
    currentBook: new BookModel()
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
                clearHtmlElement(elements.searchResultList);

                state.volumeData = res;
                // console.log("L36 state.volumeData => ", res);
                if(res.data.items.length > 0){
                    searchView.populateSearchList(res.data.items);
                    // show first book in the list
                    state.currentBook
                        .getBookById(res.data.items[0].id)
                        .then(() => {
                            // console.log("L55 index new Book => ", state.currentBook);
                            const book = state.currentBook;
                            clearHtmlElement(elements.bookHighlights);
                            Highlights.renderBookHighlights(book);
        
                            // Populate Description
                            clearHtmlElement(elements.infoDescriptionContent);
                            DescriptionView.renderBookDescription(book);
                        })
                        .catch(err => Utils.logError("L64 index, currentBook", err));
                } 
            }); //getSearch results
        form.reset(); //reset the form
    }
}

const init = (query) => {
    // initiate SearchModel
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("process.env.MOCKUP_ENV_VAR => ", process.env.MOCKUP_ENV_VAR);
        // console.log("process.env => ", process.env);
        searchControl();
    });

    elements.searchResultDiv.addEventListener('click', (e) => {
        const li = e.target.closest("li.list__item");
        const paginationBtn = e.target.closest(".pagination-btn");

        if (paginationBtn) {
            const gotopage = paginationBtn.dataset.gotopage;
            clearHtmlElement(elements.searchResultList);
            searchView.populateSearchList(state.volumeData.data.items, gotopage);
        }

        if (li){
            clearHtmlElement(elements.bookHighlights);
            renderSpinner(elements.bookHighlights);

            const bookId = li.dataset.bookidtoshow;
            
            state.currentBook.getBookById(bookId)
                .then(book => {
                    // console.log("L92 index, book => ", state.currentBook);
                    //fill in details
                    clearHtmlElement(elements.bookHighlights);
                    Highlights.renderBookHighlights(state.currentBook);
                    
                    clearHtmlElement(elements.infoDescriptionContent);
                    DescriptionView.renderBookDescription(state.currentBook);
                })
                .catch(err => console.log("L94 index getBookById err => ", err));
        }
    });

    searchControl(query);
}

init("best seller 2019");