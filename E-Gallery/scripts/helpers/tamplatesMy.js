import Handlebars from 'handlebars';
import { Validator } from 'validators'
import { Patterns } from 'patterns';

class Tamplates {
    static setPagination(data) {
        return _compaling(data, Patterns.patternPagination);
    }

    static setList(data) {
        return _compaling(data, Patterns.patternList);
    }

    static paintingByArtist(data) {
        return _compaling(data, Patterns.patternDisplayPaintingByArtist);
    }

    static homePage(data) {
        return this._compaling(data, Patterns.loadHomePage);
    }

    static RegisterForm(data) {
        return this._compaling(data, Patterns.showRegisterForm);
    }

    static _compaling(data, tamplate) {
        Validator.validDataTamplate(data);
        let templateFunc = Handlebars.compile(tamplate);
        return templateFunc(data);
    }
}

export { Tamplates }