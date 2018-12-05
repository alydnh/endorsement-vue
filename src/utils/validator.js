import _ from 'lodash';

export default class Validator {
    constructor(propertyName, validate, target, context) {
        this.$message = '';
        this.$propertyName = propertyName;
        this.$isValid = true;
        this.$target = target;
        this.$validate = _.bind(validate, this);
        this.$context = context;
        this.$skipOnce = false;
    }

    get message() {
        return this.$message;
    }
    get propertyName() {
        return this.$propertyName;
    }
    get isValid() {
        return this.$isValid;
    }
    get target() {
        return this.$target;
    }
    get context() {
        return this.$context;
    }
    get value() {
        const propNames = this.propertyName.split('.');
        const value = _.reduce(propNames, (o, k) => _.property(k)(o), this.target);
        return value;
    }

    must(predicate, message) {
        if (!predicate.apply(this, [this.value])) {
            return this.error(message);
        }

        return this.success();
    }

    required(message) {
        if (_.isEmpty(this.value) && !_.isNumber(this.value) && !_.isDate(this.value)) {
            return this.error(message);
        }

        return this.success();
    }

    integer(message) {
        if (!/^\d*$/.test(this.value)) {
            return this.error(message);
        }

        return this.success();
    }

    numeric(message) {
        if (!/^\d*.?\d{1,3}$/.test(this.value)) {
            return this.error(message);
        }

        return this.success();
    }

    validate() {
        if (this.$skipOnce) {
            this.$skipOnce = false;
            return true;
        }
        return this.$validate();
    }

    skipOnce() {
        this.$skipOnce = true;
    }

    error(message) {
        this.$message = message;
        this.$isValid = false;
        return false;
    }

    success() {
        this.$message = '';
        this.$isValid = true;
        return true;
    }
}
