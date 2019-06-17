import { elements } from './base';

// TODO: Create markup
// Create scss

const createListItem = (item) => {
    return `
    <li id="${item.id}" class="order-list__item" data-order-itemtodelete="${item.id}">
        <div class="order-list__item-amount">
            <input class="order-list__item-amount-value" type="number" min="0" max="100" step="1">
        </div>
        <img class="order-list__item-icon" src="http://books.google.com/books/content?id=${item.id}&amp;printsec=frontcover&amp;img=1&amp;zoom=5&amp;edge=curl&amp;source=gbs_api" alt="Cover for Verses for the Dead">
        <div class="order-list__item-stats">
            <a href="#${item.id}" target="_blank" >
                <h3 class="order-list__item-stats--title">${item.title}</h3>
            </a>
                <p class="order-list__item-stats--author">${item.authors}</p>
                <p class="order-list__item-stats--price">${item.price.toString('C')}</p>
            </div>
        <div class="order-list__item-actions" >
            <svg class="trash">
                <use href="img/icomoon/sprite.svg#icon-trash"></use>
            </svg>
        </div>
    </li>
    `;
}

export const renderShopListItem = (item) => {
    //get the parent shoppingList <ul>
    const shoppingList = elements.ordersList;
    console.log("L32 ShoppingListView => ", shoppingList);

    shoppingList.insertAdjasentHTML('afterbegin', createListItem(item));
}

export const deleteShopListItem = (id) => {
    const li = document.querySelector(`[data-order-itemtodelete="${id}"]`);
    console.log("L39 deleteShopListItem <li> to delete => ", li);

    li.parentNode.removeChild();
}