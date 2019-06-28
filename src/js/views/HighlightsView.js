import * as Utils from '../models/Utils';
import * as Base from './base';
import * as GoogleApi from '../models/GoogleApi';

const buildBookHighlights = (book) => {
    // console.log("L8 HighlightsView book => ", book);
    let title = book.title.replace(/"/g, ""); // remove quotes.
    let authors = Utils.buildStringFromArr(book.authors);
    let averageRating = book.averageRating ? book.averageRating : "not rated";
    let isbn_13 = book.industryIdentifiers.length > 0 ? book.industryIdentifiers[0].identifier : "no info";
    let isbn_10 = book.industryIdentifiers.length > 1 ? book.industryIdentifiers[1].identifier : "no info";

    return `
        <figure class="hlts__poster">
            <img src="${GoogleApi.FRONTCOVER}${book.id}?fife=w200-h300" srcset="${GoogleApi.FRONTCOVER}${book.id}?fife=w400-h600 2x" class="hlts__poster-img" aria-hidden="true" alt="Cover art ${title}" itemprop="image">
        </figure>
        <div class="hlts-meta">
            <div class="hlts-meta__title">
                <div>${createMultipartTitle(title)}</div>
            </div>
            <h3 class="hlts-meta__director">by ${authors}</h3>
            <p class="hlts-meta__release-date">Publisher: ${book.publisher}</p>
            <p class="hlts-meta__release-date">Year: ${book.publishedDate}</p>

            <p class="hlts-meta__catch-phrase">${Utils.shortenTitle(book.description, 250)}</p>
            <p class="hlts-meta__ratings">${averageRating}</p>

            <p class="hlts-meta__isbn">ISBN-13: ${isbn_13}</p>
            <p class="hlts-meta__isbn">ISBN-10: ${isbn_10}</p>
        </div>
    `;
}

export const renderBookHighlights = (book) => {
    Base.elements.bookHighlights.insertAdjacentHTML("afterbegin", buildBookHighlights(book));
}

const splitTitle = (title, length) => {
    let words = title.split(" ");

    let titleParts = [];
    let part = "";
    for(let i = 0; i < words.length; ++i) {
        // part += words[i] + " ";
        if((part.length + words[i].length) <= length) {
            part += words[i] + " ";
        } else {
            part.trimRight();
            titleParts.push(part);
            part = words[i] + " ";
        }
    }
    // Add final part
    part.trimRight();
    titleParts.push(part);

    return titleParts;
}

const createMultipartTitle = (title, length = 28) => {
    let output = `<h2>${title}</h2>`;
    if(title.length > length){
        output = ""; // Create multipart title
        for (const part of splitTitle(title, length)) {
            output += `<h2>${part}</h2>`;
        }
    }
    return output;
}