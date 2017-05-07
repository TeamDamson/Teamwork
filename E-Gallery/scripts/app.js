// import 'jquery';
import Sammy from 'sammy';
import { userController } from 'userController';
import { galleryController } from 'galleryController';
import { galleryModel } from 'view';
import toastr from 'toastr';

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

        this.get('#/style/:style', function () {
            const style = this.params["style"];
            galleryController.getPaintingsByStyle(selector, style);
        });

         this.get('#/subject/:subject', function () {
            const subject = this.params["subject"];
            galleryController.getPaintingsBySubject(selector, subject);
        });

         this.get('#/technique/:technique', function () {
            const technique = this.params["technique"];
            galleryController.getPaintingsByTechnique(selector, technique);
        });

        this.get('#/contact', function () {
            userController.getContactForm(selector);
        });

         $('#search-btn').on('click', function () {
            let data = $('#search-input').val();
            let option = $('#select').val();

            $('#search-input').val('');
            
            if(option === 'title'){
                galleryController.searchByTitle(selector, data);
            }
            else if(option === 'artist'){
                galleryController.searchByArtist(selector, data);
            }
            
        });

        this.get('#/send', function () {
            let data = {
                'name': $('#name').val(),
                'e-mail': $('#email').val(),
                'subject': $('#subject').val(),
                'message': $('#message').val()
            };

            $('#name').val('');
            $('#email').val('');
            $('#subject').val('');
            $('#message').val('');
            
            galleryModel.addMessage(data).then(function (success) {
                toastr.success('Your message was send successfuly!');
            }).catch(function (error) {
                toastr.error('Send your message again.');
            });
        });
        
    });

    app.router.run('#/');
})();