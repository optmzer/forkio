import { genUUIDv1TimeBased } from './Utils';

export default class ShopListModel {
    constructor(){
        this.items = [];
    }

    addItem(item){
        const listItem = {
            id: genUUIDv1TimeBased(), // Generates unique userId. timestamp based
            amount: 1, // Amount of items to buy. default is 1
            item
        };
        this.items.push(listItem);
        console.log("L15 ShopListModel this.items => ", this.items);
    }

    /**
     *
     * @param {itemId} id returns -1 if not found, Id if deleted
     */
    removeItem(id){
        const index = this.items.findIndex(el => el.id === id);
        if(index >= 0){
            const item = this.items.splice(index, 1);
            // console.log("L28 ShopListModel. Item Deleted => ", item);
            return item;
        }
        return index;
    }

    // getListLength(){
    //     return this.items.length;
    // }

    // getItems(){
    //     return this.items;
    // }
}