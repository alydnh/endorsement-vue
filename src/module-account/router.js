import Login from './views/login';
import Register from './views/register';

export default [
    {
        path: '/account/login',
        component: Login,
        name: 'account-login',
    },
    {
        path: '/account/register',
        component: Register,
        name: 'account-register',
    },
];
