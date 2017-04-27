//function startApp() {
//import { logInUser, registerUser, logOutUser } from 'auth';
//import { GalleryApplication } from 'galleryApplication';
//import { viewGallery } from 'request';

import 'jquery';
import { galeryUI } from 'galeryUI';
import { kinveyUrls } from 'constants';
import { KinveyAuthorizationHeaderProvider } from 'kinveyAuthorizationHeaderProvider';
import { KinveyGetManager } from 'kinveyGetManager';
import { KinveyPostManager } from 'kinveyPostManager';
import { JSONFormatter } from 'JSONFormatter';
import { AuthenticationManager } from 'authenticationManager';
import { AuthenticationUI } from 'authenticationUI';
import { Validator } from 'validators';


(function() {
    let headerProvider = new KinveyAuthorizationHeaderProvider(sessionStorage),
        getManager = new KinveyGetManager(kinveyUrls.baseUrl, kinveyUrls.appKey, headerProvider),
        postManager = new KinveyPostManager(kinveyUrls.baseUrl, kinveyUrls.appKey, headerProvider),
        formatter = new JSONFormatter(),
        authenticationManager = new AuthenticationManager(formatter, postManager, sessionStorage, headerProvider),
        eventsParam = {
            registerUser: ['#btnRegister', 'click'],
            logInUser: ['#btnLogin', 'click'],
            logOutUser: ['#linkLogOut', 'click']
        },
        authenticationUI = new AuthenticationUI(authenticationManager, eventsParam, { successMessageElement: $('#info'), errorMessageElement: $('#error') }),
        galeryUI = new GaleryUI($('.gallery'), getManager);
    sessionStorage.clear();
    authenticationUI.init();
    galeryUI.init();
})();

// function showHomeView() {
//     $('#main-view').css('display', 'block');
//     $('.gallery').css('display', 'none');
// }
//}