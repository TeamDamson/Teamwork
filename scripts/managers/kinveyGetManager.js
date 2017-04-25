import 'jquery';

class KinveyGetManager {
    constructor(baseUrl, appKey, appSecret) {
        this.baseUrl = baseUrl;
        this.appKey = appKey;
        this.appSecret = appSecret;
    }

    getPainitngInfo(paintingId, formatType, authHeaders) {
        return $.get({
            url: this.baseUrl + 'appdata/' + this.appKey + '/paintings/' + paintingId,
            headers: authHeaders,
            contentType: formatType
        })
    }

    getGalery(formatType, authHeaders) {
        return $.get({
            url: this.baseUrl + 'appdata/' + this.appKey + '/paintings',
            headers: authHeaders,
            contentType: formatType
        })
    }

    getPainitngsByArtist(artistName, formatType, authHeaders) {
        return $.get({
            url: this.baseUrl + 'appdata/' + this.appKey + '/paintings/?query={"artist":"' + artistName + '"}',
            headers: authHeaders,
            contentType: formatType
        })
    }
}
export { KinveyGetManager }