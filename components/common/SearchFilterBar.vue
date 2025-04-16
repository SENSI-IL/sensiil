<template>
  <div class="bg-gray-900 p-6 rounded-lg shadow-lg">
    <!-- Search Input -->
    <div class="mb-6">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search comics by title, author, or keyword..."
        class="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Genre Filter -->
      <div>
        <label class="block text-white mb-2">Genre</label>
        <select v-model="selectedGenre" class="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">All Genres</option>
          <option v-for="genre in genres" :key="genre" :value="genre">
            {{ genre }}
          </option>
        </select>
      </div>

      <!-- Release Year Filter -->
      <div>
        <label class="block text-white mb-2">Release Year</label>
        <select v-model="selectedYear" class="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">All Years</option>
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>

      <!-- Language Filter -->
      <div>
        <label class="block text-white mb-2">Language</label>
        <select v-model="selectedLanguage" class="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">All Languages</option>
          <option v-for="language in languages" :key="language" :value="language">
            {{ language }}
          </option>
        </select>
      </div>

      <!-- Rating Filter -->
      <div>
        <label class="block text-white mb-2">Rating</label>
        <select v-model="selectedRating" class="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">All Ratings</option>
          <option v-for="rating in ratings" :key="rating" :value="rating">
            {{ rating }} Stars & Up
          </option>
        </select>
      </div>
    </div>

    <!-- Apply Filters Button -->
    <div class="mt-8 text-center">
      <button
        @click="applyFilters"
        class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Apply Filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchQuery = ref("");
const selectedGenre = ref("");
const selectedYear = ref("");
const selectedLanguage = ref("");
const selectedRating = ref("");

const genres = ["Action", "Romance", "Horror", "Fantasy", "Sci-Fi", "Comedy"];
const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
const languages = ["English", "Amharic", "French", "Spanish"];
const ratings = [5, 4, 3, 2, 1];

const applyFilters = () => {
  // Implement the logic to apply filters and update the comic list
  console.log({
    searchQuery: searchQuery.value,
    selectedGenre: selectedGenre.value,
    selectedYear: selectedYear.value,
    selectedLanguage: selectedLanguage.value,
    selectedRating: selectedRating.value,
  });
};
</script>
