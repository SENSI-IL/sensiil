<template>
    <section class="py-12 bg-gray-900 text-white">
      <!-- Section Title -->
      <h2 class="text-3xl font-bold text-center mb-6 uppercase tracking-widest">
        New Released Comic
      </h2>
  
      <!-- Horizontal Scrollable Comics -->
      <div class="overflow-x-auto scrollbar-hide px-6">
        <div class="flex space-x-6">
          <!-- Comic Card (Repeat for each comic) -->
          <div v-for="(comic, index) in comics" :key="index" class="flex-shrink-0 w-40 md:w-56">
            <img :src="comic.image" :alt="comic.title" class="w-full h-auto rounded-lg shadow-lg">
            <p class="mt-2 text-sm text-center">{{ comic.title }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const comics = [
    { title: "One Piece", image: "/images/imagfe.png" },
    { title: "Naruto", image: "/images/imagfe.png" },
    { title: "Attack on Titan", image: "/images/imagfe.png" },
    { title: "Jujutsu Kaisen", image: "/images/imagfe.png" },
    { title: "Demon Slayer", image: "/images/imagfe.png" },
  ];
  </script>
  
  <style>
  /* Hide scrollbar for better UI */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  </style>
  