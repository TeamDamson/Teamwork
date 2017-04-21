
    //function startApp() {
import{logInUser, registerUser, logOutUser} from 'auth';
import{viewGallery} from 'request';
import 'jquery';

    sessionStorage.clear();

    $('#linkLogOut').on('click', logOutUser);

    $('#linkHome').on('click', showHomeView);
    $('#linkGallery').on('click', viewGallery);

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
        $('#main-view').css('display', 'block');
        $('.gallery').css('display', 'none');
    }
    //}

