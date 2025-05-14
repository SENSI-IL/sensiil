<template>
    <div class="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 class="text-2xl font-bold mb-4">Extend Job Posting</h2>
  
      <div v-if="jobId">
        <label class="block font-semibold mb-2">Select Extension Duration:</label>
        <select v-model="selectedDuration" class="w-full border px-3 py-2 rounded mb-4">
          <option disabled value="">Choose duration</option>
          <option v-for="(price, days) in pricing" :key="days" :value="days">
            Extend by {{ days }} days — ${{ price }}
          </option>
        </select>
  
        <button
          @click="handleExtendPayment"
          :disabled="!selectedDuration"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Pay ${{ pricing[selectedDuration] }} and Extend
        </button>
      </div>
  
      <div v-else class="text-gray-500">
        No job selected for extension.
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const jobId = ref(null)
  
  const pricing = {
    3: 5,
    7: 10,
    14: 18,
  }
  
  const selectedDuration = ref('')
  
  onMounted(() => {
    const id = localStorage.getItem('extendJobId')
    if (id) jobId.value = id
  })
  
  async function handleExtendPayment() {
    try {
      const response = await $fetch(`/api/jobs/${jobId.value}/extend`, {
        method: 'POST',
        body: {
          addedDays: parseInt(selectedDuration.value),
          amount: pricing[selectedDuration.value],
        }
      })
  
      localStorage.removeItem('extendJobId')
      router.push('/dashboard/job-success')
    } catch (err) {
      console.error('Extension failed', err)
      alert('Something went wrong. Try again.')
    }
  }
  </script>
  