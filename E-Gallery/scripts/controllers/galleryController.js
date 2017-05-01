// import 'jquery';
import toastr from 'toastr';
import { galleryModel } from 'view';
import { templates } from "templates";
import { userController } from 'userController';
import { ShoppingCartController } from 'shoppingCartController';

let galleryController = (function() {
    class GalleryController {
        constructor(templates, galleryModel) {
            this.templates = templates;
            this.galleryModel = galleryModel;
        }

        getGallery(selector) {
            $(selector).empty();
            let result;
            this.galleryModel.getAllPaintings().then(function(data) {
                result = {
                    paintings: data
                };
                return templates.getTemplate('load-gallery');
            }).then(function(template) {
                selector.html(template(result));
            }).catch(function(error) {
                toastr.error('Unable to display gallery!');
                location.hash = '#/home';
            });
        }

        getPaintingById(selector, id) {
            $(selector).empty();
            let result;
            this.galleryModel.getPaintingsInfo(id)
                .then(function(data) {
                    result = data;
                    return templates.getTemplate('paintings-info');
                }).then(function(template) {
                    selector.html(template(result));
                })
                .then(() =>
                    $('.buy').on('click', () => this.addToCart(result))
                )
                .catch(function(error) {
                    toastr.error('Unable to display painting!');
                    location.hash = '#/paintings';
                });

        }

        getPaintingByArtist(selector, artist) {
            $(selector).empty();
            let result;
            this.galleryModel.getArtistsInfo(artist).then(function(data) {
                result = {
                    paintings: data
                };
                return templates.getTemplate('artist-info');
            }).then(function(template) {
                selector.html(template(result));
            }).catch(function(error) {
                toastr.error('Unable to display painting!');
                location.hash = '#/paintings';
            });
        }

        addToCart(paintingData) {
            let newItmensCount = userController.shoppingCartManager.shoppingItemsCountElement.text(),
                cartElement = userController.shoppingCartManager.shoppingCartElement,
                cartCountElement = userController.shoppingCartManager.shoppingItemsCountElement,
                shoppingCartController = new ShoppingCartController(templates, userController.shoppingCartManager);
            newItmensCount++;
            cartCountElement.text(newItmensCount);
            userController.shoppingCartManager.items.push({
                id: paintingData._id,
                image: paintingData.image,
                price: paintingData.price
            });
            cartElement.on('click', () => {
                let cartContainer = $('div', {
                    id: 'cart-container'
                });
                $(cartContainer).appendTo($('nav'));
                shoppingCartController.viewCart('#cart-container')
            });
        }
    }

    return new GalleryController(templates, galleryModel);
})();

export { galleryController };