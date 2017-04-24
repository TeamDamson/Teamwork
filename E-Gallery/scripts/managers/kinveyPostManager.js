import 'jquery';

class KinveyPostManager {
    constructor(baseUrl, appKey, appSecret, authHeaders) {
        this.baseUrl = baseUrl;
        this.appKey = appKey;
        this.appSecret = appSecret;
        this.authHeaders = authHeaders;
    }

    loginUser(userData, formatType) {
        return $.post({
            url: this.baseUrl + 'user/' + this.appKey + '/login',
            data: userData,
            headers: this.authHeaders,
            contentType: formatType
        })
    }

    registerUser(userData, formatType) {
        return $.post({
            url: kinveyUrls.baseUrl + 'user/' + kinveyUrls.appKey,
            data: userData,
            headers: this.authHeaders,
            contentType: formatType
        })
    }
}
export { KinveyPostManager }