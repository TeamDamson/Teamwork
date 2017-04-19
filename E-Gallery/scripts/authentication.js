const baseUrl = "https://baas.kinvey.com/";
const appKey = "kid_r1MLNB66l";
const appSecret = "3666160cc45b4b23b3d7f50e46903ae4";
const authHeaders = {
    "Authorization": "Basic " + btoa(appKey + ":" + appSecret)
};

 //TO DO VALIDATION REGISTER

function logInUser() {   //(event)
    // event.preventDefault(); //without event.preventDefault() refresh page by submit
    let userData = {
        username: $('input[name=user]').val(),
        password: $('input[name=pass]').val()
    };

    $.post({
        url: baseUrl + 'user/' + appKey + '/login',
        data: JSON.stringify(userData),
        headers: authHeaders,
        contentType: 'application/json'
    }).then(loginWithSuccess).catch(displayError);

    function loginWithSuccess(userInfo) {
        saveAuthInSession(userInfo);
        viewGallery();
        showSuccessMessage('Login successful.');
        $('#linkGallery').css('display', 'inline-block');
        $('#login').css('display', 'none');
        $('#logout').css('display', 'inline-block');
    }

    $('input[name=user]').val('');
    $('input[name=pass]').val('');
}

function registerUser() {   //(event)
    // event.preventDefault(); // without event.preventDefault() refresh page by submit
    let userData = {
        username: $('input[name=user]').val(),
        password: $('input[name=pass]').val()
    };

    $.post({
        url: baseUrl + 'user/' + appKey,
        data: JSON.stringify(userData),
        headers: authHeaders,
        contentType: 'application/json'
    }).then(registerWithSuccess).catch(displayError);

    function registerWithSuccess(userInfo) {
        saveAuthInSession(userInfo);
        viewGallery();
        showSuccessMessage('User registration successful.');
        $('#linkGallery').css('display', 'inline-block');
        $('#login').css('display', 'none');
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
    $('#login').css('display', 'inline-block');
    $('#logout').css('display', 'none');
    $('#main-view').css('display', 'block');
    $('.gallery').css('display', 'none');
}