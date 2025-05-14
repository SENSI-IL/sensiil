<template>
    <div class="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <NuxtLink to="/explore-jobs" class="text-blue-600 hover:underline mb-4 block">
        ← Back to Jobs
      </NuxtLink>
  
      <div v-if="job">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ job.title }}</h1>
        <p class="text-sm text-gray-500 mb-4">
          {{ job.type }} • Posted on {{ formatDate(job.createdAt) }}
        </p>
  
        <p class="mb-6 text-gray-700 whitespace-pre-line">{{ job.description }}</p>
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 class="text-sm text-gray-500 mb-1">Budget</h3>
            <p class="text-lg font-medium text-gray-800">{{ job.budget || 'Not specified' }}</p>
          </div>
  
          <div>
            <h3 class="text-sm text-gray-500 mb-1">Contact Method</h3>
            <p class="text-lg text-blue-600 underline">
              <a :href="job.contact" target="_blank">{{ job.contact }}</a>
            </p>
          </div>
        </div>
  
        <!-- Tags -->
        <div v-if="job.tags?.length">
          <h3 class="text-sm text-gray-500 mb-1">Tags</h3>
          <div class="flex flex-wrap gap-2 mt-2">
            <span
              v-for="(tag, index) in job.tags"
              :key="index"
              class="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
  
      <div v-else class="text-center text-gray-500">
        Loading job...
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const job = ref(null)
  
  onMounted(async () => {
    try {
      job.value = await $fetch(`/api/jobs/${route.params.id}`)
    } catch (e) {
      console.error('Error loading job', e)
    }
  })
  
  function formatDate(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  }
  </script>
  