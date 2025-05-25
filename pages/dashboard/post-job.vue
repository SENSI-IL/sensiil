<template>
  <div class="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
    <h2 class="text-2xl font-bold mb-6 text-gray-900">Post a Job</h2>

    <form @submit.prevent="handleProceedToPayment" class="space-y-5">
      <!-- Job Title -->
      <div>
        <label class="block font-medium text-sm text-gray-900">Job Title</label>
        <input v-model="form.title" type="text" placeholder="e.g. Looking for Comic Artist"
          class="mt-1 w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-500 text-gray-900" required />
      </div>

      <!-- Category -->
      <div>
        <label class="block font-medium text-sm text-gray-900">Category</label>
        <select v-model="form.category"
          class="mt-1 w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900" required>
          <option value="" disabled>Select Category</option>
          <option>Illustration</option>
          <option>Writing</option>
          <option>Lettering</option>
          <option>Storyboarding</option>
        </select>
      </div>

      <!-- Description -->
      <div>
        <label class="block font-medium text-sm text-gray-900">Job Description</label>
        <textarea v-model="form.description" rows="5" placeholder="Describe the task in detail..."
          class="mt-1 w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-500 text-gray-900" required></textarea>
      </div>

      <!-- Budget and Timeline -->
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <label class="block font-medium text-sm text-gray-900">Budget (Birr)</label>
          <input v-model="form.budget" type="number"
            class="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-gray-900" />
        </div>
        <div class="flex-1">
          <label class="block font-medium text-sm text-gray-900">Timeline</label>
          <input v-model="form.timeline" type="text" placeholder="e.g. 3 weeks"
            class="mt-1 w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-500 text-gray-900" />
        </div>
      </div>

      <!-- Contact Info -->
      <div>
        <label class="block font-medium text-sm text-gray-900">Preferred Contact Method</label>
        <select v-model="form.contactType"
          class="mt-1 w-full border border-gray-300 rounded px-3 py-2 bg-white text-gray-900" required>
          <option>Email</option>
          <option>Telegram</option>
          <option>Phone</option>
        </select>
      </div>

      <div>
        <label class="block font-medium text-sm text-gray-900">Contact Info</label>
        <input v-model="form.contactValue" type="text" placeholder="e.g. @username or email"
          class="mt-1 w-full border border-gray-300 rounded px-3 py-2 placeholder-gray-500 text-gray-900" required />
      </div>

      <!-- Duration & Payment -->
      <div>
        <label class="block font-medium text-sm text-gray-900">Job Duration (on platform)</label>
        <select v-model="form.duration" class="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-gray-900" required>
          <option disabled value="">Select duration</option>
          <option v-for="(price, days) in pricing" :key="days" :value="days">
            {{ days }} days — {{ price }} Birr
          </option>
        </select>
      </div>

      <div class="pt-4">
        <button type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
          Proceed to Payment ( {{ pricing[form.duration] || 0 }} Birr )
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const pricing = {
  3: 300,
  7: 500,
  14: 900,
}

const form = reactive({
  title: '',
  category: '',
  description: '',
  budget: '',
  timeline: '',
  contactType: '',
  contactValue: '',
  duration: ''
})

function handleProceedToPayment() {
  if (!form.duration) {
    alert('Please select how long you want the job visible.')
    return
  }

  localStorage.setItem('jobForm', JSON.stringify(form))
  router.push('/dashboard/payment')
}
</script>
