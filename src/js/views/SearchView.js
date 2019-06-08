import {elements} from './base';

// ======== EXPORTS ===========
export const getForm = elements.searchForm;

export const getSearchQuery = () => {
    console.log("L7 SearchView.getForm => ", getForm);

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
