<template>
  <div class="flex h-screen overflow-hidden">
    <ArtistSidebar />

    <main class="flex-1 p-4 bg-white transition-all duration-300">
      <h2 class="text-2xl font-bold mb-4">My Profile</h2>

      <!-- Loading & Error State -->
      <div v-if="pending" class="text-gray-500">Loading...</div>
      <div v-else-if="error" class="text-red-500">Error loading profile.</div>

      <!-- Main Profile -->
      <div v-else>
        <div class="flex items-center space-x-4 mb-6">
          <img
            :src="profile.image"
            alt="Profile Image"
            class="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 class="text-xl font-bold">{{ profile.name }}</h2>
            <p class="text-gray-600">{{ profile.bio }}</p>
          </div>
        </div>

        <!-- Art Categories -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold">Art Categories</h3>
          <div class="flex flex-wrap gap-2 mt-2">
            <span
              v-for="(cat, i) in profile.categories"
              :key="i"
              class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
            >
              {{ cat }}
            </span>
          </div>
        </div>

        <!-- Sample Works -->
        <div>
          <h3 class="text-lg font-semibold">Sample Works</h3>
          <ul class="mt-2 space-y-2">
            <li
              v-for="(work, index) in profile.sampleWorks"
              :key="index"
              class="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm"
            >
              <span>{{ work.title }}</span>
              <a
                :href="work.link"
                target="_blank"
                class="text-blue-500 hover:underline"
              >
                View
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import ArtistSidebar from '@/components/ArtistSidebar.vue'

// Load artist profile from backend API
const { data: profile, pending, error } = await useFetch('/api/artist/profile', {
  // Optional: credentials, headers, etc.
  // headers: { Authorization: `Bearer ${token}` }
})
</script>
