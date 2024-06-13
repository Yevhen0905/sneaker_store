import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Favorites from '../pages/Favorites.vue'
import OrderList from '../pages/OrderList.vue'

const router = createRouter({
  history: createWebHistory('/sneaker_store/'),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/favorites', name: 'Favorites', component: Favorites },
    { path: '/orders', name: 'orders', component: OrderList }
  ]
})

export default router
