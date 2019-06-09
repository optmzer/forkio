import {elements} from './base';
import * as Utils from '../models/Utils';

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
    let authors = Utils.buildStringFromArr(item.volumeInfo.authors);
    let thumbnail = item.volumeInfo.imageLinks !== undefined ? item.volumeInfo.imageLinks.smallThumbnail : "default";
    let title = item.volumeInfo.title.replace(/"/g, ""); // remove quotes.
    
    return `
        <li id="${item.id}" class="list__item">
            <img class="list__item-icon" src="${thumbnail}" alt="frontcover for ${title}">
            <div class="list__item-stats">
                <h3 class="list__item-title">${title}</h3>
                <p class="list__item-genre">${authors}</p>
                <p class="list__item-ratings">${item.volumeInfo.averageRating ? item.volumeInfo.averageRating : "not rated"}</p>
            </div>
        </li>
    `;
}


export const populateSearchList = (items) => {
    // console.log("L41 SearchView items => ", items);
    let searchResultList = elements.searchResultList; 
    if(items.length > 0){
        for (const item of items) {
            searchResultList.insertAdjacentHTML("beforeend", renderListItem(item));
        }
    }
}
