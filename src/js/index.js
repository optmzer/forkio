// Global App Controller
import '../sass/main.scss'; // Created main.css
import SearchModel from './models/SearchModel';
import BookModel from './models/BookModel';
import ShopListModel from './models/ShopListModel';

import * as searchView from './views/SearchView';
import * as Highlights from './views/HighlightsView';
import * as DescriptionView from './views/DescriptionView';

import {elements, renderSpinner, clearHtmlElement} from './views/base';
import * as Utils from './models/Utils';
// import * as Base from './views/base';


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
    currentBook: new BookModel(),
    shopList: new ShopListModel()
};

const form = searchView.getForm;

const searchController = (query = "") => {
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

                    bookController(res.data.items[0].id);
                }
            }); //getSearch results
        form.reset(); //reset the form
    }
}

const paginationController = (target) => {
    const paginationBtn = target.closest(".pagination-btn");

    if (paginationBtn) {
        const gotopage = paginationBtn.dataset.gotopage;
        clearHtmlElement(elements.searchResultList);
        searchView.populateSearchList(state.volumeData.data.items, gotopage);
    }
}

const bookController = (id = "") => {
    const hash = window.location.hash.replace("#", "");
    const bookId =  hash ? hash : id;


    if (bookId) {
        clearHtmlElement(elements.bookHighlights);
        renderSpinner(elements.bookHighlights);

        searchView.highlightSelected(bookId);
        // console.log("L81 highlightSelected, bookId => ", bookId);

        state.currentBook.getBookById(bookId)
            .then(() => {
                //fill in details
                clearHtmlElement(elements.bookHighlights);
                Highlights.renderBookHighlights(state.currentBook);

                clearHtmlElement(elements.infoDescriptionContent);
                DescriptionView.renderBookDescription(state.currentBook);
            })
            .catch(err => console.log("L94 index getBookById err => ", err));
    }
}

// Shop Cart Controller
const shopListController = () => {
    // state.shopList.generateUUID();
    // console.log("L101 index uuid => ", Utils.genUUIDv1TimeBased());
}

const init = (query) => {
    // initiate SearchModel
    searchController(query);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("process.env.MOCKUP_ENV_VAR => ", process.env.MOCKUP_ENV_VAR);
        // console.log("process.env => ", process.env);
        searchController();
    });

    elements.searchResultDiv.addEventListener('click', (e) => {
        paginationController(e.target);
    });

    ['hashchange', 'load'].forEach(eventType =>
        window.addEventListener(eventType, bookController)
    );

    shopListController();
}

init("best seller 2019");