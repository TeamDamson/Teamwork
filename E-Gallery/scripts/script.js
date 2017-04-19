function startApp() {
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

    function showHomeView() {

    }
}