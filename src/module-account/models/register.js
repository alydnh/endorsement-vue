import __ from '../../utils/__';

const createValidator = __.createModelValidator({
    accountName() {
        return this.required('register/validate/account-name-not-empty');
    },
    password() {
        return this.required('register/validate/password-not-empty');
    },

    password2() {
        return this.required('register/validate/password2-not-empty') && this.must(v => this.target.password === v, 'register/validate/password2-not-indentical');
    },

    mobile() {
        return this.required('register/validate/mobile-not-empty');
    },

    verificationCode() {
        return this.required('register/validate/verification-code-not-empty');
    },
});

export default class Register {
    constructor() {
        this._accountName = '';
        this._password = '';
        this._password2 = '';
        this._mobile = '';
        this._verificationCode = '';
        this._validator = createValidator(this);
    }

    get accountName() {
        return this._accountName;
    }

    set accountName(value) {
        this._accountName = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get mobile() {
        return this._mobile;
    }

    set mobile(value) {
        this._mobile = value;
    }

    get verificationCode() {
        return this._verificationCode;
    }

    set verificationCode(value) {
        this._verificationCode = value;
    }

    get validator() {
        return this._validator;
    }
}
