<template>
  <div class="fixed z-10 top-0 h-full w-full bg-black opacity-70" />
  <div
    class="flex flex-col justify-between fixed h-full z-20 top-0 h-full right-0 w-96 tablet:w-80 bg-white px-10 py-7"
  >
    <DrawerHead />

    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="Корзина порожня"
        text="Додати товар"
        imgUrl="/package-icon.png"
      />
      <InfoBlock
        v-if="orderId"
        title="Замовлення оформлено"
        :text="`Ваше замовлення №${orderId}`"
        imgUrl="/order-success-icon.png"
      />
    </div>

    <div v-else class="flex flex-col flex-1 justify-between">
      <CartItemList />

      <div class="flex flex-col gap-5">
        <div class="flex items-end gap-2">
          <span>Загалом:</span>
          <div class="flex-1 border-b border-dashed" />
          <span class="font-bold">{{ totalPrice }} грн.</span>
        </div>

        <div class="flex items-end gap-2">
          <span>податок 5%:</span>
          <div class="flex-1 border-b border-dashed" />
          <span class="font-bold">{{ vatPrice }} грн.</span>
        </div>

        <button
          @click="createOrder"
          :disabled="cartButtonDisabled"
          class="disabled:bg-slate-300 flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600 cursor-pointer"
        >
          Оформити замовлення
          <img src="/arrow-next.svg" alt="Arrow" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed, inject } from 'vue'

import CartItemList from './CartItemList.vue'
import DrawerHead from './DrawerHead.vue'
import InfoBlock from './InfoBlock.vue'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const isCreating = ref(false)
const orderId = ref(null)

const { cart } = inject('cart')

const cartIsEmpty = computed(() => cart.value.length === 0)

const cartButtonDisabled = computed(() => isCreating.value || cartIsEmpty.value)

const createOrder = async () => {
  try {
    isCreating.value = true

    const { data } = await axios.post('https://657eea2aac18512f.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice
    })

    cart.value = []
    orderId.value = data.id
  } catch (e) {
    console.log(e)
  } finally {
    isCreating.value = false
  }
}
</script>
