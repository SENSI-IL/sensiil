<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div class="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <!-- Logo/App Name -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Reset your password</h1>
          <p class="mt-2 text-sm text-gray-600">
            Enter your email and we'll send you a link to reset your password
          </p>
        </div>
  
        <!-- Forgot Password Form -->
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="your@email.com"
            >
          </div>
  
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-black font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-md"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Send Reset Link</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          </button>
  
          <!-- Success Message -->
          <div v-if="successMessage" class="p-4 bg-green-50 rounded-lg">
            <p class="text-sm text-green-700">{{ successMessage }}</p>
          </div>
  
          <!-- Error Message -->
          <div v-if="errorMessage" class="p-4 bg-red-50 rounded-lg">
            <p class="text-sm text-red-700">{{ errorMessage }}</p>
          </div>
        </form>
  
        <!-- Back to Login Link -->
        <div class="mt-8 text-center text-sm text-gray-500">
          Remember your password?
          <NuxtLink to="/login" class="font-medium text-primary hover:text-primary-dark">Log in here</NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const email = ref('')
  const isLoading = ref(false)
  const successMessage = ref('')
  const errorMessage = ref('')
  
  const handleSubmit = async () => {
    try {
      isLoading.value = true
      errorMessage.value = ''
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real app, you would call your API here:
      // const response = await $fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   body: { email: email.value }
      // })
      
      successMessage.value = Password reset link sent to ${email.value}. Please check your inbox.
      email.value = ''
    } catch (error) {
      errorMessage.value = error.response?.data?.message || 'Failed to send reset link. Please try again.'
    } finally {
      isLoading.value = false
    }
  }
  </script>
  
  <style scoped>
  /* Consistent with login page styles */
  input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
  }
  
  button[type="submit"] {
    box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1), 0 2px 4px -1px rgba(79, 70, 229, 0.06);
  }
  
  button[type="submit"]:hover {
    box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.1), 0 4px 6px -2px rgba(79, 70, 229, 0.05);
  }
  
  button[type="submit"]:disabled {opacity: 0.7;
    cursor: not-allowed;
  }
  </style>