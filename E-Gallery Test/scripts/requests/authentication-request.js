import { kinveyUrls } from 'constants';
import toastr from 'toastr';
import 'jquery';
import CryptoJS from 'crypto-js';

function logInUser(selector) {
    //let username = $('.login-register input[name=user]').val();
    // let password = $('.login-register input[name=pass]').val();
    //let passHash = CryptoJS.SHA256(password).toString();

    let userData = {
        username: $('.login-register input[name=user]').val(),
        password: $('.login-register input[name=pass]').val()
    };
    $.post({
        url: kinveyUrls.baseUrl + 'user/' + kinveyUrls.appKey + '/login',
        data: JSON.stringify(userData),
        headers: kinveyUrls.authHeaders,
        contentType: 'application/json'
    }).then((userInfo) => loginWithSuccess(userInfo, selector)).catch(function(error) {
        toastr.error('Incorrect user name or password. Please try again!');
        location.hash = '#/';
    });

    function loginWithSuccess(userInfo, selector) {
        saveAuthInSession(userInfo);
        toastr.success('Login successful!');
        let loginEvent = $.Event('login');
        $(selector).trigger(loginEvent);
    }

    $('input[name=user]').val('');
    $('input[name=pass]').val('');
}

function registerUser(selector) {
    let userData = {
        username: $('.form-signin input[name=user]').val(),
        password: $('.form-signin input[name=pass]').val()
    };

    $.post({
        url: kinveyUrls.baseUrl + 'user/' + kinveyUrls.appKey,
        data: JSON.stringify(userData),
        headers: kinveyUrls.authHeaders,
        contentType: 'application/json'
    }).then(registerWithSuccess).catch(function(error) {
        toastr.error('Register unsuccessful. Try again!');
        location.hash = '#/register';
    });

    function registerWithSuccess(userInfo) {
        $(selector).empty();
        saveAuthInSession(userInfo);
        $(selector).append($('<div>').addClass('gallery'));

        $('#linkGallery').removeClass('hidden');
        $('#register-form').addClass('hidden');
        $('#menu').removeClass('col-md-6'); //col-md-6 -> col-md-12
        $('#linkLogout').removeClass('hidden');
        $('#loggedInUser').removeClass('hidden');

        toastr.success('User registration successful!');
        location.hash = '#/paintings';
    }

    $('.form-signin input[name=user]').val('');
    $('.form-signin input[name=pass]').val('');
}

function saveAuthInSession(userInfo) {
    sessionStorage.setItem("username", userInfo.username);
    sessionStorage.setItem("authtoken", userInfo._kmd.authtoken);
    $('#loggedInUser').text('Welcome ' + userInfo.username + '!');
}

function logOutUser(selector) {
    sessionStorage.clear();
    toastr.success('Logout successful!');
    location.hash = '#/home';
    let logoutEvent = $.Event('logout');
    $(selector).trigger(logoutEvent);
}

export { logInUser, registerUser, logOutUser };