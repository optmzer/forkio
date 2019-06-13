import uuidv1 from 'uuid/v1';

export default class ShoppingListModel {
    constructor(){
        this.items = [];
    }

    addItem(item){
        const uuid = uuidv1();
        const item = {
            id: uuid, // Generates unique userId. timestamp based
            item
        };
        this.items.push(item);
        return item; // Just in case I need it.
    }

    /**
     *
     * @param {itemId} id returns -1 if not found, Id if deleted
     */
    removeItem(id){
        const index = this.items.findIndex(el => el.id === id);
        if(index > 0 && this.items.length > 0){
            const item = this.items.splice(index, 1);
            console.log("L26 ShoppingListModel. Item Deleted => ", item);
            return item;
        }
        return index;
    }
}