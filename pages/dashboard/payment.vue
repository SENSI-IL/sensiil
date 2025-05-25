<template>
  <div class="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-10 text-gray-800">
    <h2 class="text-2xl font-bold mb-4 text-gray-900">Payment Summary</h2>

    <div v-if="job">
      <p class="mb-2"><span class="font-semibold">Job Title:</span> {{ job.title }}</p>
      <p class="mb-2"><span class="font-semibold">Duration:</span> {{ job.duration }} days</p>
      <p class="mb-4"><span class="font-semibold">Price:</span> {{ pricing[job.duration] }} Birr</p>

      <button @click="handlePayment"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
        Pay {{ pricing[job.duration] }} Birr and Publish Job
      </button>
    </div>

    <div v-else class="text-red-600 font-medium">
      No job data found. Please go back and fill the job form.
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const job = ref(null)

const pricing = {
  3: 300,
  7: 500,
  14: 900
}

onMounted(() => {
  const stored = localStorage.getItem('jobForm')
  if (stored) {
    job.value = JSON.parse(stored)
  }
})

async function handlePayment() {
  try {
    const amount = pricing[job.value.duration]

    const response = await $fetch('http://localhost:8000/api/chapa/pay', {
      method: 'POST',
      body: {
        job: {
          ...job.value,
          amount
        }
      }
    })

    window.location.href = response.checkout_url
  } catch (error) {
    console.error('Payment failed:', error)
    alert('Could not start payment. Try again.')
  }
}
</script>

