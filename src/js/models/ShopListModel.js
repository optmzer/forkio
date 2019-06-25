import { genUUIDv1TimeBased } from './Utils';
import BookModel from './BookModel';

export default class ShopListModel {
    constructor(){
        this.items = [];
        this.total = 0;
        this.totalAmount = 0;
    }

    addItem(item){
        const _book = new BookModel();
        const keys = Object.keys(item);

        for (const key of keys) {
            _book[key] = item[key];
        }

        const listItem = {
            id: genUUIDv1TimeBased(), // Generates unique userId. timestamp based
            amount: 1, // Amount of items to buy. default is 1
            item: _book
        };
        // this.items = this.items.splice(0, this.items.length); // Did not fix the bug.
        this.items.push(listItem);
        this.updateOrderTotals();
        // console.log("L27 ShopListModel this.total => ", this.total);
        // console.log("L28 ShopListModel this.totalAmount => ", this.totalAmount);
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

            // Recalculate order totals
            this.updateOrderTotals();

            return item;
        }
        return index;
    }

    getListLength(){
        return this.items.length;
    }

    getItems(){
        return this.items;
    }

    getOrderTotalPrice(){
        return this.total;
    }

    getOrderTotalAmount() {
        return this.totalAmount;
    }

/**
 * retailPrice: Object { amount: 9.76, currencyCode: "NZD" }
​​​
saleability: "FOR_SALE"
 */
    calculateOrderTotalPrice(){
        this.total = 0;
        for (const _bookModel of this.getItems()) {
            const info = _bookModel.item.saleInfo;
            if(info.saleability === "FOR_SALE" && info.listPrice.amount !== undefined){
                this.total += (info.listPrice.amount * _bookModel.amount);
            }
        }
    }

    calculateOrderTotalAmount() {
        this.totalAmount = 0;
        for (const item of this.getItems()) {
            this.totalAmount += item.amount;
        }
    }

    updateItemAmount(id, amount){
        // find item
        const index = this.items.findIndex(el => el.id === id);
        // ++amount
        if(index >= 0 && amount >= 0){
            this.items[index].amount = amount;
        }
        // recalc order total
        this.updateOrderTotals();
    }

    updateOrderTotals(){
        this.calculateOrderTotalAmount();
        this.calculateOrderTotalPrice();
    }

}