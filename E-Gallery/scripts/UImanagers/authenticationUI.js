// import 'jquery';

class AuthenticationUI {
    constructor(authenticationManager, eventsParam) {
        Validator.ValidateObject(autenticationManager, ["logInUser", "logOutUser", "registerUser"]);
        this._autenticationManager = authenticationManager;
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
    }
}

export { AuthenticationUI }