<!-- /components/ReadComicContent.vue -->
<template>
    <div class="flex flex-col gap-6 w-full max-w-3xl px-4">
      <div
        v-for="(page, index) in pages"
        :key="index"
        class="overflow-hidden rounded-lg shadow-md"
      >
        <img
          :src="page"
          alt="Comic Page"
          class="w-full object-cover animate-fadeIn"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    pages: {
      type: Array,
      required: true
    }
  })
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fadeIn {
    animation: fadeIn 1s ease-in-out;
  }
  </style>
  