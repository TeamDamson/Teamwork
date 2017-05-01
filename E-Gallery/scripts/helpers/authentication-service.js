import { kinveyUrls } from 'constants';

class AuthenticationService {
    constructor(appKey, appSecret, masterKey) {
        this._appKey = appKey;
        this._appSecret = appSecret;
        this._masterKey = masterKey;
    }

    getKinveyUserAuthHeaders() {
        return {
            "Authorization": "Kinvey " + sessionStorage.getItem("authtoken"),
            'Content-Type': 'application/json'
        };
    }

    getKinveyPaintingsAuthHeaders(){
        return {
            "Authorization": "Basic " + btoa(this._appKey + ":" + this._masterKey),
            "Content-Type": "application/json"
        };
    }
}

let authenticationService = new AuthenticationService(kinveyUrls.appKey, kinveyUrls.appSecret, kinveyUrls.masterKey);

export { authenticationService };

