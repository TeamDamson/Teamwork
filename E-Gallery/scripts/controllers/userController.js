// import 'jquery';
import toastr from 'toastr';
import { logInUser, registerUser, logOutUser } from 'authentication';
import { viewGallery } from 'view';
import { templates } from "templates";
import { Validator } from "validators";
import { DOMManipulation } from 'domManipulation';
import { Tamplates } from 'tamplatesMy';

function opittt() { console.log('seem') };

let userController = (function() {
    class UserController {
        constructor(templates) {
            this.shoppingCartManager = null;
            this.templates = templates;

            $(document).on('login', (e) => this.onLogin(e));

            $(document).on('logout', () => {
                DOMManipulation.showLogedOut();
                location.hash = '#/home';
            })
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

        onLogin(e) {
            DOMManipulation.showLogedIn();
            $('#loggedInUser').text('Welcome ' + e.username + '!');
            this.shoppingCartManager = new ShoppingCartManager(e.username, window.sessionStorage)
            $('#loggedInUser').append(() => this.shoppingCartManager.shoppingCartElement);
            $('#loggedInUser').append($('<span>', { id: "fluid-notification" }).text(0));
            location.hash = '#/paintings';
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
        }


        _functionOnClick() {
            let username = $('.form-signin input[name=user]').val();
            let password = $('.form-signin input[name=pass]').val();
            let confirmPassword = $('.form-signin input[name=confirmPass]').val();


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