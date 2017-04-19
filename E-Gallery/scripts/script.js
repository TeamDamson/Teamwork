function solve() {
    const baseUrl = "https://baas.kinvey.com/";
    const appKey = "kid_r1MLNB66l";
    const appSecret = "3666160cc45b4b23b3d7f50e46903ae4";
    const authHeaders = {
        "Authorization": "Basic " + btoa(appKey + ":" + appSecret)
    };

    //TO DO VALIDATION REGISTER

    sessionStorage.clear();

    $('#linkHome').on('click', showHomeView);
    $('#linkLogOut').on('click', logOutUser);

    $('#btnRegister').on('click', registerUser);
    $('#btnLogin').on('click', logInUser);

    $(document).on({
        ajaxStart: function () {
            $('#load').show();
        },
        ajaxStop: function () {
            $('#load').hide();
        }
    });

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

    function showSuccessMessage(message) {
        $('#info').text(message).show().hide("fade", 4000);
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

    function viewGallery() {
        $('.gallery').empty();
        $('#main-view').css('display', 'none');
        $('<div>').addClass('gallery').appendTo($('main'));
        $.get({
            url: baseUrl + 'appdata/' + appKey + '/paintings',
            headers: getKinveyUserAuthHeaders(),
            contentType: 'application/json'
        }).then(displayGallery).catch(displayError);
    }

    function displayGallery(paintings) {
        let gallery = $('.gallery');
        let list = $('<ul>').addClass('galleryItems');
        for (let picture of paintings) {
            list.append($('<li class="itemGallery">').append($('<img class="imgGallery">').attr('src', picture.image._downloadURL)).append($('<div class="artist">').text(picture.artist)).append($('<div class="title">').text(picture.title)));
        }
        gallery.append(list);
    }

    function getKinveyUserAuthHeaders() {
        return {
            "Authorization": "Kinvey " + sessionStorage.getItem("authtoken")
        };
    }

    function displayError(error) {
        $('#error').show()
            .text('Error: ' + error.responseJSON.description).hide("fade", 4000);
    }

    function showHomeView() {

    }
}