import { kinveyUrls } from 'constants';
import toastr from 'toastr';
import { templates } from "templates";
import { requester } from 'requester';
import { authenticationService } from 'authenticationService';
// import 'jquery';

class GalleryModel {
    constructor(url, appKey, requester, authenticationService) {
        this._url = url;
        this._appKey = appKey;
        this._authenticationService = authenticationService;
        this._requester = requester;
    }

    getPaintingsInfo(paintingId) {
        let requestUrl = this._url + 'appdata/' + this._appKey + '/paintings/' + paintingId;
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();

        return this._requester.get(requestUrl, requestHeaders);
    }

    getArtistsInfo(artistName) {
        var filter = JSON.stringify({
            "artist.name": artistName
        });

        let requestUrl = this._url + 'appdata/' + this._appKey + '/paintings/?query=' + filter;
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();

        return this._requester.get(requestUrl, requestHeaders);
    }

    getAllPaintings() {
        let requestUrl = this._url + 'appdata/' + this._appKey + '/paintings';
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();

        return this._requester.get(requestUrl, requestHeaders);
    }

    rateLikes(painting) {
        let requestUrl = this._url + 'appdata/' + this._appKey + '/rateLikes';
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();

        let data = {
            paintingId: painting._id,
            like: 1
        };

        return this._requester.post(requestUrl, requestHeaders, data);
    }

    getLikes(paintingId) {
        var filter = JSON.stringify({
            "paintingId": paintingId
        });

        let requestUrl = this._url + 'appdata/' + this._appKey + '/rateLikes/?query=' + filter;
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();

        return this._requester.get(requestUrl, requestHeaders);
    }

    rateDislikes(painting) {
        let requestUrl = this._url + 'appdata/' + this._appKey + '/rateDislikes';
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();

        let data = {
            paintingId: painting._id,
            dislike: 1
        };

        return this._requester.post(requestUrl, requestHeaders, data);
    }

    getDislikes(paintingId) {
        var filter = JSON.stringify({
            "paintingId": paintingId
        });

        let requestUrl = this._url + 'appdata/' + this._appKey + '/rateDislikes/?query=' + filter;
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();

        return this._requester.get(requestUrl, requestHeaders);
    }

    downloadPainting(id) {
        let requestUrl = this._url + 'blob/' + this._appKey + '/' + id;
        let requestHeaders = this._authenticationService.getKinveyPaintingsAuthHeaders();

        return this._requester.get(requestUrl, requestHeaders);
    }

    getAllComments(id) {
        var filter = JSON.stringify({
            "paintingId": id
        });
        let requestUrl = this._url + 'appdata/' + this._appKey + '/comments?query=' + filter;
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();

        return this._requester.get(requestUrl, requestHeaders);
    }

    addNewComment(data) {
        let requestUrl = this._url + 'appdata/' + this._appKey + '/comments';
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();

        return this._requester.post(requestUrl, requestHeaders, data);
    }

    getPaintingsInfoByStyle(style) {
        var filter = JSON.stringify({
            "artist.style": style
        });

        let requestUrl = this._url + 'appdata/' + this._appKey + '/paintings/?query=' + filter;
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();

        return this._requester.get(requestUrl, requestHeaders);
    }

    getPaintingsInfoBySubject(subject) {
        var filter = JSON.stringify({
            "subject": subject
        });

        let requestUrl = this._url + 'appdata/' + this._appKey + '/paintings/?query=' + filter;
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();

        return this._requester.get(requestUrl, requestHeaders);
    }

    getPaintingsInfoByTechnique(technique) {
        var filter = JSON.stringify({
            "technique": technique
        });

        let requestUrl = this._url + 'appdata/' + this._appKey + '/paintings/?query=' + filter;
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();

        return this._requester.get(requestUrl, requestHeaders);
    }

    getPaintingsByTitle(title) {
        var filter = JSON.stringify({
            "title": { "$regex": `^(?i)${title}` }
        });
        let requestUrl = this._url + 'appdata/' + this._appKey + '/paintings/?query=' + filter;
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();

        return this._requester.get(requestUrl, requestHeaders);
    }

    getPaintingsByArtist(artist) {
        var filter = JSON.stringify({
            "artist.name": { "$regex": `^(?i)${artist}` }
        });
        let requestUrl = this._url + 'appdata/' + this._appKey + '/paintings/?query=' + filter;
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();

        return this._requester.get(requestUrl, requestHeaders);
    }

    addMessage(data) {
        let requestUrl = this._url + 'appdata/' + this._appKey + '/messages';
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();

        return this._requester.post(requestUrl, requestHeaders, data);
    }
}

let galleryModel = new GalleryModel(kinveyUrls.baseUrl, kinveyUrls.appKey, requester, authenticationService);

export { galleryModel };