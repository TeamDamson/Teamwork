import { kinveyUrls } from 'constants';
import toastr from 'toastr';
import { templates } from "templates";
import { requester } from 'requester';
import { authenticationService } from 'authenticationService';
import 'jquery';

class GalleryModel {
    constructor(url, appKey, requester, authenticationService){
        this._url = url;
        this._appKey = appKey;
        this._authenticationService = authenticationService;
        this._requester = requester;
    }

    getPaintingsInfo(paintingId){
        let requestUrl = this._url + 'appdata/' + this._appKey + '/paintings/' + paintingId;
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();

         return this._requester.get(requestUrl, requestHeaders);
    }

    getArtistsInfo(artistName){
       var filter = JSON.stringify({
            "artist.name": artistName
        });

        let requestUrl = this._url + 'appdata/' + this._appKey + '/paintings/?query=' + filter;
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();
        
        return this._requester.get(requestUrl, requestHeaders);
    }

    getAllPaintings(){
        let requestUrl = this._url + 'appdata/' + this._appKey + '/paintings';
        let requestHeaders = this._authenticationService.getKinveyUserAuthHeaders();
        
        return this._requester.get(requestUrl, requestHeaders);
    }
}

let galleryModel = new GalleryModel(kinveyUrls.baseUrl, kinveyUrls.appKey, requester, authenticationService);

export { galleryModel };