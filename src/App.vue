<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />
  <div
    class="bg-white w-4/5 laptop:w-auto laptop:mx-5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-20"
  >
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10 tablet:p-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, provide, watch } from 'vue'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const cart = ref([])
const drawerOpen = ref(false)

const totalPrice = computed(() => {
  return cart.value.reduce((acc, curr) => acc + curr.price, 0)
})

const vatPrice = computed(() => {
  return Math.round((totalPrice.value * 5) / 100)
})

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  {
    deep: true
  }
)
</script>
