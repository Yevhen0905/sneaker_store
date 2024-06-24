<template>
  <div>
    <div v-if="!favorites.length && !showInfoBlock" class="lds-ripple">
      <div></div>
      <div></div>
    </div>
    <div v-else-if="favorites.length">
      <h1 class="text-3xl font-bold mb-5">Favorites</h1>
      <CardList :items="favorites" is-favorites />
    </div>
    <div v-else class="flex h-full items-center">
      <InfoBlock v-if="showInfoBlock" title="Bookmarks are empty" imgUrl="emoji-1.png" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'
import InfoBlock from '../components/InfoBlock.vue'

const favorites = ref([])
const showInfoBlock = ref(false)

const getFavorites = async () => {
  try {
    const { data } = await axios.get('https://657eea2aac18512f.mokky.dev/favorites')
    favorites.value = data.map((obj) => obj.item)
    setTimeout(() => {
      showInfoBlock.value = true
    }, 300)
  } catch (e) {
    console.log(e)
  }
}

onMounted(getFavorites)
</script>


