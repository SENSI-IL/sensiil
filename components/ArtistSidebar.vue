
<template>
    <div>
      <!-- Burger Button -->
      <button @click="toggleSidebar" class="p-2 fixed top-4 left-4 z-50 bg-white shadow rounded-md sm:hidden">
        <Icon name="lucide:menu" class="w-6 h-6" />
      </button>
  
      <!-- Overlay -->
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden"
        @click="toggleSidebar"
      ></div>
  
      <!-- Sidebar -->
      <aside
        :class="[
          'fixed top-0 left-0 h-full w-64 p-4 bg-gray-100 shadow-md transition-transform z-50',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'sm:translate-x-0 sm:static sm:block'
        ]"
      >
        <nav>
          <ul class="space-y-3">
            <li v-for="item in navItems" :key="item.name">
              <NuxtLink
                :to="item.path"
                class="flex items-center p-2 rounded-lg hover:bg-gray-200"
                :class="{ 'bg-blue-100 text-blue-700': $route.path === item.path }"
              >
                <Icon :name="item.icon" class="mr-2 w-5 h-5" />
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const isOpen = ref(false)
  const toggleSidebar = () => {
    isOpen.value = !isOpen.value
  }
  
  const navItems = [
    { name: 'Edit Profile', icon: 'lucide:edit', path: '/artist/arts/edit' },
    { name: 'Upload Comics', icon: 'lucide:upload', path: '/artist/arts/upload' },
    { name: 'Manage Sales', icon: 'lucide:shopping-cart', path: '/artist/arts/sales' },
    { name: 'Job Searching', icon: 'lucide:briefcase', path: '/artist/arts/jobs' },
  ]
  </script>