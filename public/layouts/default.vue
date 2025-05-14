<template>
    <div class="bg-[#1a1a1a] min-h-screen flex flex-col">
      <PublicNavbar />
      <main class="flex-1">
        <slot />
      </main>
      
    </div>run dev
  </template>
  
  <script setup>
  import Navbar from '~/components/PublicNavbar.vue'
//   import Footer from '@/components/Footer.vue'
  </script>
  