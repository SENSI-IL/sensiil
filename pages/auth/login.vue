<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Welcome back to Sensi'il</h1>
      </div>

      <!-- Login Form -->
      <form class="space-y-6" @submit.prevent="handleLogin">
        <div>
  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
  <input
    id="email"
    v-model="form.email"
    type="email"
    required
    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-gray-900"
    placeholder="your@email.com"
  >
</div>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <NuxtLink to="/auth/forgot_pa" class="text-sm text-indigo-600 hover:text-indigo-800">
              Forgot Password?
            </NuxtLink>
          </div>
          <div class="relative">
    <input
      id="password"
      v-model="form.password"
      :type="showPassword ? 'text' : 'password'"
      required
      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-10 text-gray-900"
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

        <button
          type="submit"
          class="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-black font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-md"
        >
          Log In
        </button>
      </form>

      <!-- OR Divider -->
      <div class="mt-8">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="px-2 bg-white text-sm text-gray-500">Or</span>
          </div>
        </div>

        <!-- Google Login -->
        <div class="mt-6">
          <button
            type="button"
            class="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
            @click="handleGoogleLogin"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              <path d="M1 1h22v22H1z" fill="none"/>
            </svg>
            <span class="ml-2 text-sm font-medium">Continue with Google</span>
          </button>
        </div>
      </div>

      <!-- Signup -->
      <div class="mt-8 text-center text-sm text-gray-500">
        Don't have an account? 
        <NuxtLink to="/signup" class="font-medium text-primary hover:text-primary-dark">Sign Up here</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const showPassword = ref(false)

const handleLogin = async () => {
  try {
    const response = await $fetch('http://localhost:8000/api/explorer',  {
      method: 'POST',
      body: {
        email: form.value.email,
        password: form.value.password
      }
    })
    const { token } = response.data;
        localStorage.setItem('authToken', token);
        this.$router.push('/explore'); // Adjust route if needed
      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.message
          : 'An error occurred';
      } finally {
        this.loading = false;
      }
    }

const handleGoogleLogin = async () => {
  try {
    // Redirect to Google OAuth endpoint
    window.location.href = 'http://localhost:8000/api/auth/google'
  } catch (error) {
    console.error('Google login error:', error)
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

button, input {
  transition: all 0.2s ease;
}

button[type="submit"] {
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1), 0 2px 4px -1px rgba(79, 70, 229, 0.06);
}

button[type="submit"]:hover {
  box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.1), 0 4px 6px -2px rgba(79, 70, 229, 0.05);
}
</style>
