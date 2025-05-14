<template>
    <div class="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 class="text-2xl font-bold mb-4">Payment Summary</h2>
  
      <div v-if="job">
        <p class="mb-2"><strong>Job Title:</strong> {{ job.title }}</p>
        <p class="mb-2"><strong>Duration:</strong> {{ job.duration }} days</p>
        <p class="mb-4"><strong>Price:</strong> ${{ pricing[job.duration] }}</p>
  
        <button @click="handlePayment"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Pay ${{ pricing[job.duration] }} and Publish Job
        </button>
      </div>
  
      <div v-else class="text-gray-500">
        No job data found. Please go back and fill the job form.
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const job = ref(null)
  
  const pricing = {
    3: 5,
    7: 10,
    14: 18,
  }
  
  onMounted(() => {
    const stored = localStorage.getItem('jobForm')
    if (stored) {
      job.value = JSON.parse(stored)
    }
  })
  
  async function handlePayment() {
    try {
      // Simulate payment process (replace with Stripe or real logic)
      const response = await $fetch('/api/jobs/create', {
        method: 'POST',
        body: {
          ...job.value,
          amount: pricing[job.value.duration],
          expiresAt: new Date(Date.now() + job.value.duration * 24 * 60 * 60 * 1000),
        }
      })
  
      localStorage.removeItem('jobForm')
      router.push(`/dashboard/jobs/${response.id}`) // Redirect to job detail
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Something went wrong. Try again.')
    }
  }
  </script>
  