<template>
  <div class="flex h-screen overflow-hidden">
    <ArtistSidebar />

    <main class="flex-1 p-6 bg-gray-50 overflow-y-auto">
      <!-- Header + Post Button -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">My Posted Jobs</h2>
        <NuxtLink to="/dashboard/post-job">
          <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            + Post New Job
          </button>
        </NuxtLink>
      </div>

      <!-- Filter Buttons -->
      <div class="flex gap-4 mb-6">
        <button @click="filter = 'all'" :class="filterBtnClass('all')">All</button>
        <button @click="filter = 'active'" :class="filterBtnClass('active')">Active</button>
        <button @click="filter = 'expired'" :class="filterBtnClass('expired')">Expired</button>
      </div>

      <!-- Job Cards -->
      <div v-if="filteredJobs.length" class="space-y-4">
        <div
          v-for="job in filteredJobs"
          :key="job.id"
          class="bg-white shadow p-4 rounded border hover:shadow-md transition"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-xl font-semibold">{{ job.title }}</h3>
              <p class="text-gray-600 line-clamp-2">{{ job.description }}</p>

              <!-- Status -->
              <p class="mt-2">
                <span :class="jobStatusClass(job.expiresAt)" class="px-2 py-0.5 rounded text-white text-xs">
                  {{ isExpired(job.expiresAt) ? 'Expired' : 'Active' }}
                </span>
              </p>
            </div>

            <!-- Actions -->
            <div class="flex flex-col items-end space-y-2">
              <NuxtLink :to="`/dashboard/jobs/${job.id}`">
                <button class="text-blue-600 hover:underline">View</button>
              </NuxtLink>
              <NuxtLink :to="`/dashboard/jobs/${job.id}/edit`">
                <button class="text-green-600 hover:underline">Edit</button>
              </NuxtLink>
              <button @click="deleteJob(job.id)" class="text-red-600 hover:underline">Delete</button>
              <button
                v-if="isExpired(job.expiresAt)"
                @click="extendJob(job.id)"
                class="text-indigo-600 hover:underline"
              >
                Extend
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-gray-500 text-center mt-10">
        No jobs match this filter.
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ArtistSidebar from '@/components/ArtistSidebar.vue'

const router = useRouter()
const jobs = ref([])
const filter = ref('all')

function isExpired(date) {
  return new Date(date) < new Date()
}

function jobStatusClass(date) {
  return isExpired(date) ? 'bg-red-500' : 'bg-green-500'
}

function filterBtnClass(name) {
  return filter.value === name
    ? 'bg-blue-600 text-white px-3 py-1 rounded'
    : 'bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300'
}

const filteredJobs = computed(() => {
  if (filter.value === 'all') return jobs.value
  return jobs.value.filter(job =>
    filter.value === 'active'
      ? !isExpired(job.expiresAt)
      : isExpired(job.expiresAt)
  )
})

// Simulated fetch for now (replace with actual API call)
onMounted(async () => {
  jobs.value = await fetchJobs()
})

async function fetchJobs() {
  return [
    {
      id: 1,
      title: 'Children’s Book Illustrator Needed',
      description: 'Looking for an illustrator to bring a 10-page children’s book to life.',
      expiresAt: '2025-05-12T00:00:00Z'
    },
    {
      id: 2,
      title: 'Comic Colorist',
      description: 'Seeking a colorist for a sci-fi comic project. Revenue share.',
      expiresAt: '2024-12-01T00:00:00Z'
    }
  ]
}

function deleteJob(id) {
  jobs.value = jobs.value.filter(j => j.id !== id)
}

function extendJob(id) {
  localStorage.setItem('extendJobId', id)
  router.push('/dashboard/extend-job')
}
</script>
