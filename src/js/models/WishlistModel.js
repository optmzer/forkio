import { genUUIDv1TimeBased } from './Utils';

/**
 * At this stage WishlistModel looks the same as ShoppingList to make it easier
 * 17 Jun 2019
 * TODO: Think about modifying Wishlist to differ from ShoppingList
 */

export default class WishlistModel {
    constructor(){
        this.items = [];
    }

    addItem(item){
        const listItem = {
            id: genUUIDv1TimeBased(), // Generates unique userId. timestamp based
            item
        };
        this.items.push(listItem);
        return listItem; // Just in case I need it.
    }

    /**
     *
     * @param {itemId} id returns -1 if not found, Id if deleted
     */
    removeItem(id){
        const index = this.items.findIndex(el => el.id === id);
        if(index > 0 && this.items.length > 0){
            const item = this.items.splice(index, 1);
            console.log("L26 ShopListModel. Item Deleted => ", item);
            return item;
        }
        return index;
    }
}