<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Navbar with Cart Icon -->
    <nav class="bg-indigo-600 text-white p-4 flex justify-between items-center">
      <h1 class="text-xl font-semibold">Digital Comics Store</h1>
      <div class="relative">
        <NuxtLink to="/cart" class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path d="M6 2L4 6H1v2h3l2 12h12l2-12h3V6h-3L18 2H6z"></path>
            </svg>
            <span class="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1" v-if="cart.length">{{ cart.length }}</span>
          </NuxtLink>

      </div>
    </nav>

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-12 text-center">
      <h1 class="text-4xl font-bold mb-2">Discover & Buy Digital Comics</h1>
      <p class="text-lg">Support your favorite artists. Instant access to awesome stories.</p>
    </section>

    <!-- Filter Section -->
    <div class="container mx-auto px-4 py-6 flex flex-wrap gap-4 justify-center">
      <button
        v-for="category in categories"
        :key="category"
        @click="selectedCategory = category"
        :class="[ 'px-4 py-2 rounded-full font-semibold transition', selectedCategory === category ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100']"
      >
        {{ category }}
      </button>
    </div>

    <!-- Comic Grid Section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="comic in filteredComics"
        :key="comic.id"
        class="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
      >
        <img :src="comic.image" :alt="comic.title" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h2 class="text-lg font-semibold text-gray-800">{{ comic.title }}</h2>
          <p class="text-gray-600 text-sm mt-1">{{ comic.description }}</p>
          <p class="text-indigo-700 font-bold mt-2">{{ comic.price }}</p>
          <div class="flex justify-between items-center mt-4 gap-2">
            <button
              class="bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-500 w-1/2"
              @click="addToCart(comic)"
            >
              Add to Cart
            </button>
            <NuxtLink
              :to="{ path: '/checkout', query: { id: comic.id } }"
              class="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-500 w-1/2 text-center"
            >
              Buy Now
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const categories = ['All', 'Action', 'Romance', 'Fantasy', 'Sci-Fi', 'Comedy']
const selectedCategory = ref('All')

const comics = ref([
  {
    id: 1,
    title: 'Shadow Ninja',
    description: 'A silent warrior battles through the cyber underworld.',
    price: '$4.99',
    image: 'https://cdn.pixabay.com/photo/2020/04/11/10/40/ninja-5029749_1280.jpg'
  },
  {
    id: 2,
    title: 'Alien Days',
    description: 'Life beyond Earth gets... weird.',
    price: '$3.49',
    image: 'https://cdn.pixabay.com/photo/2016/12/06/18/27/ufo-1889569_1280.jpg'
  },
  {
    id: 3,
    title: 'Robot Dreams',
    description: 'Can machines love? This one does.',
    price: '$5.99',
    category: 'Romance',
    image: 'https://cdn.pixabay.com/photo/2019/01/06/17/54/robot-3912583_1280.jpg'
  },
  {
    id: 4,
    title: 'Starlight City',
    description: 'The last light in a post-apocalyptic world.',
    price: '$6.49',
    image: 'https://cdn.pixabay.com/photo/2021/08/11/12/30/city-6537711_1280.jpg'
  }
])

const filteredComics = computed(() => {
  return selectedCategory.value === 'All'
    ? comics.value
    : comics.value.filter((comic) => comic.category === selectedCategory.value)
})

const cart = ref([])

const addToCart = (comic) => {
  if (!cart.value.find((item) => item.id === comic.id)) {
    cart.value.push(comic)
  }
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
