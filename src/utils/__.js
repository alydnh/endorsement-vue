import _ from 'lodash';
import moment from 'moment';
import createdata from './createdata';
import deepclone from './deepclone';
import Validator from './validator';

export default {
    createdata,
    deepclone,
    isValidNumeric(value) {
        return /^\d*.?\d+$/.test(value);
    },
    undefinedOrNullOrEmpty(value) {
        if (_.isUndefined(value)) {
            return true;
        }

        if (_.isNull(value)) {
            return true;
        }

        if (_.isNumber(value)) {
            return false;
        }

        return _.isEmpty(value);
    },
    ensureArray(value) {
        return _.isArray(value) ? value : [value];
    },
    clear(array) {
        if (_.isArray(array)) {
            array.splice(0, array.length);
        }
    },
    defaultIfEmpty(source, defaultValue) {
        if (_.isNumber(source) && !_.isNaN(source)) {
            return source;
        }
        return _.isEmpty(source) ? defaultValue : source;
    },
    mergeArrays(arrays) {
        return _.reduce(arrays, (l, r) => l.concat(r), []);
    },
    emptyObject() {
        return () => {};
    },
    emptyArray() {
        return () => [];
    },
    removeArrayItem(array, item) {
        const index = _.indexOf(array, item);
        if (index >= 0) {
            array.splice(index, 1);
        }
    },
    mergeClasses(classes, classes2) {
        return () => {
            let mergedClasses = _.clone(classes);
            if (!_.isEmpty(classes2)) {
                if (_.isString(classes2)) {
                    mergedClasses[classes2] = true;
                } else {
                    mergedClasses = _.extend(mergedClasses, classes2);
                }
            }
            return mergedClasses;
        };
    },
    concatClass(a, b) {
        if (a && a.indexOf(b) > -1) return a;
        return a ? (b ? a + ' ' + b : a) : b || '';
    },
    valueOfArray(array, index) {
        if (_.isArray(array) && array.length > index) {
            return array[index];
        }

        return undefined;
    },
    intOfArray(array, index, defaultValue = 0) {
        let value = this.valueOfArray(array, index);
        if (_.isUndefined(value)) {
            return defaultValue;
        }
        value = parseInt(value, 10);
        return _.isNaN(value) ? defaultValue : value;
    },
    stringOfArray(array, index, defaultValue = undefined) {
        const value = this.valueOfArray(array, index);
        if (_.isUndefined(value)) {
            return defaultValue;
        }
        return value;
    },
    ifNotEmpty(value, action) {
        if (!_.isEmpty(value)) {
            action(value);
            return true;
        }

        return false;
    },
    ifEmpty(value, action) {
        if (_.isEmpty(value)) {
            return action();
        }

        return value;
    },
    currentDateString() {
        return this.formatDate(new Date());
    },
    formatDate(value) {
        return moment(value).format('YYYY-MM-DD');
    },
    async asyncTimeout(func, timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(() => func(resolve, reject), timeout);
        });
    },
    createModelValidator(validator) {
        return (target, context = {}) => {
            const validators = {};
            _.forOwn(validator, (v, k) => {
                validators[k] = new Validator(k, v, target, context);
            });
            validators.validate = () => {
                const realValidators = _.filter(_.values(validators), p => _.isObject(p) && _.isFunction(p.validate));
                return _.reduce(realValidators, (r, v) => v.validate() && r, true);
            };
            validators.reset = () => {
                const realValidators = _.filter(_.values(validators), p => _.isObject(p) && _.isFunction(p.validate));
                _.each(realValidators, p => p.success());
            };
            return validators;
        };
    },
    getPosition(el) {
        let xPos = 0;
        let yPos = 0;

        while (el) {
            if (el.tagName === 'BODY') {
                // deal with browser quirks with body/window/document and page scroll
                const xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                const yScroll = el.scrollTop || document.documentElement.scrollTop;
                xPos += el.offsetLeft - xScroll + el.clientLeft;
                yPos += el.offsetTop - yScroll + el.clientTop;
            } else {
                const position = window.getComputedStyle(el, null).getPropertyValue('position');
                // for all other non-BODY elements
                xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
                const top = position !== 'absolute' ? el.offsetTop : 0;
                yPos += top - el.scrollTop + el.clientTop;
            }
            el = el.offsetParent;
        }
        return {
            x: xPos,
            y: yPos,
        };
    },
    getHighlightTexts(text, keyword) {
        const index = text.toUpperCase().indexOf(keyword.toUpperCase());
        if (index >= 0) {
            return [
                text.substring(0, index),
                text.substring(index, keyword.length + index),
                text.substring(keyword.length + index),
            ];
        }
        return [text, '', ''];
    },
};
