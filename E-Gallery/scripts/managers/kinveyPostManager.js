import 'jquery';

class KinveyPostManager {
    constructor(baseUrl, appKey, headerProvider) {
        this.baseUrl = baseUrl;
        this.appKey = appKey;
        this._headerProvider;
    }

    loginUser(userData, formatType) {
        let authHeaders = this._headerProvider.getHeaders();
        return $.post({
            url: this.baseUrl + 'user/' + this.appKey + '/login',
            data: userData,
            headers: authHeaders,
            contentType: formatType
        })
    }

    registerUser(userData, formatType) {
        let authHeaders = this._headerProvider.getHeaders();
        return $.post({
            url: kinveyUrls.baseUrl + 'user/' + kinveyUrls.appKey,
            data: userData,
            headers: authHeaders,
            contentType: formatType
        })
    }
}
export { KinveyPostManager }