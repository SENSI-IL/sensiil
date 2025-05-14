<template>
  <div class="bg-gray-950 text-white min-h-screen flex flex-col">
    <Navbar />
    
    <main class="flex-1">
      <slot />
    </main>

    <Footer /> <!-- Add footer here -->
  </div>
</template>

<script setup>
import Navbar from '@/components/common/Navbar.vue'
import Footer from '@/components/common/footer.vue' // Uncomment and use it
</script>

  