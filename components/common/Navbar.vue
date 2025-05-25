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
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  background-color: #030712; /* bg-gray-950 */
  border-bottom: 1px solid #1f2937; /* border-gray-800 */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
}

/* Login Button */
.btn-login {
  background-color: #ffffff; /* bg-white */
  color: #111827; /* text-gray-900 */
  padding: 0.5rem 1rem; /* px-4 py-2 */
  border-radius: 0.5rem; /* rounded-lg */
  font-weight: 500; /* font-medium */
  transition: background-color 0.2s ease; /* transition-colors duration-200 */
}
.btn-login:hover {
  background-color: #f3f4f6; /* hover:bg-gray-100 */
}

/* Sign Up Button (more emphasis) */
.btn-signup {
    background-color: #ffffff; /* bg-white */
    color: #111827; /* text-gray-900 */
  padding: 0.5rem 1rem; /* px-4 py-2 */
  border-radius: 0.5rem; /* rounded-lg */
  font-weight: 500; /* font-medium */
  transition: background-color 0.2s ease; /* transition-colors duration-200 */
}
.btn-signup:hover {
  background-color: #f3f4f6;/* hover:bg-indigo-700 */
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