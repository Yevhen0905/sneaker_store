<template>
  <div class="flex flex-col items-center text-center mx-auto">
    <img width="100" height="100" :src="imgUrl" alt="" />
    <h3 class="mt-4 text-2xl font-medium">{{ title }}</h3>
    <p class="text-gray-400 mt-2">{{ text }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  imgUrl: String,
  title: String,
  text: String
})
</script>
