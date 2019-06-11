import * as Base from '../views/base';

const constructBookDescription = (book) => {
    return `
        ${book.description}
    `;
}

export const renderBookDescription = (book) => {
    Base.elements
        .infoDescriptionContent
        .insertAdjacentHTML('afterbegin', constructBookDescription(book));
}