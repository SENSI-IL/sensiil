<template>
  <div class="flex h-screen bg-stone-50">
    <!-- Mobile Sidebar Toggle -->
    <button 
      @click="isSidebarOpen = !isSidebarOpen"
      class="md:hidden fixed bottom-4 left-4 z-50 p-3 rounded-full bg-stone-800 text-amber-100 shadow-lg"
    >
      <Icon :name="isSidebarOpen ? 'mdi:close' : 'mdi:menu'" class="text-xl" />
    </button>

    <!-- Sidebar -->
    <aside 
      class="fixed md:relative w-64 h-full bg-gradient-to-b from-stone-800 to-stone-900 text-stone-100 shadow-xl transition-all duration-300 z-40"
      :class="{
        '-translate-x-full': !isSidebarOpen,
        'translate-x-0': isSidebarOpen
      }"
    >
      <div class="p-6 h-full flex flex-col">
        <div class="flex items-center space-x-3 mb-8">
          <div class="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center">
            <span class="text-xl font-bold text-amber-100">AU</span>
          </div>
          <div>
            <h2 class="text-xl font-bold text-amber-50">Admin Panel</h2>
            <p class="text-xs text-stone-400">Hello, {{ user.name }}</p>
          </div>
        </div>

        <nav class="space-y-1 flex-1 overflow-y-auto">
          <NuxtLink 
            v-for="link in adminLinks" 
            :key="link.to" 
            :to="link.to"
            class="flex items-center p-3 rounded-lg transition-all hover:bg-stone-700 hover:text-amber-100"
            active-class="bg-stone-700 text-amber-100 shadow-inner"
            @click="isSidebarOpen = false"
          >
            <Icon :name="link.icon" class="mr-3 text-lg text-amber-200" />
            <span>{{ link.label }}</span>
            <span v-if="link.badge" class="ml-auto bg-amber-600 text-xs px-2 py-1 rounded-full text-white">
              {{ link.badge }}
            </span>
          </NuxtLink>
        </nav>

        <div class="pt-4 border-t border-stone-700">
          <button 
            @click="logout"
            class="flex items-center w-full p-2 text-stone-300 hover:text-amber-100 rounded-lg hover:bg-stone-700 transition-colors"
          >
            <Icon name="material-symbols:logout" class="mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden transition-all duration-300"
         :class="{
           'ml-0': !isSidebarOpen,
           'ml-64': isSidebarOpen
         }">
      <!-- Top Bar -->
      <header class="bg-stone-100 border-b border-stone-200 shadow-sm z-10">
        <div class="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
          <div class="flex items-center">
            <button 
              @click="isSidebarOpen = !isSidebarOpen"
              class="mr-2 p-2 rounded-full hover:bg-stone-200 md:hidden"
            >
              <Icon name="mdi:menu" class="text-stone-600" />
            </button>
            <h1 class="text-lg md:text-xl font-semibold text-stone-800">
              {{ currentPageTitle }}
            </h1>
          </div>
          
          <div class="flex items-center space-x-3 md:space-x-4">
            <button class="p-2 rounded-full hover:bg-stone-200 relative">
              <Icon name="material-symbols:notifications" class="text-stone-600 text-xl" />
              <span v-if="user.notifications" class="absolute top-1 right-1 w-2 h-2 bg-amber-600 rounded-full"></span>
            </button>
            <div class="relative">
              <button @click="toggleUserDropdown" class="flex items-center space-x-2">
                <div class="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center border border-stone-300">
                  <span class="text-sm font-medium text-stone-700">{{ userInitials }}</span>
                </div>
                <Icon name="mdi:chevron-down" class="hidden md:block text-stone-500" />
              </button>
              <div v-if="showUserDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-stone-200">
                <a href="#" class="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100">Your Profile</a>
                <a href="#" class="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100">Settings</a>
                <div class="border-t border-stone-200"></div>
                <a href="#" @click="logout" class="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100">Sign out</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-stone-50">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const user = ref({
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  notifications: 3
})

const isSidebarOpen = ref(false)
const showUserDropdown = ref(false)
const route = useRoute()

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: 'material-symbols:dashboard' },
  { to: '/admin/users', label: 'Users', icon: 'mdi:users', badge: '12' },
  { to: '/admin/roles', label: 'Roles', icon: 'mdi:shield-account' },
  { to: '/admin/portfolios', label: 'Portfolios', icon: 'mdi:image-multiple' },
  { to: '/admin/jobs', label: 'Jobs', icon: 'mdi:briefcase', badge: '5' },
  { to: '/admin/feedback', label: 'Feedback', icon: 'mdi:message-text' },
  { to: '/admin/payments', label: 'Payments', icon: 'mdi:cash-multiple' },
  { to: '/admin/analytics', label: 'Analytics', icon: 'mdi:chart-line' },
  { to: '/admin/settings', label: 'Settings', icon: 'mdi:cog' }
]

const currentPageTitle = computed(() => {
  const currentLink = adminLinks.find(link => link.to === route.path)
  return currentLink ? currentLink.label : 'Admin Panel'
})

const userInitials = computed(() => {
  return user.value.name.split(' ').map(n => n[0]).join('').toUpperCase()
})

const toggleUserDropdown = () => {
  showUserDropdown.value = !showUserDropdown.value
}

const logout = () => {
  navigateTo('/login')
}

// Auto-close sidebar when navigating on mobile
watch(route, () => {
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false
  }
})

// Close sidebar when clicking outside on mobile
const handleClickOutside = (event) => {
  const sidebar = document.querySelector('aside')
  const toggleButton = document.querySelector('.mobile-toggle-button')
  
  if (isSidebarOpen.value && 
      !sidebar.contains(event.target) && 
      !toggleButton.contains(event.target)) {
    isSidebarOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})

if (user.value.role !== 'admin') {
  navigateTo('/')
}
</script>

<style scoped>
.router-link-active {
  background-color: rgb(68 64 60);
  color: rgb(254 243 199);
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.1);
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Smooth transitions for sidebar */
aside {
  transform: translateX(0);
}

@media (max-width: 767px) {
  aside {
    transform: translateX(-100%);
  }
}
</style>