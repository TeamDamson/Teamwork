// import 'jquery';
import toastr from 'toastr';
import { logInUser, registerUser, logOutUser } from 'authentication';
import { viewGallery } from 'view';
import { templates } from "templates";
import { Validator } from "validators";
import { DOMManipulation } from 'domManipulation';
import { Tamplates } from 'tamplatesMy';
import { ShoppingCartController } from 'shoppingCartController';
import bootstrap from 'bootstrap';

let userController = (function () {
    class UserController {
        constructor(templates) {
            this.shoppingCartController = null;
            this.shoppingCartManager = new ShoppingCartManager("", window.storage);
            this.templates = templates;

            $(document).on('login', (e) => this.onLogin(e));

            $(document).on('logout', () => {
                DOMManipulation.showLogedOut();
                location.hash = '#/home';
                $('#linkHome').html('<a href="#/home">Home</a>');
            })
            // $(document).on('register', (e) => {
            //     // console.log('errorLoging');
            //     // to check kind of error
            //     location.hash = '#/home';
            // })
        }

        URL_AVATAR_IMG = "//ssl.gstatic.com/accounts/ui/avatar_2x.png";

        getHomePage(selector) {
            $(selector).empty();
            DOMManipulation.showLogedOut();

            let startText = {
                wellcome: 'Welcome',
                name: 'to E-Gallery',
                product: 'See Our New Paintings'
            };
            selector.html(Tamplates.homePage(startText));
        }

        getContactForm(selector) {
            $(selector).empty();
            $('aside').addClass('hidden');
            this.templates.getTemplate('contact-form').then(function (responseTemplate) {
                selector.html(responseTemplate());
            });
        }

        onLogin(e) {
            DOMManipulation.showLogedIn();
            $('#loggedInUser').text('Welcome ' + e.username + '!');
            this.shoppingCartManager.username = e.username;
            userController.shoppingCartManager.items = [];
            this.shoppingCartController = new ShoppingCartController(templates, userController.shoppingCartManager);
            let cartElement = userController.shoppingCartManager.shoppingCartElement;
            cartElement.on('click', () => {
                this.shoppingCartController.viewCart($('#menu'))
            });
            $('#loggedInUser').append(() => this.shoppingCartManager.shoppingCartElement);
            $('#loggedInUser').append(() => this.shoppingCartManager.shoppingItemsCountElement.text(0));
            $('#linkHome').html('<a href="#/paintings">Home</a>');
            $('aside').removeClass('hidden');
            location.hash = '#/paintings';
        }

        getLoginRegister(selector) {
            let username = $('.login-register input[name=user]').val();
            let password = $('.login-register input[name=pass]').val();
            // debugger;
            if (username && password) {
                logInUser(selector);
                return
            };
            this.getRegisterForm(selector);
            $('.form-signin input[name=user]').val(username);
            $('.form-signin input[name=pass]').val(password);
            return
        }

        getRegisterForm(selector) {
            global = this._functionOnClick;
            let formData = {
                imgAvatar: this.URL_AVATAR_IMG,
                nameField: 'User Name',
                passField: 'Password',
                confirmPassField: 'Confirm Password',
                button: { name: 'Register', event: 'onclick=global' }
            };
            $(selector).empty();
            selector.html(Tamplates.RegisterForm(formData));
            $("#reg-form").slideDown("slow");
        }


        _functionOnClick(selector) {
            // console.log('kelp');
            let username = $('.form-signin input[name=user]').val();
            let password = $('.form-signin input[name=pass]').val();
            let confirmPassword = $('.form-signin input[name=confirmPass]').val();


            try {
                Validator.validateUserName(username);
                Validator.validatePassword(password);
                if (password !== confirmPassword) {
                    throw new Error('Please confirm password correct');
                };
                console.log('help');
                // debugger;
                registerUser(selector, { username: username, password: password });
            } catch (e) {
                DOMManipulation.clearAllUsersField();
                $('.form-signin input[name=pass]').attr({
                    // "title": "Popover Header",
                    "data-content": "This filed is requerd",
                    "data-toggle": "popover",
                    "data-trigger": "focus",
                    // "data-delay":{show: 200, hide: 1000}
                });
                $('[data-toggle="popover"]').popover();
                // toastr.error(e.message);
            }

        }

        getLogInUser(selector) {
             $('aside').removeClass('hidden');
            logInUser(selector);
        }

        getLogOutUser(selector) {
             $('aside').addClass('hidden');
            logOutUser(selector);
        }
    }

    return new UserController(templates);
})();

export { userController };