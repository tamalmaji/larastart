import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import dashboard from './components/dashboard'
import developer from './components/developer'
import profile from './components/profile'
import Users from './components/Users'
import NotFound from './components/NotFound'
const routes = [
    {
        path: '/dashboard',
        component: dashboard,
        name: ' dashboard'
    },
    {
        path: '/developer',
        component: developer,
        name: ' developer'
    },
    {
        path: '/profile',
        component: profile,
        name: ' profile'
    },
    {
        path: '/Users',
        component: Users,
        name: ' Users'
    },
    {
        path: '*',
        component: NotFound,
        name: ' NotFound'
    },
]


export default new Router({
    mode: 'history',
    routes
})