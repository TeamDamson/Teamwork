import { kinveyUrls } from 'constants';

class AuthenticationService {
    constructor(appKey, appSecret) {
        this._appKey = appKey;
        this._appSecret = appSecret;
    }

    getKinveyUserAuthHeaders() {
        return {
            "Authorization": "Kinvey " + sessionStorage.getItem("authtoken"),
            'Content-Type': 'application/json'
        };
    }
}

let authenticationService = new AuthenticationService(kinveyUrls.appKey, kinveyUrls.appSecret);

export { authenticationService };

