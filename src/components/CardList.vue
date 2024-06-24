<template>
  <div
    v-auto-animate
    class="grid grid-cols-4 laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-5"
  >
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :price="item.price"
      :img="item.imageUrl"
      :is-favorite="item.isFavorite"
      :is-added="item.isAdded"
      :onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
      :onClickAdd="isFavorites ? null : () => emit('addToCart', item)"
    />
  </div>
</template>

<script setup>
import Card from './Card.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  isFavorites: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>
