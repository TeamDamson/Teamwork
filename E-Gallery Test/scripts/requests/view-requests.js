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
            "artist": artistName
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

/*


function viewPaintingInfo(paintingId) {
    $('.gallery').empty();
    $('.galleryItems').css('display', 'none');
    $('.gallery').css('display', 'block');
    $.get({
        url: kinveyUrls.baseUrl + 'appdata/' + kinveyUrls.appKey + '/paintings/' + paintingId,
        headers: getKinveyUserAuthHeaders(),
        contentType: 'application/json'
    }).then(displayPaintingInfo).catch(function (error) {
        toastr.error('Unable to display painting!');
        location.hash = '#/login';
    });

    function displayPaintingInfo(painting) {
        let info = $('<div class="col-md-7">');
        info.append(
            $('<img>').attr('src', painting.image._downloadURL).addClass('img-thumbnail'),
            $('<br>'),
            $('<br>'),
            $('<h3>').text('Artist: ').append($('<strong>').text(painting.artist)),
            $('<h4>').text('Title: ').append($('<strong>').text(painting.title)),
            $('<br>'),
            $('<br>'),
            $('<div>').text('Material: ').append($('<strong>').text(painting.material)),
            $('<div>').text('Tehnique: ').append($('<strong>').text(painting.technique)),
            $('<div>').text('Size: ').append($('<strong>').text(painting.size)),
            $('<div>').text('Description: ').append($('<strong>').text(painting.description)),
            $('<div>').text('Status: ').append($('<strong>').text(painting.status)),
            $('<div>').text('Price: ').append($('<strong>').text(painting.price)),
            $('<div>').text('Views: ').append($('<span class="label label-default">').text(painting.views)),
            $('<div>').text('Comments: ').append($('<span class="label label-default">').text(painting.comments)),
            $('<button type="button">').text('Add to Favorites').addClass('btn btn-lg'),
            $('<button type="button">').text('Add a comment').addClass('btn btn-lg'),
            $('<button type="button">').text('Download').addClass('btn btn-lg')
        );
        $('.gallery').append('<div class="search col-md-5">');
        $('.gallery').append(info);
    }
}

function viewPaintingByArtist(artistName) {
    $('.gallery').empty();
    $('.galleryItems').css('display', 'none');
    $('.gallery').css('display', 'block');
    $.get({
        url: kinveyUrls.baseUrl + 'appdata/' + kinveyUrls.appKey + '/paintings/?query={"artist":"' + artistName + '"}',
        headers: getKinveyUserAuthHeaders(),
        contentType: 'application/json'
    }).then(displayPaintingByArtist).catch(displayError);


    function displayPaintingByArtist(paintings) {
        if (paintings.length === 0) {
            $('.gallery').text('No paintings available');
        } else {
            $('.gallery').append('<div class="search col-md-4">');
            let list = $('<ul>').addClass('galleryItems list-group row col-md-8');
            for (let picture of paintings) {
                list.append($('<li class="itemGallery list-group-item col-md-4">').append($('<img class="img-thumbnail">').attr('src', picture.image._downloadURL))
                    .append($('<div>').append($('<a class="artist" data-id="' + picture._id + '" href="#">').text(picture.artist)))
                    .append($('<div>').append($('<a class="title" data-id="' + picture._id + '" href="#">').text(picture.title))));
            }
            $('.gallery').append(list);
        }
    }
}*/
let galleryModel = new GalleryModel(kinveyUrls.baseUrl, kinveyUrls.appKey, requester, authenticationService);

export { galleryModel };