import 'jquery';
import { Validator } from 'validators';

class AuthenticationUI {
    constructor(authenticationManager, eventsParam, resultElements) {
        Validator.ValidateObject(authenticationManager, ["logInUser", "logOutUser", "registerUser"]);
        this._authenticationManager = authenticationManager;
        this._successElement = resultElements.successMessageElement;
        this._errorElement = resultElements.errorMessageElement
        this._eventsParam = eventsParam;
    }

    init() {
        let registerUserElement = this._eventsParam.registerUser[0],
            registerUserEvent = this._eventsParam.registerUser[1],
            logInUserElement = this._eventsParam.logInUser[0],
            logInUserEvent = this._eventsParam.logInUser[1],
            logOutUserElement = this._eventsParam.logInUser[0],
            logOutUserEvent = this._eventsParam.logOutUser[1];
        registerUserElement.on(registerUserEvent, this._authenticationManager.registerUser);
        logInUserElement.on(logInUserEvent, this._authenticationManager.logInUser);
        logOutUserElement.on(logOutUserEvent, this._authenticationManager.logOutUser);
        this._successElement.on('login', this.showSuccessMessage);
        this._errorElement.on('loginFailed', this.displayError)
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