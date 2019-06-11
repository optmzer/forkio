export const elements = {
    searchForm: document.querySelector(".search"),
    searchResultDiv: document.querySelector(".search-results"),
    searchResultList: document.querySelector(".search-results > .list"), // TODO: left panel
    bookHighlights: document.querySelector(".hlts"),
    infoDescriptionContent: document.querySelector(".info-description-content"),
    infoRecommendations: document.querySelector(".info-recommendations"),
    pagination: document.querySelector(".pagination")
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