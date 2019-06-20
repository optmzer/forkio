import { elements, sprite } from './base';

// TODO: Create markup
// Create scss

const createListItem = (bookModel) => {
    // console.log("L7 ShopListView item => ", bookModel);
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

export const renderShopListItem = (item) => {
    //get the parent shoppingList <ul>
    const shoppingList = elements.ordersList;
    // console.log("L32 ShoppingListView => ", shoppingList);

    shoppingList.insertAdjacentHTML('afterbegin', createListItem(item));
}

export const deleteShopListItem = (id) => {
    const li = document.querySelector(`[data-orderitemtodelete="${id}"]`);
    // console.log("L39 deleteShopListItem <li> to delete => ", li);

    li.parentNode.removeChild(li);
}

export const rernderShopListItems = (items) => {
    for (const item of items) {
        renderShopListItem(item);
    }
}