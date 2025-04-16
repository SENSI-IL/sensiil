<template>
    <div class="border rounded-lg overflow-hidden shadow-lg">
      <img :src="portfolio.image" :alt="portfolio.name" class="w-full h-48 object-cover" />
      <div class="p-4">
        <h3 class="text-lg font-bold">{{ portfolio.name }}</h3>
        <p>{{ portfolio.category }}</p>
        <nuxt-link :to="`/portfolio/${portfolio.id}`" class="text-blue-500">View Profile</nuxt-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      portfolio: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  