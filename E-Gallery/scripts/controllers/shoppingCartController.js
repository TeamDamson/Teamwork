import toastr from 'toastr';
import { galleryModel } from 'view';
import { templates } from "templates";
import { userController } from 'userController';

class ShoppingCartController {
    constructor(templates, shoppingCartManager) {
        this.templates = templates;
        this.shoppingCartManager = shoppingCartManager;
    }

    viewCart(selector) {
        let cartContainer = $('#shopping-cart');
        cartContainer.appendTo(selector);
        let result = {
            paintings: this.shoppingCartManager.items
        }
        this.templates.getTemplate('shopping-cart')
            .then(template => $(cartContainer).html(template(result)))
            .then(() => $('#total-price').html(this.shoppingCartManager.totalPrice))
            .then(() => $('.close').on('click', () => $(".cart-content").css('display', 'none')))
            .then(() => $('.remove-item').on('click', (e) => {
                this.removeItem(e.target.id);
            }))
            .then(() => $('.order-button').on('click', () => this.viewOrder(result, cartContainer)));
    }

    viewOrder(result, cartContainer) {
        this.templates.getTemplate('order-form')
            .then(template => $(cartContainer).html(template(result)));
    }

    removeItem(id) {
        let newItmensCount = userController.shoppingCartManager.shoppingItemsCountElement.text();
        newItmensCount--;
        userController.shoppingCartManager.shoppingItemsCountElement.text(newItmensCount);
        let filteredItems = userController.shoppingCartManager.items.filter((item) => item.id !== id);
        userController.shoppingCartManager.items = filteredItems;
        let parent = $('#' + id).parent();
        $('#' + id).remove();
        $(parent).remove();
        $('#total-price').html(this.shoppingCartManager.totalPrice);

    }
}


export { ShoppingCartController };