import 'handlebars';
import { Validator } from 'validators'
import { Patterns } from 'patterns';

class Tamplates {
    static setPagination(data) {
        return _compaling(data, Patterns.patternPagination);
    }

    static setList(data) {
        return _compaling(data, Patterns.patternList);
    }

    _compaling(data, tamplate) {
        Validator.validDataTamplate(data);
        let templateFunc = Handlebars.compile(tamplate);
        return templateFunc(data);
    }
}

export { Tamplates }