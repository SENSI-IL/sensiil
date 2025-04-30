<template>
  <div class="min-h-screen bg-gray-900 text-white p-6">
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <span class="text-gray-400 text-lg">Loading...</span>
    </div>

    <div v-else-if="comic" class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold mb-4">{{ comic.title }}</h1>
      <div class="flex gap-6 mb-6">
        <img :src="comic.image" alt="Comic Cover" class="w-32 h-48 object-cover rounded-lg" />
        <div class="flex-1">
          <p class="text-gray-400">Genres: {{ comic.genres.join(", ") }}</p>
          <p class="text-gray-400">Rating: {{ comic.rating }} / 5</p>
          <p class="text-gray-400">{{ comic.description || "No description available." }}</p>
        </div>
      </div>
      <NuxtLink :to="`/read/${comic._id}`" class="bg-white text-black px-6 py-2 rounded hover:bg-gray-300">
        Start Reading
      </NuxtLink>
    </div>

    <div v-else class="flex justify-center items-center h-screen">
      <span class="text-red-400 text-lg">Comic not found.</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const comic = ref(null)
const isLoading = ref(true)

const fetchComic = async () => {
  const id = route.params.id
  try {
    const response = await axios.get(`/api/comics/${id}`)
    comic.value = response.data
    isLoading.value = false
  } catch (error) {
    console.error('Error fetching comic details:', error)
    isLoading.value = false
  }
}

onMounted(() => {
  fetchComic()
})
</script>
