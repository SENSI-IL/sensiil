<!-- /pages/read/[id].vue -->
<template>
  <div class="min-h-screen bg-black text-white">
    <ReadComicHeader :title="comic?.title" />

    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <span class="text-gray-400 text-lg">Loading...</span>
    </div>

    <div v-else-if="comic" class="flex flex-col items-center py-8">
      <ReadComicContent :pages="comic.pages" />
    </div>

    <div v-else class="flex justify-center items-center h-screen">
      <span class="text-red-400 text-lg">Comic not found.</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import ReadComicHeader from '~/components/ReadComicHeader.vue'
import ReadComicContent from '~/components/ReadComicContent.vue'

// Mock comics data
const comics = [
  {
    id: 1,
    title: "The Journey of Light",
    pages: [
      "public/img/ax.jpg",
      "public/img/j1.jpg",
      "public/img/j2.jpg",
      
    ]
  },
  {
    id: 2,
    title: "Shadows of Axum",
    pages: [
      "public/img/ax.jpg",
      "public/img/j1.jpg",
      "public/img/j2.jpg",
    ]
  }
  // add more mock comics if needed
]

const route = useRoute()
const comic = ref(null)
const isLoading = ref(true)

onMounted(() => {
  const id = parseInt(route.params.id)

  // Simulate fetching
  setTimeout(() => {
    comic.value = comics.find(c => c.id === id)
    isLoading.value = false
  }, 500) // fake loading 0.5s
})
</script>
