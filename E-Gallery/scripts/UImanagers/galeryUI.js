import { displayError } from 'utility';
import { kinveyUrls } from 'constants';
import 'jquery';
import { Tamplates } from 'tamplates';

class GaleryUI {
    constructor(galeryElement, getManager) {
        Validator.ValidateObject(storage, ["clear"]);
        Validator.ValidateObject(getManager, ["getPainitngInfo", "getGalery", "getPainitngsByArtist"]);
        this._galeryElement = galeryElement;
        this._getManager = getManager;
    }
    init() {
        $('#linkHome').on('click', this._showHomeView);
        $('#linkGallery').on('click', this._getManager.getGalery);
        $(document).on({
            ajaxStart: function () {
                $('#load').show();
            },
            ajaxStop: function () {
                $('#load').hide();
            }
        });
    }

    _showHomeView() {
        $('#main-view').css('display', 'block');
        $('.gallery').css('display', 'none');
    }

    displayGallery(paintings) {
        this._galeryElement.css('display', 'block');
        $('#main-view').css('display', 'none');
        if (paintings.length === 0) {
            this._galeryElement.text('No paintings available');
        } else {

            // this._galeryElement.append('<div class="search col-md-4">');
            // let list = $('<ul>').addClass('galleryItems list-group row col-md-8');
            // for (let picture of paintings) {
            //     list.append($('<li class="itemGallery list-group-item col-md-4">'));
            //     list.append($('<img class="imgGallery img-responsive">').attr('src', picture.image._downloadURL));
            //     list.append($('<div>').append($('<a class="artist" data-id="' + picture._id + '" href="#">')).text(picture.artist)
            //         .click(onArtistClicked));
            //     list.append($('<div>').append($('<a class="title" data-id="' + picture._id + '" href="#">')).text(picture.title)
            //         .click(onPainitngClicked));
            // }
            // let pagination = `<nav class="col-md-6 col-md-offset-4" aria-label="Page navigation">
            //                 <ul class="pagination">
            //                     <li>
            //                         <a href="#" aria-label="Previous">
            //                             <span aria-hidden="true">&laquo;</span>
            //                         </a>
            //                     </li>
            //                     <li><a href="#">1</a></li>
            //                     <li><a href="#">2</a></li>
            //                     <li><a href="#">3</a></li>
            //                     <li><a href="#">4</a></li>
            //                     <li>
            //                         <a href="#" aria-label="Next">
            //                             <span aria-hidden="true">&raquo;</span>
            //                         </a>
            //                     </li>
            //                 </ul>
            //             </nav>`;
            let data = {
                el:
                [
                    { num: `<span aria-hidden="true">&laquo;</span>`, ariaLabel: `aria-label="Previous"` },
                    { num: 1 }, { num: 2 }, { num: 3 }, { num: 4 },
                    { num: `<span aria-hidden="true">&raquo;</span>`, ariaLabel: `aria-label="Next"` }
                ]
            };
            let pagination = Tamplates.setPagination(data);
            let list = Tamplates.setList({ count: paintings });
            this._galeryElement.append(list);
            this._galeryElement.append(pagination);
        }
    }

    onArtistClicked() {
        this._getManager.getPaintingByArtist(picture.artist, 'application/json')
            .then(this._displayPaintingByArtist);
    }

    onPainitngClicked() {
        this._getManager.getPainitngInfo(picture._id, 'application/json')
            .then(this._displayPaintingInfo)
    }

    _displayPaintingInfo(painting) {

        // will use Handelbars
        
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
        this._galeryElement.append('<div class="search col-md-5">');
        this._galeryElement.append(info);
    }

    _displayPaintingByArtist(paintings) {
        if (paintings.length === 0) {
            this._galeryElement.text('No paintings available');
        } else {

            // this._galeryElement.append('<div class="search col-md-4">');
            // let list = $('<ul>').addClass('galleryItems list-group row col-md-8');
            // for (let picture of paintings) {
            //     list.append($('<li class="itemGallery list-group-item col-md-4">').append($('<img class="img-thumbnail">').attr('src', picture.image._downloadURL))
            //         .append($('<div>').append($('<a class="artist" data-id="' + picture._id + '" href="#">').text(picture.artist)))
            //         .append($('<div>').append($('<a class="title" data-id="' + picture._id + '" href="#">').text(picture.title))));
            // }

            let list = Tamplates.paintingByArtist({ count: paintings });
            this._galeryElement.append(list);
        }
    }

    logOutUser() {
        this._showSuccessMessage('Logout successful!');
        $('#loggedInUser').text('');
        $('#linkGallery').css('display', 'none');
        $('.login-register').css('display', 'inline-block');
        $('#logout').css('display', 'none');
        $('#main-view').css('display', 'block');
        $('.gallery').css('display', 'none');
    }

    _showSuccessMessage(message) {
        $('#info').text(message).show().hide("fade", 4000);
    }
}

// function viewGallery() {
//     $('.gallery').empty();
//     let authHeaders = getKinveyUserAuthHeaders();
//     $.get({
//         url: kinveyUrls.baseUrl + 'appdata/' + kinveyUrls.appKey + '/paintings',
//         headers: authHeaders,
//         contentType: 'application/json'
//     }).then(displayGallery).catch(displayError);
// }



// function getKinveyUserAuthHeaders() {
//     return {
//         "Authorization": "Kinvey " + sessionStorage.getItem("authtoken")
//     };
// }

// function viewPaintingInfo(paintingId) {
//     $('.gallery').empty();
//     $('.galleryItems').css('display', 'none');
//     $('.gallery').css('display', 'block');
//     $.get({
//         url: kinveyUrls.baseUrl + 'appdata/' + kinveyUrls.appKey + '/paintings/' + paintingId,
//         headers: getKinveyUserAuthHeaders(),
//         contentType: 'application/json'
//     }).then(displayPaintingInfo).catch(displayError);




// function viewPaintingByArtist(artistName) {
//     $('.gallery').empty();
//     $('.galleryItems').css('display', 'none');
//     $('.gallery').css('display', 'block');
//     $.get({
//         url: kinveyUrls.baseUrl + 'appdata/' + kinveyUrls.appKey + '/paintings/?query={"artist":"' + artistName + '"}',
//         headers: getKinveyUserAuthHeaders(),
//         contentType: 'application/json'
//     }).then(displayPaintingByArtist).catch(displayError);


//     function displayPaintingByArtist(paintings) {
//         if (paintings.length === 0) {
//             $('.gallery').text('No paintings available');
//         } else {
//             $('.gallery').append('<div class="search col-md-4">');
//             let list = $('<ul>').addClass('galleryItems list-group row col-md-8');
//             for (let picture of paintings) {
//                 list.append($('<li class="itemGallery list-group-item col-md-4">').append($('<img class="img-thumbnail">').attr('src', picture.image._downloadURL))
//                     .append($('<div>').append($('<a class="artist" data-id="' + picture._id + '" href="#">').text(picture.artist)))
//                     .append($('<div>').append($('<a class="title" data-id="' + picture._id + '" href="#">').text(picture.title))));
//             }
//             $('.gallery').append(list);
//         }
//     }
// }

export { GaleryUI };