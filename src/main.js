import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'

import Toasted from 'vue-toasted'
import VueCarousel from 'vue-carousel'
import { AutoCompletePlugin } from '@syncfusion/ej2-vue-dropdowns'

Vue.use(AutoCompletePlugin)
Vue.use(Toasted)
Vue.use(VueCarousel)
Vue.config.productionTip = false

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
