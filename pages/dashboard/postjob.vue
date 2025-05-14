<template>
    <div class="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Post a Job</h2>
      
      <form @submit.prevent="handleProceedToPayment">
        <div class="mb-4">
          <label class="block font-semibold mb-1">Job Title</label>
          <input v-model="form.title" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
  
        <div class="mb-4">
          <label class="block font-semibold mb-1">Description</label>
          <textarea v-model="form.description" class="w-full border rounded px-3 py-2" rows="5" required></textarea>
        </div>
  
        <div class="mb-4">
          <label class="block font-semibold mb-1">Budget (optional)</label>
          <input v-model="form.budget" type="number" class="w-full border rounded px-3 py-2" />
        </div>
  
        <div class="mb-4">
          <label class="block font-semibold mb-1">Job Duration (on platform)</label>
          <select v-model="form.duration" class="w-full border rounded px-3 py-2" required>
            <option disabled value="">Select duration</option>
            <option v-for="(price, days) in pricing" :key="days" :value="days">
              {{ days }} days — ${{ price }}
            </option>
          </select>
        </div>
  
        <div class="mt-6">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Proceed to Payment (${{ pricing[form.duration] || 0 }})
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { reactive } from 'vue'
  
  const router = useRouter()
  
  const pricing = {
    3: 5,
    7: 10,
    14: 18,
  }
  
  const form = reactive({
    title: '',
    description: '',
    budget: '',
    duration: '',
  })
  
  function handleProceedToPayment() {
    if (!form.duration) return alert("Please choose duration")
  
    // Save job data temporarily (could use Vuex or localStorage)
    localStorage.setItem('jobForm', JSON.stringify(form))
    router.push('/dashboard/payment')
  }
  </script>
  