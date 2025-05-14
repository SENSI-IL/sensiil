<template>
    <div class="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 class="text-2xl font-bold mb-6">Edit Job</h2>
  
      <form @submit.prevent="handleUpdate">
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
  
        <div class="mb-6">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { ref, onMounted } from 'vue'
  
  const route = useRoute()
  const router = useRouter()
  const jobId = route.params.id
  
  const form = ref({
    title: '',
    description: '',
    budget: ''
  })
  
  onMounted(async () => {
    try {
      const job = await $fetch(`/api/jobs/${jobId}`)
      form.value = {
        title: job.title,
        description: job.description,
        budget: job.budget
      }
    } catch (error) {
      console.error('Failed to load job:', error)
    }
  })
  
  async function handleUpdate() {
    try {
      await $fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        body: { ...form.value }
      })
      router.push(`/dashboard/jobs/${jobId}`)
    } catch (error) {
      console.error('Failed to update job:', error)
      alert('Something went wrong. Try again.')
    }
  }
  </script>
  