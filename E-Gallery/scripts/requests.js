function viewGallery() {
    $('.gallery').empty();
    $('#main-view').css('display', 'none');
    $('<div>').addClass('gallery').appendTo($('main'));
    $.get({
        url: baseUrl + 'appdata/' + appKey + '/paintings',
        headers: getKinveyUserAuthHeaders(),
        contentType: 'application/json'
    }).then(displayGallery).catch(displayError);
}

function displayGallery(paintings) {
    let gallery = $('.gallery');
    let list = $('<ul>').addClass('galleryItems');
    for (let picture of paintings) {
        list.append($('<li class="itemGallery">').append($('<img class="imgGallery">').attr('src', picture.image._downloadURL)).append($('<div class="artist">').text(picture.artist)).append($('<div class="title">').text(picture.title)));
    }
    gallery.append(list);
}

function getKinveyUserAuthHeaders() {
    return {
        "Authorization": "Kinvey " + sessionStorage.getItem("authtoken")
    };
}