import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Favorites from '../pages/Favorites.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/favorites', name: 'Favorites', component: Favorites }
  ]
})

export default router
