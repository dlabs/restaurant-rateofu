import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import StaffLogin from '../views/staff/StaffLogin.vue'

import Barman from '../views/staff/Barman.vue'
import Chef from '../views/staff/Chef.vue'
import Waiter from '../views/staff/Waiter.vue'

import Table from '../views/Table.vue'
import Waiting from '../views/Waiting.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/staff',
    name: 'Staff',
    component: StaffLogin
  },
  {
    path: '/table',
    name: 'Table',
    component: Table
  },
  {
    path: '/waiting/:id',
    name: 'Wait for order',
    component: Waiting
  },
  // Staff routes
  {
    path: '/staff/barman',
    name: 'Barman',
    component: Barman
  },
  {
    path: '/staff/chef',
    name: 'Chef',
    component: Chef
  },
  {
    path: '/staff/waiter',
    name: 'Waiter',
    component: Waiter
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
