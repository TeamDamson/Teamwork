//function startApp() {
import { logInUser, registerUser, logOutUser } from 'auth';
import { viewGallery } from 'request';
import 'jquery';

sessionStorage.clear();



function showHomeView() {
    $('#main-view').css('display', 'block');
    $('.gallery').css('display', 'none');
}
//}