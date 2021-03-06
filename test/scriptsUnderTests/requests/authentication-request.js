import { kinveyUrls } from 'constants';
import toastr from 'toastr';
import { DOMManipulation } from 'domManipulation';
import { requester } from 'requester';
import { userController } from 'userController';

function logInUser(selector) {

    let userData = {
        username: $('.login-register input[name=user]').val(),
        password: $('.login-register input[name=pass]').val()
    };

    DOMManipulation.clearUserPassField('.login-register ');
    // this post method must be changed
    $.post({
            url: kinveyUrls.baseUrl + 'user/' + kinveyUrls.appKey + '/login',
            data: JSON.stringify(userData),
            headers: kinveyUrls.authHeaders,
            contentType: 'application/json'
        })
        .then((userInfo) => {
            saveAuthInSession(userInfo);
            toastr.success('Login successful!');
            $.event.trigger({
                type: "login",
                username: userInfo.username
            });
            // console.log('loged');
        })
        .catch((e) => {
            if (e.statusText === 'Unauthorized') {
                location.hash = '#/register';
                userController.getRegisterForm(selector);
                $('.form-signin input[name=user]').val(userData.username);
                $('.form-signin input[name=pass]').val(userData.password);
                return false;
            }
            //if error is not due to unauthorized - user see this err
            let errMessage = 'Error:' + error.statusText;
            toastr.error(errMessage);
            location.hash = '#/'
        });
}

function registerUser(selector, userData) {
    $.post({
            url: kinveyUrls.baseUrl + 'user/' + kinveyUrls.appKey,
            data: JSON.stringify(userData),
            headers: kinveyUrls.authHeaders,
            contentType: 'application/json'
        })
        .then((userInfo) => {
            saveAuthInSession(userInfo);
            DOMManipulation.creatingDivToAddGallery(selector);
            DOMManipulation.showLogedIn();
            toastr.success('User registration successful!');
            location.hash = '#/paintings';
            $.event.trigger({
                type: "login",
                username: userInfo.username
            });
        })
        .catch(function(e) {
            if (e.statusText === 'Conflict') {
                toastr.error('User exist, try with other name!');
            } else {
                let errMessage = e.statusText + '! Register unsuccessful. Try again! ';
                toastr.error(errMessage);
            }

            location.hash = '#/register';
        });

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