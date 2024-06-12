<template>
  <header
    class="flex justify-between laptop:flex-col laptop:items-center border-b border-slate-200 px-10 py-8"
  >
    <router-link to="/">
      <div class="flex items-center laptop:mb-10 gap-4">
        <img src="/logo.png" alt="Logo" class="w-11" />
        <div>
          <h2 class="font-bold text-xl uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">Shop for the best sneakers</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-10">
      <li
        @click="emit('openDrawer')"
        class="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} UAH</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="Favorite" />
          <span>Favorites</span>
        </li></router-link
      >
      <router-link to="/orders">
        <li class="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-black">
          <img class="w-5" src="/order-success-icon.png" alt="" />
          <span>Placed orders</span>
        </li>
      </router-link>
      <li class="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-black">
        <img src="/profile.svg" alt="Favorite" />
        <span>Profile</span>
      </li>
    </ul>
  </header>
</template>

<script setup>
const props = defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer'])
</script>
