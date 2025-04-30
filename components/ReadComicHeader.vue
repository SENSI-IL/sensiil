<!-- /components/ReadComicHeader.vue -->
<template>
    <header class="w-full sticky top-0 bg-black bg-opacity-90 backdrop-blur-sm flex items-center justify-between px-6 py-4 z-50 border-b border-gray-800">
      <NuxtLink to="/explore" class="text-gray-300 hover:text-white transition">
        ← Back
      </NuxtLink>
      <h1 class="text-lg font-semibold text-white truncate">{{ title }}</h1>
      <div class="w-12"></div> <!-- Empty space for balancing -->
    </header>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      required: true
    }
  })
  </script>
  