class ShoppingCartManager {
    constructor(username, storage) {
        this.shoppingCartElement = $('<img />', {
            id: 'shoppingCart',
            src: '../../images/shopping-cart-16.png',
            alt: 'Shopping cart'
        });
        this.shoppingItemsCountElement = $('<span>', { id: "fluid-notification" });
        this.items = [];
        this._username = username;
        this._storage = storage;
    }

    storeCart() {
        this._storage.setItem(this._user.name, this._shoppingCart.toString())
    }
}