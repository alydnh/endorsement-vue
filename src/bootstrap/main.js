// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import _ from 'lodash';
import Vue from 'vue';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import router from '../router';
import './install';

Vue.config.productionTip = false;

Vue.mixin({
    data() {
        return {};
    },
    methods: {
        _rt(text, toTranslate) {
            if (!_.isString(text)) {
                return text;
            }
            return _.isEmpty(text) ? '' : _.reduce(toTranslate, (l, r) => l.replace(r, this._tt(r)), text);
        },
        _tt(text) {
            return text;
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
