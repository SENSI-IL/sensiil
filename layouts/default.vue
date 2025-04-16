<template>
    <div class="bg-gray-950 text-white min-h-screen flex flex-col">
      <Navbar />
      <main class="flex-1">
        <slot />
      </main>
      
    </div>
  </template>
  
  <script setup>
  import Navbar from '@/components/common/Navbar.vue'
//   import Footer from '@/components/Footer.vue'
  </script>
  