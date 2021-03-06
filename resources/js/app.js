/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;
import moment from 'moment';
import Form from 'vform';
import Vue from 'vue';

import Gate from "./Gate";
Vue.prototype.$gate = new Gate(window.user);


window.Form = Form;
// import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
Vue.component('pagination', require('laravel-vue-pagination'));
import router from './router'
import Swal from 'sweetalert2'
window.Swal = Swal;

const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
window.toast = toast;
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.filter('upText', function(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
});

Vue.filter('myDate', function(created) {
    return moment(created).format('MMMM Do YYYY');
});

const options = {
    color: '#bffaf3',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
      speed: '0.2s',
      opacity: '0.6s',
      termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
  }
  
  Vue.use(VueProgressBar, options)

  window.Fire =  new Vue();
  
  import passportclients from './components/passport/Clients.vue';
  Vue.component('passport-clients', passportclients);

  import passportauthorizedclients from './components/passport/AuthorizedClients.vue';
  Vue.component('passport-authorized-clients', passportauthorizedclients);

  import passportpersonalaccesstokens from './components/passport/PersonalAccessTokens.vue';
  Vue.component('passport-personal-access-tokens', passportpersonalaccesstokens);

  import NotFound from './components/NotFound.vue';
  Vue.component('not-found', NotFound);

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    data:{
      search: ''
    },
    methods:{
      searchit: _.debounce(() => {
        Fire.$emit('searching');
    },1000),

    
      printme() {
        window.print();
      }
    }
});
