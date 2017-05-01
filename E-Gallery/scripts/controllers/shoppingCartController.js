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
            .then(() => $('.close').on('click', () => $(".cart-content").css('display', 'none')));
    }

    removeItem(paintingData) {
        let newItmensCount = userController.shoppingCartManager.shoppingItemsCountElement.text();
        newItmensCount--;
        userController.shoppingCartManager.shoppingItemsCountElement.text(newItmensCount);
        userController.shoppingCartManager.items.filter((item) => item.id === paintingData.id)
    }
}


export { ShoppingCartController };