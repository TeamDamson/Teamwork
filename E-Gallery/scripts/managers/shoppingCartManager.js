class ShoppingCartManager {
    constructor(shoppingCart, username, storage) {
        this.shoppingCartElement = $('<img />', {
            id: 'shoppingCart',
            src: '../../images/shopping-cart-16.png',
            alt: 'Shopping cart'
        });
        this._shoppingCart = shoppingCart;
        this._username = username;
        this._storage = storage;
    }

    storeCart() {
        this._storage.setItem(this._user.name, this._shoppingCart.toString())
    }
}