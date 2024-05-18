<template>
  <div class="grid grid-cols-4 gap-10">
    <Card
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :img="item.imageUrl"
      is-added="true"
      is-favorite="true"
    />
  </div>
</template>

<script setup>
import Card from './Card.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>
