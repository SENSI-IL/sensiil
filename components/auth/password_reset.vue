<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div class="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <!-- Logo/App Name -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Set a new password</h1>
        </div>
  
        <!-- Reset Password Form -->
        <form class="space-y-6" @submit.prevent="handleReset">
          <!-- Password Field with Toggle -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-10"
                placeholder="••••••••"
              >
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="showPassword = !showPassword"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-400" />
                <EyeSlashIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
  
          <!-- Confirm Password Field -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="••••••••"
            >
          </div>
  
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-black font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-md":disabled="isLoading  form.password !== form.confirmPassword"
          >
            <span v-if="!isLoading">Reset Password</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Resetting...
            </span>
          </button>
  
          <!-- Password Mismatch Warning -->
          <div v-if="form.password && form.confirmPassword && form.password !== form.confirmPassword" class="p-3 bg-yellow-50 rounded-lg">
            <p class="text-sm text-yellow-700">Passwords don't match</p>
          </div>
  
          <!-- Success Message -->
          <div v-if="successMessage" class="p-4 bg-green-50 rounded-lg">
            <p class="text-sm text-green-700">{{ successMessage }}</p>
            <NuxtLink to="/login" class="mt-2 inline-block text-sm font-medium text-green-700 hover:text-green-800">
              Return to login
            </NuxtLink>
          </div>
  
          <!-- Error Message -->
          <div v-if="errorMessage" class="p-4 bg-red-50 rounded-lg">
            <p class="text-sm text-red-700">{{ errorMessage }}</p>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
  
  const form = ref({
    password: '',
    confirmPassword: ''
  })
  
  const showPassword = ref(false)
  const isLoading = ref(false)
  const successMessage = ref('')
  const errorMessage = ref('')
  
  // In a real app, you would extract the token from the URL
  // const route = useRoute()
  // const token = route.query.token
  
  const handleReset = async () => {
    try {
      isLoading.value = true
      errorMessage.value = ''
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real app:
      // const response = await $fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   body: {
      //     token: token,
      //     password: form.value.password
      //   }
      // })
      
      successMessage.value = 'Your password has been reset successfully!'
      form.value.password = ''
      form.value.confirmPassword = ''
    } catch (error) {
      errorMessage.value = error.response?.data?.message  'Failed to reset password. The link may have expired.'
    } finally {
      isLoading.value = false
    }
  }
  </script>
  
  <style scoped>
  /* Consistent styling with other pages */
  input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  }
  
  button[type="submit"] {
    box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1), 0 2px 4px -1px rgba(79, 70, 229, 0.06);
  }
  
  button[type="submit"]:hover:not(:disabled) {
    box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.1), 0 4px 6px -2px rgba(79, 70, 229, 0.05);
  }
  
  button[type="submit"]:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  </style>