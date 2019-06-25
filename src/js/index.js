// Global App Controller
import '../sass/main.scss'; // Created main.css
import SearchModel from './models/SearchModel';
import BookModel from './models/BookModel';
import ShopListModel from './models/ShopListModel';
import WishlistModel from './models/WishlistModel';


import * as SearchView from './views/SearchView';
import * as HeaderView from './views/HeaderView';
import * as Highlights from './views/HighlightsView';
import * as DescriptionView from './views/DescriptionView';
import * as ShopListView from './views/ShopListView';
import * as ActionsView from './views/ActionsView';

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


const searchController = (query = "") => {
    renderSpinner(elements.searchResultList);

    if(query === ""){
        // if no params get query from form
        query = SearchView.getSearchQuery();
    }

    // if there still no query do nothing
    if(query){
        //show loader
        // console.log("L50 index searchController query => ", query);

        state.search.getBooks(query)
            .then(res => {
                clearHtmlElement(elements.searchResultList);

                state.volumeData = res;
                // console.log("L36 state.volumeData => ", res);
                if(res.data.items.length > 0){
                    SearchView.populateSearchList(res.data.items);
                    // show first book in the list

                    bookController(res.data.items[0].id);
                }
            }); //getSearch results
        document.querySelector(".search").reset(); //reset the form
    }
}

const likesController = (target = null) => {
    // Open close cart/wishlist
    // Update Likes/Cart
    // if(elements.likesDiv !== null){
    // Why did I put it inhere???
    //     clearHtmlElement(elements.likesDiv);
    // }
    // if whishlist -> render wishlist
    let cartClick = target.matches("div.likes-item--shopping, div.likes-item--shopping *");
    // console.log("L78 index likesController => ", cartClick);
    if(cartClick){
        ShopListView.toggleShopList(state.shopList.getItems());
    }
    // if cart -> render Cart

    // Update Wishlist/Cart at click
}

const paginationController = (target) => {
    const paginationBtn = target.closest(".pagination-btn");

    if (paginationBtn) {
        const gotopage = paginationBtn.dataset.gotopage;
        clearHtmlElement(elements.searchResultList);
        SearchView.populateSearchList(state.volumeData.data.items, gotopage);
    }
}

const bookController = (id = "") => {
    const hash = window.location.hash.replace("#", "");
    const bookId =  hash ? hash : id;


    if (bookId) {
        clearHtmlElement(elements.bookHighlights);
        renderSpinner(elements.bookHighlights);

        SearchView.highlightSelected(bookId);
        // console.log("L81 highlightSelected, bookId => ", bookId);

        state.currentBook.getBookById(bookId)
            .then(() => {
                //fill in details
                clearHtmlElement(elements.bookHighlights);
                Highlights.renderBookHighlights(state.currentBook);

                // Populate infoActions section
                // Get wishlist button and checked if it is in the wishlist.
                clearHtmlElement(elements.infoActions);
                if(state.wishlist.findItemIndexById(state.currentBook.id) === -1){
                    // Not in the wishlist
                    ActionsView.renderActionButtons(false, false);
                } else {
                    ActionsView.renderActionButtons(false, true);
                }

                // Populate Description section
                clearHtmlElement(elements.infoDescriptionContent);
                DescriptionView.renderBookDescription(state.currentBook);

            })
            .catch(err => console.log("L94 index getBookById err => ", err));
        // console.log("L112 index -> state.wishlist => ", state.wishlist.items);
    }
}

// Info Actions Controller. Add to Cart and Add to Wishlist buttons
const infoActionsController = (target) => {
    // Assume I can only add current item to cart/wishlist
    // Current item is the one user is looking at right now.

    if(target.matches("div.cart, div.cart *")){
        // Update cart
        // console.log("L142 index infoActionsController state.shopList.getItems() => ", state.shopList.getItems());
        state.shopList.addItem(state.currentBook);
        // Set Cart Number to array length
        HeaderView.updateCart(state.shopList.getOrderTotalAmount());
        ShopListView.renderShopListItems(state.shopList.getItems(), state.shopList.getOrderTotalPrice());
        // console.log("L147 index infoActionsController state.shopList.getItems() => ", state.shopList.getItems());
    }

    if(target.matches("div.wishlist, div.wishlist *")){
        // update wishlist
        state.wishlist.toggleItem(state.currentBook);

        // Toggle wishlist selected class
        ActionsView.toggleWishlistSelected();

        // Update Wishlist Number
        HeaderView.updateWishlist(state.wishlist.items.length);
    }

    // console.log("L120 index -> infoActions => ", state.shopList);
    // console.log("L121 index -> state.wishlist => ", state.wishlist.items);
}

// Shop Cart Controller
const shopListController = (target) => {
    // const itemUUID =
    const li = target.closest("li.order-list__item");
    const id = li.dataset.orderitemtodelete;
    console.log("L176 index shopListController target => ", target);
    console.log("L176 index shopListController li id => ", id);

    if(target.matches(".delete-order-item, .delete-order-item *")){
        if(id){
            // console.log("L170 index shopListController delete-order before => ", state.shopList.getOrderTotalAmount()
            state.shopList.removeItem(id);
            ShopListView.deleteShopListItem(id);
            HeaderView.updateCart(state.shopList.getOrderTotalAmount());
        }
    }

    if(target.matches(".order-actions__close, .order-actions__close *")){
        //close shopping list
        ShopListView.toggleShopList(state.shopList.getItems());
    }

    // Adding book amounts
    if(target.matches(".order-list__item-amount-value")){
        console.log("L188 index amount changed => ", target.value);
        HeaderView.updateCart(state.shopList.getOrderTotalAmount());
        ShopListView.renderOrderTotalPrice(state.shopList.getOrderTotalPrice());
    }
}

const init = (query) => {
    // Init Header with the search form
    HeaderView.renderHeader();

    //  wait for DOM to load then add eventListeners
    window.addEventListener('DOMContentLoaded', () => {

        const form = document.querySelector(".search");

        // initiate SearchModel
        searchController(query);

        // initiate Wishlist/Cart indicators Section
        // likesController();

        // Add listener to search bar
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
            // Delete Item
            shopListController(e.target);
        });

        document.querySelector("div.likes").addEventListener('click', e => {
            // Toggle ShopList/Wishlist
            likesController(e.target);
        });
    });
}

init("best seller 2019");