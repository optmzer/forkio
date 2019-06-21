import { elements, sprite, clearHtmlElement } from './base';


const createListItem = (bookModel) => {
    // console.log("L7 WatchListView item => ", bookModel);
    const saleinfo = bookModel.item.saleInfo;
    let price = "";
    if(saleinfo.saleability === "FOR_SALE"){
        price = saleinfo.retailPrice.currencyCode + ' ' + saleinfo.retailPrice.amount;
    }else {
        price = 'NOT FOR SALE';
    }

    return `
        <li data-orderitemtodelete="${bookModel.id}" class="order-list__item" >
            <div class="order-list__item-amount">
                <input class="order-list__item-amount-value" type="number" min="1" max="100" step="1" value="${bookModel.amount}">
            </div>
            <img class="order-list__item-icon" src="http://books.google.com/books/content?id=${bookModel.item.id}&amp;printsec=frontcover&amp;img=1&amp;zoom=5&amp;edge=curl&amp;source=gbs_api" alt="Cover for Verses for the Dead">
            <div class="order-list__item-stats">
                <a href="#${bookModel.item.id}" target="_blank" >
                    <h3 class="order-list__item-stats--title">${bookModel.item.title}</h3>
                </a>
                    <p class="order-list__item-stats--author">${bookModel.item.authors}</p>
                    <p class="order-list__item-stats--price">${price}</p>
                </div>
            <div class="order-list__item-actions delete-order-item">
                <svg class="trash" >
                    <use href="${sprite}#icon-trash"></use>
                </svg>
            </div>
        </li>
    `;
}

const createWatchListSection = (items) => {
    const list = items.length === 0 ? "" : createWatchListItems(items);
    return `
        <h2 class="orders-header">Shopping Cart</h2>
        <ul class="order-list">
            ${list}
        </ul>
        <div class="order-total">
            <p>Order Total:</p><span class="order-total__price">$120.00</span>
        </div>
        <div class="order-actions">
            <button class="btn clickable order-actions__checkout">Checkout</button>
            <button class="btn clickable order-actions__close">Close</button>
        </div>
    `;
}

const renderWatchListSection = (items) => {
    const el = elements.orderSectionDiv;
    el.insertAdjacentHTML("afterbegin", createWatchListSection(items));
}

export const toggleWatchList = (items) => {
    // childElementCount == 0 -- Empty
    const ordersDiv = elements.orderSectionDiv;
    if(ordersDiv.childElementCount == 0) {
        renderWatchListSection(items);
    } else {
        clearHtmlElement(ordersDiv);
    }
}