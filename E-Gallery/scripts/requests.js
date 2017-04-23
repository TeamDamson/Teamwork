import { displayError } from 'utility';
import { kinveyUrls } from 'constants';
import 'jquery';

function viewGallery() {
    $('.gallery').empty();
    $.get({
        url: kinveyUrls.baseUrl + 'appdata/' + kinveyUrls.appKey + '/paintings',
        headers: getKinveyUserAuthHeaders(),
        contentType: 'application/json'
    }).then(displayGallery).catch(displayError);
}

function displayGallery(paintings) {
    let gallery = $('.gallery');
    $('#main-view').css('display', 'none');
    $('.gallery').css('display', 'block');
    if (paintings.length === 0) {
        gallery.text('No paintings available');
    } else {
        $('.gallery').append('<div class="search col-md-4">');
        let list = $('<ul>').addClass('galleryItems list-group row col-md-8');
        for (let picture of paintings) {
            list.append($('<li class="itemGallery list-group-item col-md-4">').append($('<img class="imgGallery img-responsive">').attr('src', picture.image._downloadURL))
                .append($('<div>').append($('<a class="artist" data-id="' + picture._id + '" href="#">').text(picture.artist).click(function() {
                    viewPaintingByArtist($(this).text());
                })))
                .append($('<div>').append($('<a class="title" data-id="' + picture._id + '" href="#">').text(picture.title).click(function() {
                    viewPaintingInfo($(this).attr('data-id'));
                }))));
        }
        let pagination = `<nav class="col-md-6 col-md-offset-4" aria-label="Page navigation">
                            <ul class="pagination">
                                <li>
                                    <a href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <li><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li>
                                    <a href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>`;
        gallery.append(list);
        gallery.append(pagination);
    }
}

function getKinveyUserAuthHeaders() {
    return {
        "Authorization": "Kinvey " + sessionStorage.getItem("authtoken")
    };
}

function viewPaintingInfo(paintingId) {
    $('.gallery').empty();
    $('.galleryItems').css('display', 'none');
    $('.gallery').css('display', 'block');
    $.get({
        url: kinveyUrls.baseUrl + 'appdata/' + kinveyUrls.appKey + '/paintings/' + paintingId,
        headers: getKinveyUserAuthHeaders(),
        contentType: 'application/json'
    }).then(displayPaintingInfo).catch(displayError);

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
}

export { viewGallery };