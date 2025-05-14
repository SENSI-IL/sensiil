<template>
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Post a Job</h2>
      <form @submit.prevent="submitJob" class="space-y-4">
        <!-- Job Title -->
        <div>
          <label class="block font-medium text-sm text-gray-700">Job Title</label>
          <input v-model="form.title" type="text" placeholder="e.g. Looking for Comic Artist"
            class="mt-1 w-full border border-gray-300 rounded px-3 py-2" required />
        </div>
  
        <!-- Category -->
        <div>
          <label class="block font-medium text-sm text-gray-700">Category</label>
          <select v-model="form.category"
            class="mt-1 w-full border border-gray-300 rounded px-3 py-2 bg-white" required>
            <option value="" disabled>Select Category</option>
            <option>Illustration</option>
            <option>Writing</option>
            <option>Lettering</option>
            <option>Storyboarding</option>
          </select>
        </div>
  
        <!-- Description -->
        <div>
          <label class="block font-medium text-sm text-gray-700">Job Description</label>
          <textarea v-model="form.description" placeholder="Describe the task in detail..."
            rows="5" class="mt-1 w-full border border-gray-300 rounded px-3 py-2" required></textarea>
        </div>
  
        <!-- Budget and Timeline -->
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <label class="block font-medium text-sm text-gray-700">Budget (birr)</label>
            <input v-model="form.budget" type="number" class="mt-1 w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div class="flex-1">
            <label class="block font-medium text-sm text-gray-700">Timeline</label>
            <input v-model="form.timeline" type="text" placeholder="e.g. 3 weeks"
              class="mt-1 w-full border border-gray-300 rounded px-3 py-2" />
          </div>
        </div>
  
        <!-- Contact Info -->
        <div>
          <label class="block font-medium text-sm text-gray-700">Preferred Contact Method</label>
          <select v-model="form.contactType"
            class="mt-1 w-full border border-gray-300 rounded px-3 py-2 bg-white" required>
            <option>Email</option>
            <option>Telegram</option>
            <option>Phone</option>
          </select>
        </div>
        <div>
          <label class="block font-medium text-sm text-gray-700">Contact Info</label>
          <input v-model="form.contactValue" type="text" placeholder="e.g. @username or email"
            class="mt-1 w-full border border-gray-300 rounded px-3 py-2" required />
        </div>
  
        <!-- Submit Button -->
        
              <NuxtLink :to="`/dashboard/payment`">
        <button type="submit"
          class="w-full hover:bg-black text-white py-2 rounded bg-gray-700 transition">
          Post Job
        </button>
      </NuxtLink>
      </form>
    </div>
  </template>
  
  <script setup>
  const form = reactive({
    title: '',
    category: '',
    description: '',
    budget: '',
    timeline: '',
    contactType: '',
    contactValue: ''
  })
  
  function submitJob() {
    console.log('Form submitted:', form)
    // You will connect this with the backend later
    alert('Job posted successfully!')
  }
  </script>
  