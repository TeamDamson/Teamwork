class GalleryApplication {
    constructor(storage, uiManager, autenticationManager) {
        Validator.ValidateObject(storage, ["clear"]);
        Validator.ValidateObject(autenticationManager, ["logInUser", "logOutUser", "registerUser"]);
        Validator.ValidateObject(uiManager, ["initUI"]);

        this._storage = storage;
    }
    start() {
        this._storage.clear();
        this.uiManager.initUI();
    }
}

class UIManager {
    constructor()
    init() {
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