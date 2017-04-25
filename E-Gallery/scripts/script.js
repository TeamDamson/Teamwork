//function startApp() {
import { kinveyUrls } from 'constants';
import { logInUser, registerUser, logOutUser } from 'auth';
import { GalleryApplication } from 'galleryApplication';
import { UIManager } from 'uimanager';
import { viewGallery } from 'request';
import 'jquery';

sessionStorage.clear();


(function() {
    let getManager = new KinveyGetManager(kinveyUrls.baseUrl, kinveyUrls.appKey, kinveyUrls.appSecret);
    let authenticationManager = new AuthenticationManager(formatter, postManager, storage);
    uiManager = new UIManager($('.gallery'), getManager, authenticationManager);
})();

function showHomeView() {
    $('#main-view').css('display', 'block');
    $('.gallery').css('display', 'none');
}
//}