class KinveyAuthorizationHeaderProvider {
    constructor(storage) {
        Validator.ValidateObject(storage, ["getItem"])
        this._storage = storage;
    }
    getHeaders() {
        return {
            "Authorization": "Kinvey " + this._storage.getItem("authtoken")
        };
    }
}

export { KinveyAuthorizationHeaderProvider }