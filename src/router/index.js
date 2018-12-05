import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../module-layout/views/layout';
import AccountLayout from '../module-account/views/layout';
import Kanbans from '../module-kanban/router';
import Accounts from '../module-account/router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/account/login',
            component: AccountLayout,
            children: [...Accounts],
        },
        {
            path: '/kanban',
            redirect: '/kanban/todo',
            component: Layout,
            children: [...Kanbans],
        },
    ],
});
