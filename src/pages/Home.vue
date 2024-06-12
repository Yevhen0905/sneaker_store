<template>
  <div class="flex justify-between items-center laptop:flex-col laptop:items-start mb-10">
    <h1 class="text-3xl font-bold laptop:mb-5">All sneakers</h1>
    <div class="flex justify-between items-center gap-4 tablet:w-full">
      <select
        v-model="filters.sortBy"
        class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none tablet:w-full"
      >
        <option value="name">By name</option>
        <option value="price">By price (cheap)</option>
        <option value="-price">By price (expensive)</option>
      </select>
      <div class="relative tablet:w-full">
        <input
          v-model="filters.searchQuery"
          type="text"
          class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400 tablet:w-full"
          placeholder="search..."
        />
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none tablet:pl-2"
        >
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
  await getItems()
  await getFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((itemCart) => itemCart.id === item.id)
  }))
})
</script>
