'use strict'

import { kinveyUrls } from 'constants';
import { showSuccessMessage, displayError } from 'utility';
import { viewGallery } from 'request';
import { Validator } from 'validators';
import { KinveyPostManager } from 'kinveyPostManager';
import { JSONFormatter } from 'JSONFormatter';
import 'jquery';

class AuthenticationManager {
    constructor(formatter, postManager, storage) {
        Validator.ValidateObject(formatter, ["format", "formatType"]);
        Validator.ValidateObject(postManager, ["logInUser", "registerUser"]);
        Validator.ValidateObject(storage, ["setItem"]);

        this._formatter = formatter;
        this._postManager = postManager;
        this._storage = storage;
    }

    logInUser(event, user) {
        event.preventDefault(); //without event.preventDefault() refresh page by submit
        let userData = this._formatter.format(user);
        this._postManager.loginUser(userData, this._formatter.formatType).then(this._onLoginSuccess).catch(_onFail);
    }

    registerUser(event, user) {
        event.preventDefault(); //without event.preventDefault() refresh page by submit
        let userData = this._formatter.format(user);
        this._postManager.registerUser(userData, this._formatter.formatType).then(this._onRegisterSuccess).catch(_onFail);
    }

    logOutUser() {
        this._storage.clear();
        let logOutEvent = $.Event('logout');
        $(window).trigger(logOutEvent);
    }

    _onLoginSuccess(userInfo) {
        this._saveAuthInSession(userInfo);
        let loginEvent = $.Event('login');
        $(window).trigger(loginEvent);
    }

    _onRegisterSuccess(userInfo) {
        this._saveAuthInSession(userInfo);
        let registerEvent = $.Event('register');
        $(window).trigger(registerEvent);
    }

    _onFail(userInfo) {
        let failLoginEvent = $.Event('loginFailed');
        $(window).trigger(failLoginEvent);
    }


    _saveAuthInSession(userInfo) {
        this._storage.setItem("username", userInfo.username);
        this._storage.setItem("authtoken", userInfo._kmd.authtoken);
        $('#loggedInUser').text('Welcome ' + userInfo.username + '!');
    }
}


// viewGallery();
// showSuccessMessage('Login successful.');
// $('#linkGallery').css('display', 'inline-block');
// $('.login-register').css('display', 'none');
// $('#logout').css('display', 'inline-block');
// $('input[name=user]').val('');
// $('input[name=pass]').val('');

// function registerUser(event) {
//     event.preventDefault(); // without event.preventDefault() refresh page by submit
//     let userData = {
//         username: $('input[name=user]').val(),
//         password: $('input[name=pass]').val()
//     };

//     $.post({
//         url: kinveyUrls.baseUrl + 'user/' + kinveyUrls.appKey,
//         data: JSON.stringify(userData),
//         headers: kinveyUrls.authHeaders,
//         contentType: 'application/json'
//     }).then(registerWithSuccess).catch(displayError);

//     function registerWithSuccess(userInfo) {
//         saveAuthInSession(userInfo);
//         viewGallery();
//         showSuccessMessage('User registration successful.');
//         $('#linkGallery').css('display', 'inline-block');
//         $('.login-register').css('display', 'none');
//         $('#logout').css('display', 'inline-block');
//     }

//     $('input[name=user]').val('');
//     $('input[name=pass]').val('');
// }



// function logOutUser() {
//     sessionStorage.clear();
//     showSuccessMessage('Logout successful!');
//     $('#loggedInUser').text('');
//     $('#linkGallery').css('display', 'none');
//     $('.login-register').css('display', 'inline-block');
//     $('#logout').css('display', 'none');
//     $('#main-view').css('display', 'block');
//     $('.gallery').css('display', 'none');
// }

export { AuthenticationManager };