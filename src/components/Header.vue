<template>
  <header
    class="flex justify-between laptop:flex-col laptop:items-center tablet:px-3 border-b border-slate-200 px-10 py-8"
  >
    <router-link to="/">
      <div class="flex items-center laptop:mb-10 gap-4">
        <img src="/logo.png" alt="Logo" class="w-11" />
        <div>
          <h2 class="font-bold text-xl uppercase">Sneakers</h2>
          <p class="text-slate-400">Shop for the best sneakers</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-10 header_list">
      <li
        @click="emit('openDrawer')"
        class="header_count flex items-center gap-2 cursor-pointer text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} UAH</b>
        <span v-if="cart.length" class="header_count_number">{{ cart.length }}</span>
      </li>
      <router-link to="/favorites">
        <li
          class="header_count flex items-center gap-2 cursor-pointer text-gray-500 hover:text-black"
        >
          <img src="/heart.svg" alt="Favorite" />
          <span>Favorites</span>
          <span v-if="countFavoriteItem" class="header_count_number">{{ countFavoriteItem }}</span>
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
  cart: Array,
  totalPrice: Number,
  countFavoriteItem: Number
})

const emit = defineEmits(['openDrawer'])
</script>

<style lang="scss">
.header_count {
  position: relative;

  &_number {
    position: absolute;
    top: -5px;
    left: -5px;
    width: 17px;
    height: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #efadad;
    color: #fff;
    font-size: 12px;
  }
}

.header_list {
  @media (max-width: 630px) {
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 25px;
  }
}
</style>
