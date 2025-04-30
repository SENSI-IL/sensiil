<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Explore Comics</h1>

    <!-- Search and Filter -->
    <SearchFilterBar @filter="applyFilters" />

    <!-- Comic Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="comic in filteredComics" :key="comic.id" class="group relative">
        <!-- Comic Card with NuxtLink -->
        <NuxtLink :to="`/comic/${comic._id}`" class="comic-card">
          <img :src="comic.image" alt="Comic Image" class="w-full h-auto object-cover rounded-lg"/>
          <p class="comic-title mt-2 text-lg font-semibold">{{ comic.title }}</p>
        </NuxtLink>
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="hasMore" class="text-center mt-8">
      <button @click="loadMore" class="bg-white text-black px-6 py-2 rounded hover:bg-gray-300">
        Load More
      </button>
    </div>

    <!-- No Results -->
    <div v-else-if="filteredComics.length === 0" class="text-center text-gray-400 mt-8">
      No comics found.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import SearchFilterBar from '@/components/common/SearchFilterBar.vue'
import ComicGrid from '@/components/explore/ComicGrid.vue'

const comics = ref([]) // Store real data
const filteredComics = ref([...comics.value])
const hasMore = ref(true)

const applyFilters = (filters) => {
  filteredComics.value = comics.value.filter((comic) => {
    return (!filters.genre || comic.genres.includes(filters.genre)) &&
           (!filters.rating || comic.rating >= filters.rating)
  })
}

const loadMore = () => {
  // Example for loading more comics (you can expand this later)
  hasMore.value = false // No more comics for now
}

const fetchComics = async () => {
  try {
    const response = await axios.get('/api/comics')
    comics.value = response.data
    filteredComics.value = [...comics.value]
  } catch (error) {
    console.error('Error fetching comics:', error)
  }
}

onMounted(() => {
  fetchComics()
})
</script>
