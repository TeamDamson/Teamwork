"use strict";

import 'jquery';
import { kinveyUrls } from 'constants';
import { Validator } from 'validators';
import { KinveyPostManager } from 'kinveyPostManager';
import { JSONFormatter } from 'JSONFormatter';
import toastr from 'toastr';
import CryptoJS from 'crypto-js';


class AuthenticationManager {
    constructor(formatter, postManager, storage) {
        Validator.ValidateObject(formatter, ["format", "formatType"]);
        Validator.ValidateObject(postManager, ["logInUser", "registerUser"]);
        Validator.ValidateObject(storage, ["setItem"]);

        this._formatter = formatter;
        this._postManager = postManager;
        this._storage = storage;
    }

    logInUser(selector, user) {
        let userData = this._formatter.format(user);
        this._postManager.loginUser(userData, this._formatter.formatType, kinveyUrls.authHeaders).then(this._onLoginSuccess).catch(function (error) {
            toastr.error('Incorrect user name or password. Please try again!');
            location.hash = '#/login';
        });
    }

    registerNewUser(selector, user) {
        let userData = this._formatter.format(user);
        this._postManager.registerUser(userData, this._formatter.formatType).then(this._onRegisterSuccess).catch(function (error) {
            toastr.error('Register unsuccessful. Try again!');
            location.hash = '#/register';
        });
    }

    logOutUser() {
        this._storage.clear();
        toastr.success('Logout successful!');
        $('#loggedInUser').addClass('hidden');
        $('#register-form').removeClass('hidden');
        $('#linkLogout').addClass('hidden');
        $('#span').css('display', 'inline-block');
    }

    _onLoginSuccess(userInfo) {
        this._saveAuthInSession(userInfo);
        $('#linkGallery').removeClass('hidden');
        $('#register-form').addClass('hidden');
        $('#menu').removeClass('col-md-6');   //col-md-6 -> col-md-12
        $('#linkLogout').removeClass('hidden');
        $('#loggedInUser').removeClass('hidden');
        toastr.success('Login successful!');
        location.hash = '#/paintings';
    }

    _onRegisterSuccess(userInfo, selector) {
        $(selector).empty();
        this._saveAuthInSession(userInfo);
        location.hash = '#/login';
    }

    _saveAuthInSession(userInfo) {
        this._storage.setItem("username", userInfo.username);
        this._storage.setItem("authtoken", userInfo._kmd.authtoken);
        $('#loggedInUser').text('Welcome ' + userInfo.username + '!');
    }
}

export { AuthenticationManager };