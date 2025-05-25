<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
      <h2 class="text-2xl font-bold text-green-600 mb-2">🎉 Success!</h2>
      <p class="text-gray-700 mb-4">
        Your job has been published successfully.
      </p>
      <NuxtLink to="/explore-jobs">
        <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Go to Explore Jobs
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  const stored = localStorage.getItem('jobForm')

  if (!stored) {
    console.warn('No job data found after payment redirect.')
    return
  }

  let job
  try {
    job = JSON.parse(stored)
  } catch (err) {
    console.error('Failed to parse jobForm from localStorage', err)
    return
  }

  if (!job?.title || !job?.duration) {
    console.warn('Job data is incomplete.')
    return
  }

  const expiresAt = new Date(Date.now() + job.duration * 24 * 60 * 60 * 1000).toISOString()

  try {
    await $fetch('http://localhost:8000/api/jobs', {
      method: 'POST',
      body: {
        title: job.title,
        type: 'Freelance',
        description: job.description,
        tags: [job.category],
        budget: job.budget,
        contact: `${job.contactType}: ${job.contactValue}`,
        expiresAt
      }
    })

    localStorage.removeItem('jobForm') // Clean up
  } catch (err) {
    console.error('Job post failed after payment:', err)
    alert('Payment was successful, but job posting failed. Please contact support.')
    // Optional: router.push('/post-job')
  }
})

</script>

  