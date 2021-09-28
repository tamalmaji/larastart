import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import dashboard from './components/dashboard'
import profile from './components/profile'
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
]


export default new Router({
    mode: 'history',
    routes
})