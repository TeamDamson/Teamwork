import 'jquery';

class AuthenticationUI {
    constructor(authenticationManager, eventsParam, resultElements) {
        Validator.ValidateObject(autenticationManager, ["logInUser", "logOutUser", "registerUser"]);
        this._autenticationManager = authenticationManager;
        this._successElement = resultElements.successElement;
        this._errorElement = resultElements.errorMessageElement
    }

    init() {
        let registerUserElement = eventsParam.registerUser[0],
            registerUserEvent = eventsParam.registerUser[1],
            logInUserElement = eventsParam.logInUser[0],
            logInUserEvent = eventsParam.logInUser[1],
            logOutUserElement = eventsParam.logInUser[0],
            logOutUserEvent = eventsParam.logOutUser[1];
        registerUserElement.on(registerUserEvent, this._autenticationManager.registerUser);
        logInElement.on(logInUserEvent, this._autenticationManager.logInUser);
        logOutElement.on(logOutUserEvent, this._autenticationManager.logOutUser);
        this._successElement.on('login', this.showSuccessMessage);
        this._errorElement.on('loginFailed', showSuccessMessage)
    }

    displayError(error) {
        this._errorMessageElement.show()
            .text('Error: ' + error.responseJSON.description).hide("fade", 4000);
    }

    showSuccessMessage(message) {
        this._successMessageElement.text(message).show().hide("fade", 4000);
    }
}

export { AuthenticationUI }