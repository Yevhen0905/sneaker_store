<template>
  <div>
    <h1 class="text-3xl font-bold mb-5">List orders</h1>
    <div
      v-if="orders.length"
      v-auto-animate
      class="grid grid-cols-3 laptop:grid-cols-2 mobile:grid-cols-1 gap-5"
    >
      <div
        class="relative flex flex-col w-full border border-slate-250 rounded-xl p-4 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2"
        v-for="order in orders"
        :key="order.id"
      >
        <div class="relative flex flex-col justify-between h-full">
          <p class="title font-bold text-xl text-center mb-3">Order {{ order.id }}</p>
          <div class="flex flex-col justify-between h-full">
            <div>
              <div
                v-for="product in order.items"
                :key="product.id"
                class="relative flex w-full rounded-xl p-4 gap-4"
              >
                <img :src="product.imageUrl" class="w-16 h-16" :alt="product.title" />
                <div class="flex flex-col w-full">
                  <p class="mb-2">{{ product.title }}</p>
                  <span class="font-bold">price: {{ product.price }} UAH</span>
                </div>
              </div>
            </div>
            <div class="flex justify-between items-center mt-5">
              <p class="font-bold">Total: {{ order.totalPrice }} UAH</p>
              <div class="w-10 h-10">
                <img
                  @click="removeOrder(order)"
                  class="w-full cursor-pointer opacity-40 hover:opacity-100 transition"
                  src="/close.svg"
                  alt="Close"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-xl">Empty</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const orders = ref([])

const getOrders = async () => {
  try {
    const { data } = await axios.get('https://657eea2aac18512f.mokky.dev/orders')
    orders.value = data
    console.log(orders.value)
  } catch (e) {
    console.log()
  }
}

const removeOrder = async (order) => {
  try {
    await axios.delete(`https://657eea2aac18512f.mokky.dev/orders/${order.id}`)
  } catch (e) {
    console.log(e)
  }
  getOrders()
}

onMounted(getOrders)
</script>
