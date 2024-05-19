<template>
  <div class="flex justify-between items-center mb-10">
    <h1 class="text-3xl font-bold">Всі кросівки</h1>
    <div class="flex items-center gap-4">
      <select
        v-model="filters.sortBy"
        class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none"
      >
        <option value="name">По назві</option>
        <option value="price">По ціні (дешеві)</option>
        <option value="-price">По ціні (дорогі)</option>
      </select>
      <div class="relative">
        <input
          v-model="filters.searchQuery"
          type="text"
          class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
          placeholder="Пошук..."
        />
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <img src="/search.svg" />
        </div>
      </div>
    </div>
  </div>
  <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="addClickToPlus" />
</template>

<script setup>
import { ref, reactive, inject, watch, onMounted } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'

const items = ref([])
const filters = reactive({
  sortBy: 'name',
  searchQuery: ''
})

const { cart, addToCart, removeFromCart } = inject('cart')

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
        item
      }
      item.isFavorite = true

      const { data } = await axios.post('https://657eea2aac18512f.mokky.dev/favorites', obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://657eea2aac18512f.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (e) {
    console.log(e)
  }
}

const getFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://657eea2aac18512f.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (e) {
    console.log(e)
  }
}

const getItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get('https://657eea2aac18512f.mokky.dev/items', {
      params
    })
    items.value = await data.map((obg) => ({
      ...obg,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
    console.log(items.value)
  } catch (e) {
    console.log(e)
  }
}

const addClickToPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

watch(filters, getItems)

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

onMounted(async () => {
  cart.value = JSON.parse(localStorage.getItem('cart')) || []

  await getItems()
  await getFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((itemCart) => itemCart.id === item.id)
  }))
})
</script>