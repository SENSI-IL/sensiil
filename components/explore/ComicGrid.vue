<template>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      <ComicCard v-for="comic in comics" :key="comic.id" :comic="comic" />
    </div>
  </template>
  
  <script setup>
  import ComicCard from "@/components/common/ComicCard.vue";
  
  defineProps({
    comics: Array,
  });
  </script>
  