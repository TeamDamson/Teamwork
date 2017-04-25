//TO DO VALIDATION REGISTER
'use strict'
import { kinveyUrls } from 'constants';
import { showSuccessMessage, displayError } from 'utility';
import { viewGallery } from 'request';
import 'jquery';
import { KinveyPostManager, AuthenticationManager, JSONFormatter } from 'authenticationManager';
import { User } from 'user';

function logInUser(event) {
    var kinveyManager = new KinveyPostManager(kinveyUrls.baseUrl, kinveyUrls.appKey, kinveyUrls.appSecret, kinveyUrls.authHeaders),
        formatter = new JSONFormatter(),
        user = new User($('input[name=user]').val(), $('input[name=pass]').val());
    var autotenticationManager = new AuthenticationManager(user, formatter, kinveyManager);
    autotenticationManager.logInUser(event);

    $('input[name=user]').val('');
    $('input[name=pass]').val('');
}

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

function saveAuthInSession(userInfo) {
    sessionStorage.setItem("username", userInfo.username);
    sessionStorage.setItem("authtoken", userInfo._kmd.authtoken);
    $('#loggedInUser').text('Welcome ' + userInfo.username + '!');
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

export { logInUser, registerUser, logOutUser };