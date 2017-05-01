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
        $(selector).empty();
        let result = {
            paintings: this.shoppingCartManager.items
        }
        this.templates.getTemplate('shopping-cart')
            .then(template => $(selector).html(template(result)));
    }

    removeItem(paintingData) {
        let newItmensCount = userController.shoppingCartManager.shoppingItemsCountElement.text();
        newItmensCount--;
        userController.shoppingCartManager.shoppingItemsCountElement.text(newItmensCount);
        userController.shoppingCartManager.items.filter((item) => item.id === paintingData.id)
    }
}


export { ShoppingCartController };