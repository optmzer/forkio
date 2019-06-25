import { elements, sprite, logo } from './base';


const createLogo = () => {
    return `
        <div class="logo">
            <img src="${logo}" alt="logo">
        </div>
    `;
}

const createSearchBar = () => {
    return`
        <form class="search">
            <input name="search" type="text" class="search__field" placeholder="search over 1,000,000 records" required>
            <button class="btn search__btn clickable">
                <svg class="search__icon">
                    <use href="${sprite}#icon-search"></use>
                </svg>
            </button>
        </form>
    `;
}

// const renderLikesElement = (wishlistCount = "", cartCount = "") => {
//     elements.likesDiv
//     .insertAdjacentHTML('afterbegin', createLikesElements(wishlistCount, cartCount));
// }

const createLikesElements = (wishlistCount = "", cartCount = "") => {
    // console.log("L11 HeaderView heart => ", sprite);
    return `
        <div class="likes">
            <div class="likes-item likes-item--wishlist">
            <svg class="likes-item__icon">
                <use href="${sprite}#icon-heart"></use>
            </svg>
            <span class="likes-item__icon--text">${wishlistCount}</span>
            </div>
            <div class="likes-item likes-item--shopping">
                <svg class="likes-item__icon likes-item__icon--shopping-cart">
                    <use href="${sprite}#icon-shopping-cart"></use>
                </svg>
                <span class="likes-item__icon--text">${cartCount}</span>
            </div>
            <div class="likes-item likes-item--user">
                <a href="https://github.com/optmzer/forkio" target="_blank" title="Git source">
                <svg class="likes-item__icon likes-item__icon--user">
                    <use href="${sprite}#icon-user-solid-circle"></use>
                </svg>
                </a>
            </div>
        </div>
    `;
}

export const updateWishlist = (likesNumber) => {
    const el = document.querySelector(".likes-item--wishlist>span");
    el.innerText = likesNumber === 0 ? "" : likesNumber;
}

export const updateCart = (itemsNumber) => {
    // console.log("L63 HeaderView updateCart number => ", itemsNumber);
    const el = document.querySelector(".likes-item--shopping>span");
    el.innerText = itemsNumber === 0 ? "" : itemsNumber;
}

export const updateLikesData = (likesNumber, itemsNumber) => {
    updateWishlist(likesNumber);
    updateCart(itemsNumber);
}

export const renderHeader = () => {
    elements.headerDiv
    .insertAdjacentHTML('beforeend', createLogo());

    elements.headerDiv
    .insertAdjacentHTML('beforeend', createSearchBar());

    elements.headerDiv
    .insertAdjacentHTML('beforeend', createLikesElements());
}