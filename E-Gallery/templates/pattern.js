
class Patt {
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
        </ul>`;

    loadHomePage =
    `<div id="main-view">
            <div id="main-title">
                <h1>{{wellcome}}</h1>
                <h1>{{name}}</h1>
                <h4>This is new application for true picture connoisseurs, you can sell, buy, it's you!</h4>
            </div>
    </div>`;

    showRegisterForm =
    `<div id="reg-form">
    <div class="row">
            <div class="col-sm-6 col-md-4 col-md-offset-4">
                <div class="account-wall">
                    <img id="profile-img" class="profile-img-card" src={{imgAvatar}} />
                    <form class="form-signin">
                        <input type="text" class="form-control" name="user" placeholder={{nameField}} autofocus requered
                            data-content="This filed is requerd"
                            data-toggle="popoverName"
                            data-trigger="delay={show: 0, hide: 1000}">
                        <input type="password" class="form-control" name="pass" placeholder={{passField}} 
                            data-content="This filed is requerd"
                            data-toggle="popoverPass"
                            data-trigger="delay={show: 0, hide: 1000}">
                        <input type="password" class="form-control" name="confirmPass" placeholder={{confirmPassField}}
                            data-content="This filed is requerd"
                            data-toggle="popoverConfirmPass"
                            data-trigger="delay={show: 0, hide: 1000}">
                        <a href="#/loginRegister" class="btn btn-lg btn-info btn-block" id="btn-register" {{{button.event}}}()>{{button.name}}</a>
                    </form>
                </div>
            </div>
        </div>
    </div>`
    //{{button.click}}
}

let Patterns = new Patt();
export { Patterns }