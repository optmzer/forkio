import {elements} from './base';

// ======== EXPORTS ===========
export const getForm = elements.searchForm;

export const getSearchQuery = () => {
    // console.log("L7 SearchView.getForm => ", getForm);

    let formData = new FormData(getForm);
    let formValues = [];
    let query = "";

    if(getForm.checkValidity()){
        for (const entry of formData.entries()) {
            formValues.push(entry);
        }
        query = formValues[0][1];
    }

    return query;
}

export const clearSearchResultList = () => {
    elements.searchResultList.innerHTML = "";
}

const renderListItem = (item) => {
    return `
        <li id="${item.accessInfo.id}" class="list__item">
            <img class="list__item-icon" src="${item.volumeInfo.imageLinks.smallThumbnail}">
            <div class="list__item-stats">
                <h3 class="list__item-title">${item.volumeInfo.title}</h3>
                <p class="list__item-genre">${item.volumeInfo.authors[0]}</p>
                <p class="list__item-ratings">${item.volumeInfo.averageRating ? item.volumeInfo.averageRating : "not rated"}</p>
            </div>
        </li>
    `;
}

export const populateSearchList = (items) => {
    console.log("L41 SearchView items => ", items);
    console.log("SearchResultList => ", elements.searchResultList);
    let searchResultList = elements.searchResultList; 
    if(items.length > 0){
        for (const item of items) {
            searchResultList.insertAdjacentHTML("afterbegin", renderListItem(item));
        }
    }
}
