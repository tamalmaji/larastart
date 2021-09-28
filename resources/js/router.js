import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import dashboard from './components/dashboard'
import profile from './components/profile'
import Users from './components/Users'
const routes = [
    {
        path: '/dashboard',
        component: dashboard,
        name: ' dashboard'
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
]


export default new Router({
    mode: 'history',
    routes
})