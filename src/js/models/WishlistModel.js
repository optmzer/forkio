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
            // id: genUUIDv1TimeBased(), // Generates unique userId. timestamp based
            id: item.id, // Generates unique userId. timestamp based
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
        const index = this.findItemIndexById(id);
        if(index !== -1){
            const item = this.items.splice(index, 1);
            return item;
        }
        return index;
    }

    toggleItem(bookModel){
        // console.log(`L38 WishlistModel bookModel.id => ${bookModel.id}`);
        if(this.findItemIndexById(bookModel.id) === -1){
            console.log("L40 WishlistModel.toggleItem ADD BOOK");
            this.addItem(bookModel);
        } else {
            this.removeItem(bookModel.id);
            console.log("L44 WishlistModel.toggleItem REMOVE BOOK");
        }
    }

    findItemIndexById(id){
        const index = this.items.findIndex(el => el.id === id);
        // console.log(`L48 WishlistModel.findItemIndexById Item id => ${id}: index => ${index}`);
        return index;
    }
}