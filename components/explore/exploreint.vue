<template>
  <section class="py-12 bg-gray-300 text-white">
    <!-- Section Title -->
    <h2 class="text-3xl font-bold text-center mb-8 uppercase tracking-widest">
      Explore by Genre & Category
    </h2>

    <!-- Search and Filter Section -->
    <div class="relative w-full max-w-md mx-auto mb-8">
      <input 
        type="text" 
        placeholder="Filter by tags (Action, Romance, History, etc.)" 
        v-model="filterText"
        class="w-full px-10 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m1.65-5.65a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"/>
      </svg>
    </div>

    <!-- Categories Section -->
    <div v-for="(category, index) in filteredCategories" :key="category.name" class="text-center mb-12">
      <h3 class="text-2xl font-semibold mb-4">{{ category.name }}</h3>

      <!-- Comics Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
        <div 
          v-for="(comic, i) in category.comics" 
          :key="comic.title" 
          class="bg-gray-800 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          <img :src="comic.image" :alt="comic.title" class="w-full h-auto rounded-md">
          <p class="mt-2 text-sm text-center">{{ comic.title }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

// Categories and comics data
const categories = [
  {
    name: "Action",
    tags: ["Action", "Adventure", "Thriller"],
    comics: [
      { title: "One Piece", image: "/comics/onepiece.jpg" },
      { title: "Attack on Titan", image: "/comics/aot.jpg" },
      { title: "Demon Slayer", image: "/comics/demonslayer.jpg" },
    ],
  },
  {
    name: "Romance",
    tags: ["Romance", "Drama", "Love"],
    comics: [
      { title: "Your Name", image: "/comics/yourname.jpg" },
      { title: "Toradora", image: "/comics/toradora.jpg" },
      { title: "Fruits Basket", image: "/comics/fruitsbasket.jpg" },
    ],
  },
  {
    name: "History",
    tags: ["History", "Drama", "War"],
    comics: [
      { title: "Kingdom", image: "/comics/kingdom.jpg" },
      { title: "Vinland Saga", image: "/comics/vinland.jpg" },
      { title: "The Rose of Versailles", image: "/comics/roseofversailles.jpg" },
    ],
  },
];

// State for the filter text
const filterText = ref('');

// Computed property to filter categories based on the tag text input
const filteredCategories = computed(() => {
  return categories.filter(category => {
    // Check if any tag in the category matches the filterText
    return category.tags.some(tag => tag.toLowerCase().includes(filterText.value.toLowerCase()));
  });
});
</script>
