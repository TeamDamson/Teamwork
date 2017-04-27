
class Patterns {
    patternPagination = `<nav class="col-md-6 col-md-offset-4" aria-label="Page navigation">
                            <ul class="pagination">
                              {{#each el}}
                                  <li><a href="#" {{{ariaLabel}}}>{{{num}}}</a></li>
                              {{/each}}
                            </ul>
                        </nav>`;

    patternList =
        `<div class="search col-md-4"></div>
        <ul class="galleryItems list-group row col-md-8">
        {{each count}}
            <li class="itemGallery list-group-item col-md-4"></li>
            <img class="imgGallery img-responsive" src={{{image._downloadURL}}}>
            <div onclick="onArtistClicked()">
                <a class="artist" data-id={{{_id}}} href="#">{{{artist}}}</a>
            </div>
            <div onclick="onPainitngClicked()">
                <a class="title" data-id={{{_id}}} href="#">{{{title}}}</a>
            </div>
        {{/each}}
        </ul>`;

    patternDisplayPaintingByArtist =
        `<div class="search col-md-4"></div>
        <ul class="galleryItems list-group row col-md-8">
        {{#each count}}
            <li class="itemGallery list-group-item col-md-4">
                <img class="img-thumbnail" src={{{image._downloadURL}}}>
                <div>
                    <a class="artist" data-id={{{_id}}} href="#">{{{artist}}}</a>
                </div>
                <div>
                    <a class="title" data-id={{{_id}}} href="#">{{{title}}}</a>
                </div>
            </li>
        {{/each}}
        </ul>`
}


export { Patterns }