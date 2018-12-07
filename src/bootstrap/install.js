import Vue from 'vue';

import ElementUI from '../module-element-ui/install';
import '../module-element-ui/packages/theme-chalk/lib/index.css';

import PtComponents from '../components/install';
import Layout from '../module-layout/install';

import Tests from '../module-tests/install';

Vue.use(ElementUI);
Vue.use(PtComponents);
Vue.use(Layout);
Vue.use(Tests);
