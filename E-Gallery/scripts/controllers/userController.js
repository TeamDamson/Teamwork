// import 'jquery';
import toastr from 'toastr';
import { logInUser, registerUser, logOutUser } from 'authentication';
import { viewGallery } from 'view';
import { templates } from "templates";
import { Validator } from "validators";
import { DOMManipulation } from 'domManipulation'
//import { AuthenticationManager } from 'authenticationManager';

const USERNAME_MIN_LENGTH = 3;
const PASSWORD_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 40;
const PASSWORD_MAX_LENGTH = 20;

let userController = (function() {
    class UserController {
        constructor(templates) {
            this.shoppingCartManager = null;
            this.templates = templates;
            $(document).on('login', (e) => this.onLogin(e));

            $(document).on('logout', () => {
                DOMManipulation.showLogedOut();
                // console.log('logOut');
                location.hash = '#/home';
            })
        }

        onLogin(e) {
            DOMManipulation.showLogedIn();
            $('#loggedInUser').text('Welcome ' + e.username + '!');
            this.shoppingCartManager = new ShoppingCartManager(e.username, window.sessionStorage)
            $('#loggedInUser').append(() => this.shoppingCartManager.shoppingCartElement);
            $('#loggedInUser').append($('<span>', { class: "fluid-notification" }).text(0));
            location.hash = '#/paintings';
        }
        getHomePage(selector) {
            $(selector).empty();
            DOMManipulation.showLogedOut();
            this.templates.getTemplate('load-home-page').then(function(responseTemplate) {
                selector.html(responseTemplate());
            });
        }

        getRegisterForm(selector) {
            $(selector).empty();
            this.templates.getTemplate('show-register-form').then(function(responseTemplate) {
                selector.html(responseTemplate());

                $('#btn-register').on('click', function() {

                    let username = $('.form-signin input[name=user]').val();
                    let password = $('.form-signin input[name=pass]').val();
                    let confirmPassword = $('.form-signin input[name=confirmPass]').val();

                    // debugger;
                    try {
                        Validator.validateUserName(username);
                        Validator.validatePassword(password);
                        if (password !== confirmPassword) {
                            throw new Error('Please confirm password correct');
                        };
                        registerUser(selector, { username: username, password: password });
                    } catch (e) {
                        DOMManipulation.clearAllUsersField();
                        toastr.error(e.message);
                    }
                });
            });
        }

        getLogInUser(selector) {
            logInUser(selector);
        }

        getLogOutUser(selector) {
            logOutUser(selector);
        }
    }

    return new UserController(templates);
})();

export { userController };