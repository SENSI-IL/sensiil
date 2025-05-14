<template>
    <div class="flex h-screen overflow-hidden">
      <ArtistSidebar />
  
      <main class="flex-1 p-6 bg-white">
        <NuxtLink to="/dashboard/jobs" class="text-blue-600 hover:underline mb-4 block">
          ← Back to Jobs
        </NuxtLink>
  
        <section v-if="job" class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold">{{ job.title }}</h1>
            <p class="text-sm text-gray-500">Posted on {{ job.date }}</p>
          </div>
  
          <div>
            <h2 class="text-lg font-semibold">Description</h2>
            <p class="text-gray-700">{{ job.description }}</p>
          </div>
  
          <div>
            <h2 class="text-lg font-semibold">Tags</h2>
            <div class="flex gap-2 flex-wrap mt-2">
              <span
                v-for="(tag, index) in job.tags"
                :key="index"
                class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
  
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h3 class="text-sm text-gray-500">Budget</h3>
              <p class="text-lg font-medium">{{ job.budget }}</p>
            </div>
  
            <div>
              <h3 class="text-sm text-gray-500">Status</h3>
              <p class="text-lg font-medium capitalize">{{ job.status }}</p>
            </div>
          </div>
  
          <div>
            <NuxtLink
              :to="`/dashboard/jobs/${job.id}/edit`"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Job
            </NuxtLink>
          </div>
        </section>
  
        <div v-else class="text-gray-500">Loading job details...</div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import ArtistSidebar from '@/components/ArtistSidebar.vue'
  
  const route = useRoute()
  const job = ref(null)
  
  onMounted(() => {
    // Fake example data — replace this with real backend fetch later
    job.value = {
      id: route.params.id,
      title: 'Looking for Illustrator for Children’s Storybook',
      description:
        'I need an illustrator to design 10 colorful pages for a children’s book. Style: playful and cute.',
      tags: ['children book', 'illustration', 'colorful'],
      budget: '$150 - $300',
      status: 'open',
      date: 'May 8, 2025',
    }
  })
  </script>
  