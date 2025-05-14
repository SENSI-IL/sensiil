<template>
    <NuxtLink to="/" class="text-gray-500 hover:text-black flex items-center gap-1">
  <ArrowLeft class="w-4 h-4" />
  Back
</NuxtLink>

  <div class="max-w-4xl mx-auto p-6">
    <div class="bg-white shadow-lg rounded-lg p-8 space-y-6">
      <h2 class="text-3xl font-semibold text-center text-gray-800">Artist Profile Setup</h2>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Profile Image Upload -->
        <div class="space-y-3">
          <label for="profileImage" class="block text-sm font-semibold text-gray-700">Profile Image</label>
          <div class="flex items-center space-x-4">
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              class="mt-2 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              v-on="profileImage"
              @change="handleImageChange"
            />
            <div v-if="profileImage" class="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
              <img :src="profileImage" alt="Profile Image" class="object-cover w-full h-full" />
            </div>
          </div>
          <p class="text-sm text-gray-500 mt-2">Upload a clear image of yourself or your artwork.</p>
        </div>

        <!-- Artist Bio -->
        <div class="space-y-3">
          <label for="bio" class="block text-sm font-semibold text-gray-700">Artist Bio</label>
          <textarea
            id="bio"
            v-model="bio"
            rows="4"
            class="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Tell the world about yourself and your work"
          ></textarea>
          <p v-if="bio.length > 150" class="text-red-600 text-sm mt-2">Bio should be under 150 characters.</p>
        </div>

        <!-- Art Categories -->
        <div class="space-y-3">
          <label class="block text-sm font-semibold text-gray-700">Art Categories</label>
          <div class="space-y-2">
            <div v-for="(category, index) in categories" :key="index" class="flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
                :value="category"
                v-model="selectedCategories"
              />
              <span class="ml-3 text-sm text-gray-600">{{ category }}</span>
            </div>
            <p v-if="selectedCategories.length === 0" class="text-red-600 text-sm mt-2">Please select at least one category.</p>
          </div>
        </div>

        <!-- Social Links (Optional) -->
        <div class="space-y-3">
          <label class="block text-sm font-semibold text-gray-700">Social Links (Optional)</label>
          <div class="space-y-2">
            <input
              type="url"
              v-model="socialLinks.instagram"
              placeholder="Instagram URL"
              class="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="url"
              v-model="socialLinks.twitter"
              placeholder="Twitter URL"
              class="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p class="text-sm text-gray-500">Adding social links will help users connect with you.</p>
        </div>

        <!-- Sample Work Preview -->
        <div class="space-y-3">
          <label class="block text-sm font-semibold text-gray-700">Sample Work</label>
          <div v-if="sampleWork" class="bg-gray-100 p-4 rounded-md">
            <p class="text-gray-600">Preview of your selected sample work:</p>
            <img :src="sampleWork" alt="Sample Work" class="mt-4 max-w-full h-auto rounded-md" />
          </div>
          <p v-else class="text-gray-500 mt-2">No sample work added yet.</p>
        </div>

        <!-- Save / Update Button -->
        <div class="flex justify-center">
          <button
            type="submit"
            :disabled="!isValid"
            class="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold transition duration-300 hover:bg-blue-600 disabled:bg-gray-400"
          >
            Save / Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Data
const profileImage = ref(null)
const bio = ref('')
const selectedCategories = ref([])
const categories = ['Digital Art', 'Painting', 'Photography', 'Illustration', 'Animation']
const socialLinks = ref({
  instagram: '',
  twitter: ''
})
const sampleWork = ref(null)

// Computed property to check if the form is valid
const isValid = computed(() => {
  return bio.value.length <= 150 && selectedCategories.value.length > 0
})

// Handle image change
const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    profileImage.value = URL.createObjectURL(file)
  }
}

// Handle form submission
const handleSubmit = () => {
  if (isValid.value) {
    // Handle profile update logic here (e.g., API call)
    console.log('Form submitted:', { bio: bio.value, categories: selectedCategories.value, socialLinks: socialLinks.value })
  }
}
</script>

<style scoped>
/* Custom styles */
textarea {
  resize: none;
}
input[type="url"] {
  background-color: #f9fafb;
}
</style>
