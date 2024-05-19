<template>
  <div>
    <div v-if="favorites.length">
      <h1 class="text-3xl font-bold">Закладки</h1>
      <CardList :items="favorites" is-favorites />
    </div>
    <div v-else class="flex h-full items-center">
      <InfoBlock title="Закладки порожні" imgUrl="/emoji-1.png" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'
import InfoBlock from '../components/InfoBlock.vue'

const favorites = ref([])

const getFavorites = async () => {
  try {
    const { data } = await axios.get('https://657eea2aac18512f.mokky.dev/favorites')
    favorites.value = data.map((obj) => obj.item)
  } catch (e) {
    console.log(e)
  }
}

onMounted(getFavorites)
</script>
