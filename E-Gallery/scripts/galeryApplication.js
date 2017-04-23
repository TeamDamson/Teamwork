class GaleryApplication {
    constructor(storage, uiManager, autenticationManager) {
        Validator.ValidateObject(storage, ["clear"]);
        this._storage = storage;
    }

    init() {
        this._storage.clear();
        $('#linkLogOut').on('click', logOutUser);

        $('#linkHome').on('click', showHomeView);
        $('#linkGallery').on('click', viewGallery);

        $('#btnRegister').on('click', registerUser);
        $('#btnLogin').on('click', logInUser);

        $(document).on({
            ajaxStart: function() {
                $('#load').show();
            },
            ajaxStop: function() {
                $('#load').hide();
            }
        });
        $(document).on('login')
    }
}

export { GaleryApplication };