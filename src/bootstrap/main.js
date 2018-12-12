// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import _ from 'lodash';
import Vue from 'vue';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import router from '../router';
import './install';
import i18NApi from '../api/i18N';

Vue.config.productionTip = false;
const currentProcessEnv = process.env.NODE_ENV.toLowerCase();
const savedI18NKeys = {};

i18NApi.getSettled().then(items => {
    const i18NItems = {};
    _.each(items, item => {
        const i18NItem = {
            default: item.default,
            languages: {},
        };
        _.each(item.items, p => (i18NItem.languages[p.location] = p.text));
        i18NItems[item.key] = i18NItem;
    });

    Vue.mixin({
        computed: {
            processEnv() {
                return currentProcessEnv;
            },
            developmentMode() {
                return this.processEnv === 'development';
            },
        },
        methods: {
            _rt(text, toTranslate) {
                if (!_.isString(text)) {
                    return text;
                }
                return _.isEmpty(text) ? '' : _.reduce(toTranslate, (l, r) => l.replace(r, this._tt(r)), text);
            },
            _tt(text) {
                const i18NItem = i18NItems[text];
                if (!_.isUndefined(i18NItem)) {
                    if (!_.isEmpty(i18NItem.default)) {
                        return i18NItem.default;
                    }
                }
                if (this.developmentMode) {
                    if (_.isUndefined(savedI18NKeys[text])) {
                        i18NApi
                            .saveKeys([text])
                            .then(() => (savedI18NKeys[text] = true))
                            // eslint-disable-next-line
                            .catch(e => console.log(e));
                    }
                }
                const texts = text.split('/');
                return _.isEmpty(texts) ? text : _.last(texts);
            },
        },
    });

    /* eslint-disable no-new */
    new Vue({
        el: '#app',
        router,
        components: { App },
        template: '<App/>',
    });
});
