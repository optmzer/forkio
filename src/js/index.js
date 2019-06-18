// Global App Controller
import '../sass/main.scss'; // Created main.css
import SearchModel from './models/SearchModel';
import BookModel from './models/BookModel';
import ShopListModel from './models/ShopListModel';
import WishlistModel from './models/WishlistModel';


import * as searchView from './views/SearchView';
import * as Highlights from './views/HighlightsView';
import * as DescriptionView from './views/DescriptionView';
import * as shopListView from './views/ShopListView';

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
    shopList: new ShopListModel(),
    wishlist: new WishlistModel()
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

// Info Actions Controller. Add to Cart and Add to Wishlist buttons
const infoActionsController = (target) => {
    // Assume I can only add current item to cart/wishlist
    // Current item is the one user is looking at right now.
    if(target.matches("div.cart, div.cart *")){
        // Update cart
        const item = state.shopList.addItem(state.currentBook);
        shopListView.renderShopListItem(item);
    }

    if(target.matches("div.wishlist, div.wishlist *")){
        // update wishlist
        state.wishlist.addItem(state.currentBook);
    }

    // console.log("L120 index -> infoActions => ", state.shopList);
    // console.log("L121 index -> state.wishlist => ", state.wishlist);

}

// Shop Cart Controller
const shopListController = (target) => {
    if(target.matches(".delete-order-item, .delete-order-item *")){
        const btnTrash = target.closest("li.order-list__item");
        const id = btnTrash.dataset.orderitemtodelete;
        // state.shopList.generateUUID();
        // console.log("L126 index delete item btnTrash => ", btnTrash);
        // console.log("L126 index delete item btnTrash => ", id);
        if(id){
            state.shopList.removeItem(id);
            shopListView.deleteShopListItem(id);
        }

    }
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

    // Add listeners to buttons Addto ShoppingList and add to wishlist
    elements.infoActions.addEventListener('click', (e) => {
        infoActionsController(e.target);
    });

    elements.orderSectionDiv.addEventListener('click', e => {
        shopListController(e.target);
    });
}

init("best seller 2019");