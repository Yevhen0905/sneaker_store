<template>
  <!-- <Drawer /> -->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-20">
    <Header />

    <div class="p-10">
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
      <CardList :items="items" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
// import HomePage from './pages/Home.vue'
import Drawer from './components/Drawer.vue'

const items = ref([])
const filters = reactive({
  sortBy: 'name',
  searchQuery: ''
})

const getFetch = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const res = await axios.get('https://657eea2aac18512f.mokky.dev/items', {
      params
    })
    items.value = await res.data
  } catch (e) {
    console.log(e)
  }
}

watch(filters, getFetch)

onMounted(getFetch)
</script>
