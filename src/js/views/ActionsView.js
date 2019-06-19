import { elements } from './base';

export const toggleWishlistSelected = () => {
    // const btn = elements.infoActionsWishListBtnIcon;
    const btn = document.querySelector("svg#btn-wishlist-icon");

    // console.log("L5 ActionView.btn-Wishlist => ", btn);
    btn.classList.toggle("info-actions__icon--wishlist-selected");
}

const createActionButtons = (cart, wishlist) => {
    return `
        <div class="clickable info-actions__add-to cart" data-addto-cart="true">
            <div class="info-actions__icon-bg">
                <svg id="btn-cart-icon" class="info-actions__icon ${cart ? "info-actions__icon--cart-selected" : ""}">
                    <use href="img/icomoon/sprite.svg#icon-shopping-cart"></use>
                </svg>
            </div>
            <span>Add to Cart</span>
        </div>
        <div class="clickable info-actions__add-to wishlist" data-addto-wishlist="true">
            <div class="info-actions__icon-bg">
                <svg id="btn-wishlist-icon" class="info-actions__icon ${wishlist ? "info-actions__icon--wishlist-selected" : ""}" title="Add to Wish List">
                    <use href="img/icomoon/sprite.svg#icon-heart"></use>
                </svg>
            </div>
            <span>Add to Wishlist</span>
        </div>
    `;
}

export const renderActionButtons = (cart = false, wishlist = false) => {
    // console.log(`L31 ActionsView.renderActionButtons => cart = ${cart}, wishlist = ${wishlist}`);
    elements.infoActions
    .insertAdjacentHTML('afterbegin', createActionButtons(cart, wishlist));
}