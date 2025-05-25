<template>
  <div class="max-w-6xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-bold text-center mb-8">Explore Job Opportunities</h1>

    <div v-if="jobs.length > 0" class="grid gap-6 md:grid-cols-2">
      <div
        v-for="job in jobs"
        :key="job._id"
        class="bg-white border shadow-sm rounded-lg p-5 hover:shadow-md transition"
      >
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-xl font-semibold text-gray-800">{{ job.title }}</h2>
            <p class="text-sm text-gray-500 mt-1">
              {{ job.type }} • {{ formatDate(job.createdAt) }}
            </p>
            <p class="mt-2 text-gray-700 line-clamp-2">
              {{ job.description }}
            </p>
          </div>

          <NuxtLink
            :to="`/jobs/${job._id}`"
            class="text-blue-600 hover:underline text-sm font-medium mt-2"
          >
            View
          </NuxtLink>
        </div>

        <div class="mt-4 text-sm text-gray-600 flex justify-between">
          <span>Budget: {{ job.budget || 'Not specified' }}</span>
          <span v-if="job.tags?.length">
            {{ job.tags.join(', ') }}
          </span>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 mt-16">
      No jobs are available right now.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const jobs = ref([])

onMounted(async () => {
  try {
    const allJobs = await $fetch('http://localhost:8000/api/jobs') // or use `/api/jobs` if proxied
    jobs.value = allJobs.filter(job =>
      !job.expiresAt || new Date(job.expiresAt) > new Date()
    )
  } catch (error) {
    console.error('Error fetching jobs:', error)
  }
})

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>
