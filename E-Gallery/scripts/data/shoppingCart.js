class ShoppingCart {
    cosntructor() {
        this._itemsCollection = null;
    }

    get itemsCollection() {
        return this._itemsCollection;
    }

    addItem(item) {
        this._itemsCollection.push(item);
    }

    removeItem(item) {
        this._itemsCollection = _this._itemsCollection.filter(val => val === item);
    }
}

let shoppingCart = new ShoppingCart([]);