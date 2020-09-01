import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import MenuItem from "./components/menu/MenuItem.vue"
import OrderItem from "./components/order/OrderItem.vue"

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.component('menu-item', MenuItem)
Vue.component('order-item', OrderItem)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
