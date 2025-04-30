<template>
  <header class="navbar">
    <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="text-white font-bold text-xl">Sensi’il</NuxtLink>

      <!-- Desktop Nav -->
      <ul class="hidden md:flex space-x-6 text-white font-medium">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/explore">Explore</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/contact">Contact</NuxtLink></li>
      </ul>

      <!-- Right-side buttons -->
      <div class="hidden md:flex space-x-4">
        <NuxtLink to="/auth/login" class="btn-login">Login</NuxtLink>
        <NuxtLink to="/auth/signup" class="btn-signup">Sign Up</NuxtLink>
      </div>

      <!-- Mobile menu toggle -->
      <button @click="isOpen = !isOpen" class="md:hidden text-white">
        <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <transition name="slide-fade">
      <div v-if="isOpen" class="md:hidden bg-gray-900 border-t border-gray-700">
        <ul class="flex flex-col px-4 py-4 space-y-4 text-white">
          <li><NuxtLink @click="closeMenu" to="/">Home</NuxtLink></li>
          <li><NuxtLink @click="closeMenu" to="/exploring">Explore</NuxtLink></li>
          <li><NuxtLink @click="closeMenu" to="/about">About</NuxtLink></li>
          <li><NuxtLink @click="closeMenu" to="/contact">Contact</NuxtLink></li>
          <li class="border-t border-gray-700 pt-4">
            <NuxtLink @click="closeMenu" to="/auth/login" class="btn-login">Login</NuxtLink>
          </li>
          <li>
            <NuxtLink @click="closeMenu" to="/auth/signup" class="btn-signup">Sign Up</NuxtLink>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
const closeMenu = () => { isOpen.value = false}
   
</script>

<style scoped>
/* Navbar base */
.navbar {
  @apply fixed top-0 w-full z-50 bg-gray-950 border-b border-gray-800 shadow-md;
}

/* Login Button */
.btn-login {
  @apply bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition duration-200;
}

/* Sign Up Button - stronger color */
.btn-signup {
  @apply bg-white text-black px-4 py-2 rounded hover:bg-gray-500 transition duration-200;
}

/* Mobile menu animation */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
