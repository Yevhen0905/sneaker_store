<template>
  <div
    class="relative flex flex-col w-full border border-slate-150 rounded-xl p-6 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2"
  >
    <div v-if="onClickFavorite" class="absolute">
      <img
        @click="onClickFavorite"
        :src="isFavorite ? 'like-2.svg' : 'like-1.svg'"
        alt="Favorite"
      />
    </div>
    <img :src="img" class="w-full" alt="Sneaker" />
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col gap-2">
        <span class="text-slate-300">Price:</span>
        <span class="font-bold">{{ price }} UAH</span>
      </div>
      <img
        v-if="onClickAdd"
        @click="onClickAdd"
        :src="!isAdded ? 'plus.svg' : 'checked.svg'"
        alt="Plus"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  id: Number,
  img: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function
})
</script>
