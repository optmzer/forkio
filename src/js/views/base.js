export const elements = {
    searchForm: document.querySelector(".search"),
    searchResultDiv: document.querySelector(".search-results"),
    searchResultList: document.querySelector(".search-results > .list"),
    // serchListItemsNodeList: document.querySelectorAll(".list__item > a"), // Not working when imported ???
    bookHighlights: document.querySelector(".hlts"),
    infoActions: document.querySelector(".info-actions"),
    infoActionsWishListBtnIcon: document.querySelector("svg#btn-wishlist-icon"),
    infoDescriptionContent: document.querySelector(".info-description-content"),
    infoRecommendations: document.querySelector(".info-recommendations"),
    pagination: document.querySelector(".pagination"),
    orderSectionDiv: document.querySelector(".orders"),
    ordersList: document.querySelector(".order-list")
};


/**
 * Spinner - Loader attaches itself to a parent element
 * by insertAdjacentHTML('afterbegin', spinner)
 * @param {htmlElement} parent
 */
export const renderSpinner = (parent) => {
    //clear parent element to show spinner
    parent.innerHTML = "";

    const spinner = `
        <div class="spinner">
            <svg>
                <use href="img/icomoon/sprite.svg#icon-spinner3"></use>
            </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin', spinner);
};

/**
 * Clears HTMLElement from its content
 * @param {htmlElement} element
 */
export const clearHtmlElement = (element) => {
    element.innerHTML = "";
}