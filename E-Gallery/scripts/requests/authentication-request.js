import { kinveyUrls } from 'constants';
import toastr from 'toastr';
// import 'jquery';
import CryptoJS from 'crypto-js';
import { DOMManipulation } from 'domManipulation';

function logInUser(selector) {

    let userData = {
        username: $('.login-register input[name=user]').val(),
        password: $('.login-register input[name=pass]').val()
    };
    DOMManipulation.clearUserPassField('.login-register ');

    $.post({
        url: kinveyUrls.baseUrl + 'user/' + kinveyUrls.appKey + '/login',
        data: JSON.stringify(userData),
        headers: kinveyUrls.authHeaders,
        contentType: 'application/json'
    }).then((userInfo) => loginWithSuccess(userInfo, selector)).catch(function (error) {
        toastr.error('Incorrect user name or password. Please try again!');
        location.hash = '#/';
    });

    function loginWithSuccess(userInfo, selector) {
        saveAuthInSession(userInfo);
        toastr.success('Login successful!');
        $.event.trigger({
            type: "login",
            username: userInfo.username
        });
    }
}

function registerUser(selector, userData) {

    // console.log('register from request');
    $.post({
        url: kinveyUrls.baseUrl + 'user/' + kinveyUrls.appKey,
        data: JSON.stringify(userData),
        headers: kinveyUrls.authHeaders,
        contentType: 'application/json'
    }).then(registerWithSuccess).catch(function (error) {
        toastr.error('Register unsuccessful. Try again!');
        location.hash = '#/register';
    });

    function registerWithSuccess(userInfo) {
        saveAuthInSession(userInfo);
  
        DOMManipulation.creatingDivToAddGallery(selector);
        DOMManipulation.showLogedIn();

        toastr.success('User registration successful!');
        location.hash = '#/paintings';
    }

    DOMManipulation.clearUserPassField('.form-signin ');
}

function saveAuthInSession(userInfo) {
    sessionStorage.setItem("username", userInfo.username);
    sessionStorage.setItem("authtoken", userInfo._kmd.authtoken);

}

function logOutUser(selector) {
    sessionStorage.clear();
    toastr.success('Logout successfull!');
    let logoutEvent = $.Event('logout');

    // why selector - must be document??
    // $(selector).trigger(logoutEvent);
    $(document).trigger(logoutEvent);
}


export { logInUser, registerUser, logOutUser };