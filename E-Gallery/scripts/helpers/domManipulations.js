class DOMManipulation {

    static showLogedIn() {
        // console.log('show');
        $('#linkGallery').removeClass('hidden');
        $('aside').removeClass('hidden');
        $('#register-form').addClass('hidden');
        $('#menu').removeClass('col-md-6'); //col-md-6 -> col-md-12
        $('#linkLogout').removeClass('hidden');
        $('#loggedInUser').removeClass('hidden');
        $('main').addClass('col-md-8 col-md-offset-2');
        $('aside').addClass('col-md-2');
    }

    static showLogedOut() {
        // console.log('hide');
        $('#linkGallery').addClass('hidden');
        $('#loggedInUser').addClass('hidden');
        $('#menu').addClass('col-md-6');
        $('#register-form').removeClass('hidden');
        $('#linkLogout').addClass('hidden');
        $('main').removeClass('col-md-8 col-md-offset-2');
        $('aside').removeClass('col-md-2');      
    }

    static clearUserPassField(className) {
        $(className + 'input[name=user]').val('');
        $(className + 'input[name=pass]').val('');
    }

    static clearAllUsersField() {
        this.clearUserPassField('');
        $('.form-signin input[name=confirmPass]').val('');
    }

    static creatingDivToAddGallery(selector) {
        $(selector).empty();
        $(selector).append($('<div>').addClass('gallery'));
    }
}
export { DOMManipulation }