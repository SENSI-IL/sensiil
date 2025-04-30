<template>
  <div class="bg-gray-800 p-4 rounded-lg mb-6">
    <div class="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
      
      <!-- Search -->
      <input
        v-model="search"
        type="text"
        placeholder="Search comics..."
        class="p-2 rounded bg-gray-700 text-white flex-1"
        @input="emitFilter"
      />

      <!-- Genre -->
      <select v-model="selectedGenre" class="p-2 rounded bg-gray-700 text-white" @change="emitFilter">
        <option value="">All Genres</option>
        <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
      </select>

      <!-- Language -->
      <select v-model="selectedLanguage" class="p-2 rounded bg-gray-700 text-white" @change="emitFilter">
        <option value="">All Languages</option>
        <option value="Amharic">Amharic</option>
        <option value="English">English</option>
      </select>

      <!-- Rating -->
      <select v-model="selectedRating" class="p-2 rounded bg-gray-700 text-white" @change="emitFilter">
        <option value="">All Ratings</option>
        <option value="5">⭐⭐⭐⭐⭐ (5+)</option>
        <option value="4">⭐⭐⭐⭐ (4+)</option>
        <option value="3">⭐⭐⭐ (3+)</option>
      </select>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const search = ref("")
const selectedGenre = ref("")
const selectedLanguage = ref("")
const selectedRating = ref("")

const genres = ["Action", "Romance", "Fantasy", "History", "Adventure", "Mystery"]

const emit = defineEmits(["filter"])

const emitFilter = () => {
  emit("filter", {
    search: search.value,
    genre: selectedGenre.value,
    language: selectedLanguage.value,
    rating: Number(selectedRating.value),
  })
}
</script>
