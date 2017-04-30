class DOMManipulation {

    static showLogedIn() {
        // console.log('show');
        $('#linkGallery').removeClass('hidden');
        $('#register-form').addClass('hidden');
        $('#menu').removeClass('col-md-6'); //col-md-6 -> col-md-12
        $('#linkLogout').removeClass('hidden');
        $('#loggedInUser').removeClass('hidden');
    }

    static showLogedOut() {
        // console.log('hide');
        $('#linkGallery').addClass('hidden');
        $('#loggedInUser').addClass('hidden');
        $('#menu').addClass('col-md-6');
        $('#register-form').removeClass('hidden');
        $('#linkLogout').addClass('hidden');
    }

    static clearUserPassField(className) {
        $(className + 'input[name=user]').val('');
        $(className + 'input[name=pass]').val('');
    }

    static clearAllUsersField() {
        this.clearUserPassField('');
        $('.form-signin input[name=confirmPass]').val('');
    }
}
export { DOMManipulation }