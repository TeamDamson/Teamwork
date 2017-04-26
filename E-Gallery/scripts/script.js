//function startApp() {
import { kinveyUrls } from 'constants';
import { logInUser, registerUser, logOutUser } from 'auth';
import { GalleryApplication } from 'galleryApplication';
import { GaleryUI } from 'galeryUIManager';
import { viewGallery } from 'request';
import 'jquery';

(function() {
    let headerProvider = new KinveyAuthorizationHeaderProvider(sessionStorage),
        getManager = new KinveyGetManager(kinveyUrls.baseUrl, kinveyUrls.appKey, headerProvider),
        postManager = new KinveyPostManager(kinveyUrls.baseUrl, kinveyUrls.appKey, headerProvider),
        authenticationManager = new AuthenticationManager(formatter, postManager, sessionStorage),
        eventsParam = {
            registerUser: ['#btnRegister', 'click'],
            logInUser: ['#btnLogin', 'click'],
            logOutUser: ['#linkLogOut', 'click']
        },
        authenticationUI = new AuthenticationUI(authenticationManager, eventsParam),
        galeryUI = new GaleryUI($('.gallery'), getManager);
    sessionStorage.clear();
    authenticationUI.init();
    galeryUI.init();
    $(document).on('login', galeryUI.displayGallery);
    $(document).on('logout', galeryUI.logOutUser)
})();

function showHomeView() {
    $('#main-view').css('display', 'block');
    $('.gallery').css('display', 'none');
}
//}