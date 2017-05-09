// import 'jquery';
import toastr from 'toastr';
import { logInUser, registerUser, logOutUser } from 'authentication';
import { viewGallery } from 'view';
import { templates } from "templates";
import { Validator } from "validators";
import { DOMManipulation } from 'domManipulation';
import { Tamplates } from 'tamplatesMy';
import { ShoppingCartController } from 'shoppingCartController';
import { ShoppingCartManager } from 'shoppingCartManager';
import bootstrap from 'bootstrap';

let userController = (function() {
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
                    $("#shopping-cart").hide();
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
            this.templates.getTemplate('contact-form').then(function(responseTemplate) {
                selector.html(responseTemplate());
            });
        }

        onLogin(e) {
            DOMManipulation.showLogedIn();
            $('#loggedInUser').text('Welcome ' + e.username + '!');
            this.shoppingCartManager.username = e.username;
            this.shoppingCartManager.items = [];
            this.shoppingCartController = new ShoppingCartController(templates, userController.shoppingCartManager);
            let cartElement = this.shoppingCartManager.shoppingCartElement;
            cartElement.show();
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
            $("#reg-form").slideDown("normal");
            this._validateImputField('[data-toggle="popoverName"]', 'name');
            this._validateImputField('[data-toggle="popoverPass"]', 'pass');
        }

        _validateImputField(selector, field) {
            let element = $(selector);
            element.focusout(() => {
                let value = element.val();
                try {
                    Validator.validateField(value, field);
                } catch (e) {
                    element.attr('data-content', e.message);
                    element.popover();
                    element.focus();
                }
            });
        }

        _functionOnClick(selector) {
            let username = $('.form-signin input[name=user]').val();
            let password = $('.form-signin input[name=pass]').val();
            let confirmPassword = $('.form-signin input[name=confirmPass]').val();
            try {
                Validator.validateUserName(username);
                Validator.validatePassword(password);
                if (password !== confirmPassword) {
                    throw new Error('Please confirm password correctly!');
                };
                registerUser(selector, { username: username, password: password });
            } catch (e) {
                toastr.error(e.message);
                $('.form-signin input[name=confirmPass]').focus();
            }
        }

        getLogInUser(selector) {
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