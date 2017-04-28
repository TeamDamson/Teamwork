// import 'jquery';

class KinveyGetManager {
    constructor(baseUrl, appKey, headerProvider) {
        this.baseUrl = baseUrl;
        this.appKey = appKey;
        this._headerProvide = headerProvider;
    }

    getPainitngInfo(paintingId, formatType) {
        let authHeaders = this._headerProvider.getHeaders();
        return $.get({
            url: this.baseUrl + 'appdata/' + this.appKey + '/paintings/' + paintingId,
            headers: authHeaders,
            contentType: formatType
        })
    }

    getGalery(formatType) {
        let authHeaders = this._headerProvider.getHeaders();
        return $.get({
            url: this.baseUrl + 'appdata/' + this.appKey + '/paintings',
            headers: authHeaders,
            contentType: formatType
        })
    }

    getPainitngsByArtist(artistName, formatType) {
        let authHeaders = this._headerProvider.getHeaders();
        return $.get({
            url: this.baseUrl + 'appdata/' + this.appKey + '/paintings/?query={"artist":"' + artistName + '"}',
            headers: authHeaders,
            contentType: formatType
        })
    }
}
export { KinveyGetManager }