import 'jquery';

class KinveyPostManager {
    constructor(baseUrl, appKey, appSecret) {
        this.baseUrl = baseUrl;
        this.appKey = appKey;
        this.appSecret = appSecret;
        this.authHeaders = authHeaders;
    }

    loginUser(userData, formatType, authHeaders) {
        return $.post({
            url: this.baseUrl + 'user/' + this.appKey + '/login',
            data: userData,
            headers: authHeaders,
            contentType: formatType
        })
    }

    registerUser(userData, formatType, authHeaders) {
        return $.post({
            url: kinveyUrls.baseUrl + 'user/' + kinveyUrls.appKey,
            data: userData,
            headers: authHeaders,
            contentType: formatType
        })
    }
}
export { KinveyPostManager }