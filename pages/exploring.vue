<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Explore Comics</h1>

    <!-- Search and Filter -->
    <SearchFilterBar @filter="applyFilters" />

    <!-- Loading Spinner -->
    <div v-if="isLoading" class="flex justify-center items-center mt-10">
      <div class="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="text-red-400 text-center mt-6">
      {{ error }}
    </div>

    <!-- Comic Grid -->
    <div v-if="!isLoading && !error" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="comic in filteredComics" :key="comic._id" class="group relative">
        <!-- Comic Card with NuxtLink -->
        <NuxtLink :to="`/comic/${comic._id}`" class="comic-card">
          <img :src="comic.image" alt="Comic Image" class="w-full h-auto object-cover rounded-lg" />
          <p class="comic-title mt-2 text-lg font-semibold">{{ comic.title }}</p>
        </NuxtLink>
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="hasMore && !isLoading && !error" class="text-center mt-8">
      <button @click="loadMore" class="bg-white text-black px-6 py-2 rounded hover:bg-gray-300">
        Load More
      </button>
    </div>

    <!-- No Results -->
    <div v-else-if="!isLoading && filteredComics.length === 0 && !error" class="text-center text-gray-400 mt-8">
      No comics found.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import SearchFilterBar from '@/components/common/SearchFilterBar.vue'

const comics = ref([]) // All comics from backend
const filteredComics = ref([]) // Comics shown after filtering
const hasMore = ref(true)
const isLoading = ref(false)
const error = ref(null)

const applyFilters = (filters) => {
  filteredComics.value = comics.value.filter((comic) => {
    return (!filters.genre || comic.genres.includes(filters.genre)) &&
           (!filters.rating || comic.rating >= filters.rating)
  })
}

const loadMore = () => {
  hasMore.value = false // You can expand this with pagination later
}

const fetchComics = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await axios.get('http://localhost:8000/api/comicretrieve', {
      withCredentials: true
    })
    comics.value = response.data
    filteredComics.value = [...response.data]
  } catch (err) {
    console.error('Error fetching comics:', err)
    error.value = 'Failed to load comics. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchComics()
})
</script>
