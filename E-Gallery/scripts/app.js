// import 'jquery';
import Sammy from 'sammy';
import { userController } from 'userController';
import { galleryController } from 'galleryController';

//sessionStorage.clear();

let app = app || {};

(function () {
    app.router = Sammy(function () {
        let selector = $('main');

        this.get('#/', function () {
            this.redirect('#/home');
        });

        this.get('#/home', function () {
            userController.getHomePage(selector);
        });

        this.get('#/register', function () {
            userController.getRegisterForm(selector);
        });

        this.get('#/login', function () {
            userController.getLogInUser(selector);
        });

        this.get('#/logout', function () {
            userController.getLogOutUser();
        });

        this.get('#/paintings', function () {
            galleryController.getGallery(selector);
        });

        this.get('#/paintings/:id', function () {
            const id = this.params["id"];
            galleryController.getPaintingById(selector, id);
        });

        this.get('#/artist-info/:artist', function () {
            const artist = this.params["artist"];
            galleryController.getPaintingByArtist(selector, artist);
        });
    });

    app.router.run('#/');
})();