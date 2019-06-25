import { elements, sprite, clearHtmlElement } from './base';
import { convertToLocalCurrency } from '../models/Utils';

const createListItem = (bookModel) => {
    // console.log("L7 ShopListView item => ", bookModel);
    const saleinfo = bookModel.item.saleInfo;
    let price = "";
    if(saleinfo.saleability === "FOR_SALE") {
        price = convertToLocalCurrency(saleinfo.listPrice.amount);
    } else {
        price = 'NOT AVAILABLE FOR SALE';
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

export const renderShopListItem = (item) => {
    //get the parent shoppingList <ul>
    // const shoppingList = elements.ordersList;
    const shoppingList = document.querySelector(".order-list");
    // console.log("L32 ShoppingListView => ", shoppingList);

    shoppingList.insertAdjacentHTML('afterbegin', createListItem(item));
}

export const deleteShopListItem = (id) => {
    const li = document.querySelector(`[data-orderitemtodelete="${id}"]`);
    li.parentNode.removeChild(li);
}

export const renderShopListItems = (items) => {
    // If div section is already populated add items
    const el = document.querySelector(".order-list");
    if(el){
        // clear element
        clearHtmlElement(el);
        for (const item of items) {
            renderShopListItem(item);
        }
    }
}

const createShopListItems = (items) => {
    let list = "";

    for (const item of items) {
        list += createListItem(item);
    }

    return list;
}

export const toggleShopList = (items, total) => {
    // childElementCount == 0 -- Empty
    const ordersDiv = elements.orderSectionDiv;
    if(ordersDiv.childElementCount == 0) {
        renderShopListSection(items, total);
    } else {
        clearHtmlElement(ordersDiv);
    }
}

const createShopListSection = (items, total = 0) => {
    const list = items.length === 0 ? "" : createShopListItems(items);
    let msg = "";
    if(total === 0) {
        msg = `<p>Your Cart Is Empty</p>`;
    } else {
        msg = createOrderTotalElement(total);
    }
    return `
        <h2 class="orders-header">Shopping Cart</h2>
        <ul class="order-list">${list}</ul>
        <div class="order-total">${msg}</div>
        <div class="order-actions">
            <button class="btn clickable order-actions__checkout">Checkout</button>
            <button class="btn clickable order-actions__close">Close</button>
        </div>
    `;
}

export const renderShopListSection = (items, total) => {
    const el = elements.orderSectionDiv;
    clearHtmlElement(el);
    el.insertAdjacentHTML("afterbegin", createShopListSection(items, total));
}

export const renderOrderTotalPrice = (totalPrice) => {
    // Get elem
    const el = document.querySelector("div.order-total");
    if(el.childElementCount > 0){
        //clear it
        clearHtmlElement(el);
        // render new one
        el.insertAdjacentHTML('afterbegin', createOrderTotalElement(totalPrice));
    }
}

const createOrderTotalElement = (total) => {
    return `
        <p>Order Total:</p>
        <span class="order-total__price">
            ${convertToLocalCurrency(total)}
        </span>
    `;
}