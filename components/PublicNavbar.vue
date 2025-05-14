<template>
  <header class="navbar-wrapper">
    <div class="navbar-panel">
      <nav class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="text-black font-bold text-xl font-handwritten">Sensi’il</NuxtLink>

        <!-- Desktop Nav -->
        <ul class="hidden md:flex space-x-6 text-black font-medium">
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

        <!-- Mobile toggle -->
        <button @click="isOpen = !isOpen" class="md:hidden text-black">
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
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-fade">
      <div v-if="isOpen" class="md:hidden bg-white border-4 border-black mt-4 mx-4 rounded-xl p-4 font-handwritten">
        <ul class="flex flex-col space-y-4 text-black">
          <li><NuxtLink @click="closeMenu" to="/">Home</NuxtLink></li>
          <li><NuxtLink @click="closeMenu" to="/explore">Explore</NuxtLink></li>
          <li><NuxtLink @click="closeMenu" to="/about">About</NuxtLink></li>
          <li><NuxtLink @click="closeMenu" to="/contact">Contact</NuxtLink></li>
          <li class="border-t pt-4">
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
.navbar-panel {
  filter: contrast(110%) brightness(95%) drop-shadow(2px 2px 0 black);
  border: 4px solid black;
  border-radius: 20px;
}

@import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap');

.font-handwritten {
  font-family: 'Gloria Hallelujah', cursive;
}

.navbar-wrapper {
  @apply w-full flex justify-center pt-8;
}

.navbar-panel {
  @apply bg-white border-4 border-black  rounded-xl px-6 py-3 w-full max-w-5xl ;
  box-shadow: 4px 4px 0 #000;
}


/* Login & Signup Buttons */
.btn-login,
.btn-signup {
  @apply bg-white text-black px-4 py-2 border-2 border-black rounded hover:bg-gray-100 transition font-handwritten;
}

/* Mobile animation */
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
