'use strict'

import { kinveyUrls } from 'constants';
import { showSuccessMessage, displayError } from 'utility';
import { viewGallery } from 'request';
import { Validator } from 'validators'
import 'jquery';

class KinveyPostManager {
    constructor(baseUrl, appKey, appSecret, authHeaders) {
        this.baseUrl = baseUrl;
        this.appKey = appKey;
        this.appSecret = appSecret;
        this.authHeaders = authHeaders;
    }

    post(dataToPost, formatType) {
        return $.post({
            url: this.baseUrl + 'user/' + this.appKey + '/login',
            data: dataToPost,
            headers: this.authHeaders,
            contentType: formatType
        })
    }
}

class JSONFormatter {
    constructor() {
        this.formatType = 'application/json';
    }
    format(objectToFormat) {
        if (!this.isObject(objectToFormat)) {
            throw new Error("Can't format non-object types")
        }

        return JSON.stringify(objectToFormat);
    }

    isObject(objectToCheck) {
        if (objectToCheck === null) {
            return false;
        }

        return ((typeof objectToCheck === 'function') || (typeof objectToCheck === 'object'));
    }
}

class AuthenticationManager {
    constructor(user, formatter, postManager, storage) {
        Validator.ValidateObject(user, ["username", "password"]);
        Validator.ValidateObject(formatter, ["format", "formatType"]);
        Validator.ValidateObject(postManager, ["post"]);
        Validator.ValidateObject(storage, ["setItem"]);

        this._user = user;
        this._formatter = formatter;
        this._postManager = postManager;
        this._storage = storage;
    }

    logInUser(event) {
        event.preventDefault(); //without event.preventDefault() refresh page by submit
        let userData = this._formatter.format(this.user);
        this._postManager.post(userData, this._formatter.formatType).then(this._onLoginSuccess).catch(_onFail);
    }

    _onLoginSuccess(userInfo) {
        this._saveAuthInSession(userInfo);
        let loginEvent = $.Event('login');
        $(window).trigger(loginEvent);
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


viewGallery();
showSuccessMessage('Login successful.');
$('#linkGallery').css('display', 'inline-block');
$('.login-register').css('display', 'none');
$('#logout').css('display', 'inline-block');
$('input[name=user]').val('');
$('input[name=pass]').val('');

function registerUser(event) {
    event.preventDefault(); // without event.preventDefault() refresh page by submit
    let userData = {
        username: $('input[name=user]').val(),
        password: $('input[name=pass]').val()
    };

    $.post({
        url: kinveyUrls.baseUrl + 'user/' + kinveyUrls.appKey,
        data: JSON.stringify(userData),
        headers: kinveyUrls.authHeaders,
        contentType: 'application/json'
    }).then(registerWithSuccess).catch(displayError);

    function registerWithSuccess(userInfo) {
        saveAuthInSession(userInfo);
        viewGallery();
        showSuccessMessage('User registration successful.');
        $('#linkGallery').css('display', 'inline-block');
        $('.login-register').css('display', 'none');
        $('#logout').css('display', 'inline-block');
    }

    $('input[name=user]').val('');
    $('input[name=pass]').val('');
}



function logOutUser() {
    sessionStorage.clear();
    showSuccessMessage('Logout successful!');
    $('#loggedInUser').text('');
    $('#linkGallery').css('display', 'none');
    $('.login-register').css('display', 'inline-block');
    $('#logout').css('display', 'none');
    $('#main-view').css('display', 'block');
    $('.gallery').css('display', 'none');
}

export { KinveyPostManager, AuthenticationManager, JSONFormatter };