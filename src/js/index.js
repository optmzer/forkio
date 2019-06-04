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

};


const DOMstr = {
    search_input: ".search"
}

let form = document.querySelector(DOMstr.search_input);
let formData = new FormData(form);
let formValues = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Form => ", e);
    if(form.reportValidity()){
        for (const entry of data.entries()) {
            formValues.push(entry);
        }
        console.log("Form value => ", formValues);
    }
    const res = new SearchModel().getAlbums("Dunedin");
    console.log("L29 index response => ", res);
    res.then(r => console.log("Result => ", r));
});

