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

const renderListItem = (item) => {
    let authors = Utils.buildStringFromArr(item.volumeInfo.authors);
    let thumbnail = item.volumeInfo.imageLinks !== undefined ? item.volumeInfo.imageLinks.smallThumbnail : "default";
    let title = item.volumeInfo.title.replace(/"/g, ""); // remove quotes.
    
    return `
        <li id="${item.id}" class="list__item clickable" data-bookidtoshow="${item.id}">
            <img class="list__item-icon" src="${thumbnail}" alt="Cover for ${Utils.shortenTitle(title)}">
            <div class="list__item-stats">
                <h3 class="list__item-title">${Utils.shortenTitle(title)}</h3>
                <p class="list__item-genre">${authors}</p>
                <p class="list__item-ratings">${item.volumeInfo.averageRating ? item.volumeInfo.averageRating : "not rated"}</p>
            </div>
        </li>
    `;
}

export const populateSearchList = (items, page = 0, perPage = 3) => {
    // console.log("L41 SearchView items => ", items);
    let searchResultList = elements.searchResultList; 
    let start = page * perPage;
    let stop = page * perPage + perPage;
    if(items.length > 0){
        for (const item of items.slice(start, stop)) {
            searchResultList.insertAdjacentHTML("beforeend", renderListItem(item));
        }
        renderPaginationButtons(page, items.length, perPage);
    }
}

const renderPaginationButtons = (page, numRes, perPage) => {
    // data from DOM returned as a string
    page = typeof page === "number" ? page : parseInt(page);
    
    const totalPages = Math.ceil(numRes / perPage);
    let left = "disabled";
    let right = "disabled";
    // totalPages - 1 because my initial page == 0
    let prevId = (page - 1) <= 0 ? 0 : page - 1; // should not be < 0
    let nextId = page === totalPages - 1 ? totalPages - 1 : page + 1;
    // console.log(`Page => ${page}, TotalPages =>  ${totalPages}, prevId => ${prevId}, nextId => ${nextId} `);

    if(numRes !== perPage){ // more then 1 page to display
        if(page === 0 && totalPages > 1){
            //only right is disabled
            right = "";
        }

        if(page > 0 && page < totalPages){
            // both buttons are disabled
            left = "";
            right = "";
        }

        if(page === totalPages - 1){
            // only left button is disabled
            left = "";
            right = "disabled";
        }
    }
    // clear what was before
    elements.pagination.innerHTML = ""; 
    //render new ones
    let buttons = `
        <button id="gotoPrev" data-gotopage="${prevId}" class="btn pagination-btn ${left !== "disabled" ? "clickable" : "dead"}" ${left}>&lt;</button>
        <button class="btn pagination-btn dead" disabled>page ${page + 1} of ${totalPages}</button>
        <button id="gotoNext" data-gotopage="${nextId}" class="btn pagination-btn ${right !== "disabled"  ? "clickable" : "dead"}" ${right}>&gt;</button>
    `;

    elements.pagination.insertAdjacentHTML('afterbegin', buttons);
}