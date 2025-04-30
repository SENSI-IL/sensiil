<template>
  <NuxtLink
    :to="`/comic/${comic.id}`"
    class="block bg-gray-900 rounded-lg shadow-md overflow-hidden hover:scale-105 transition transform duration-300"
  >
    <!-- Cover Image -->
    <img
      :src="comic.image"
      :alt="comic.title"
      class="w-full h-60 object-cover"
    />

    <!-- Comic Info -->
    <div class="p-4 text-white">
      <!-- Title -->
      <h3 class="text-lg font-bold truncate">{{ comic.title }}</h3>

      <!-- Short Description -->
      <p class="text-sm text-gray-400 truncate">{{ comic.description }}</p>

      <!-- Genre Tags -->
      <div class="flex flex-wrap mt-2">
        <span
          v-for="genre in comic.genres"
          :key="genre"
          class="bg-gray-800 text-xs text-gray-300 px-2 py-1 rounded-full mr-2 mb-2"
        >
          {{ genre }}
        </span>
      </div>

      <!-- Rating -->
      <div class="flex items-center mt-3">
        <span v-for="star in 5" :key="star" class="text-yellow-400" v-html="star <= comic.rating ? '★' : '☆'"></span>
        <span class="ml-2 text-gray-400 text-sm">({{ comic.rating }})</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  comic: {
    type: Object,
    required: true
  }
})
</script>
