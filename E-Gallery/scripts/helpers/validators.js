import toastr from 'toastr';

class Validator {
    static validatePassword(password) {
        let pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
            message = "Password must be between 6 and 16 symbols, contain at least one digit and one special character";
        if (!pattern.test(password)) {
            throw Error(message);
        }
    }

    static validateUserName(username) {
        let pattern = /^[a-zA-Z0-9]{3,40}$/,
            message = "Username must be between 3 and 40 symbols, contain digit and letters character";
        if (!pattern.test(username)) {
            throw new Error(message);
        }
    }

    static validateObject(objectToValidate, propertiesToValidate) {
        let message = "Missing object property/method";
        if (!isObject(objectToValidate)) {
            throw new Error("Value passed is not an object");
        }

        propertiesToValidate.forEach(property => {
            if (objectToValidate[property] === 'undefined') {
                throw new Error(message + " " + property);
            }
        })
    }

    static isObject(objectToCheck) {
        if (objectToCheck === null) {
            return false;
        }

        return ((typeof objectToCheck === 'function') || (typeof objectToCheck === 'object'));
    }
}

export { Validator };