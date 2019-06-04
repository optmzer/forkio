// Global App Controller
import SearchModel from './models/SearchModel';

/**
 * Global App State
 * State is stored in localStorage
 * - Search Object
 * - Current Object
 * - Shopping List Object
 * - Liked Object
 */

const state = {
    searchQuery: ""
};

const DOMstr = {
    search_input: ".search"
}

let form = document.querySelector(DOMstr.search_input);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("process.env.MOCKUP_ENV_VAR => ", process.env.MOCKUP_ENV_VAR);

    let formData = new FormData(e.target);
    let formValues = [];
    if(form.reportValidity()){
        for (const entry of formData.entries()) {
            formValues.push(entry);
        }
        state.searchQuery = formValues[0][1];
    }
    try {
        console.log("Input => ", state.searchQuery);

        const res = new SearchModel().getAlbums(state.searchQuery);
        res.then(r => console.log("Result => ", r.data.city ? r.data.city.name : "no data"));
    } catch (error) {
        console.log("L42 index.js => ", error);
    } finally{
        form.reset();
        state.searchQuery = "";
    }
});

