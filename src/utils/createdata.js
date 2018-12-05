import _ from 'underscore';

const createdata = validator => {
    const data = {};
    for (const fieldName in validator) {
        const fieldValidator = validator[fieldName];
        let value = fieldValidator.defaultValue;
        if (_.isEmpty(value)) {
            if (fieldValidator.type === Array) {
                value = [];
            } else if (fieldValidator.type === String) {
                value = '';
            } else if (fieldValidator.type === Number) {
                value = 0;
            } else if (fieldValidator.type === Boolean) {
                value = false;
            } else if (fieldValidator.type === Object) {
                if (!_.isEmpty(fieldValidator.validator)) {
                    value = createdata(fieldValidator.validator);
                }
            }
        }
        data[fieldName] = value;
    }

    return data;
};

export default createdata;
