import Vue from 'vue';

import ElementUI from '../module-element-ui/install';
import '../module-element-ui/theme-chalk/index.css';

import PtComponents from '../components/install';
import Layout from '../module-layout/install';
// import CarInfo from '../module-car-info/install';
// import Receipt from '../module-receipt/install';
// import ParkingLots from '../module-parking/install';
// import Bind from '../module-bind/install';

import Tests from '../module-tests/install';

Vue.use(ElementUI);
Vue.use(PtComponents);
Vue.use(Layout);
// Vue.use(CarInfo);
// Vue.use(Receipt);
// Vue.use(ParkingLots);
// Vue.use(Bind);

Vue.use(Tests);
