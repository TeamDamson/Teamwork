import { Validator } from 'validators';

class JSONFormatter {
    constructor() {
        this.formatType = 'application/json';
    }

    format(objectToFormat) {
        Validator.validateObject(objectToFormat, ['username', 'password']);

        return JSON.stringify(objectToFormat);
    }

}

export { JSONFormatter };