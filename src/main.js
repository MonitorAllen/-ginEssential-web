import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { Vuelidate } from 'vuelidate'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'

// scss style
import './assets/scss/index.scss'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
Vue.use(Vuex)
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
