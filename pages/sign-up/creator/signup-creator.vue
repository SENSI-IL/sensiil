<template>
  <div class="flex items-center justify-between p-8 bg-gray-100 rounded-lg shadow-lg max-w-7xl mx-auto">
    <!-- Left (Form) -->
    <div class="w-full md:w-1/2 p-8 order-1">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Artist Sign Up</h1>
      </div>

      <!-- Signup Form -->
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <!-- Name Row -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
            <input
              v-model="firstName"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
              placeholder="Firstname"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
            <input
              v-model="lastName"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
              placeholder="Lastname"
            />
          </div>
        </div>

        <!-- Phone Number with Country Code Dropdown -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
          <div class="flex">
            <!-- Country Code Dropdown -->
            <div class="relative w-1/3 mr-2">
              <select 
                v-model="selectedCountry"
                class="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
              >
                <option 
                  v-for="country in countries" 
                  :key="country.code"
                  :value="country"
                >
                  {{ country.flag }} {{ country.name }} ({{ country.code }})
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
            <!-- Phone Number Input -->
            <input
              v-model="phoneNumber"
              type="tel"
              class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
              placeholder="911223344"
            />
          </div>
          <p class="mt-1 text-xs text-gray-500">
            Format: {{ selectedCountry.code }}911223344
          </p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email*</label>
          <input
            v-model="email"
            type="email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
            placeholder="Enter your Email"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password*</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent pr-10 text-black"
              placeholder="Enter strong Password"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
              @click="showPassword = !showPassword"
            >
              <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-400" />
              <EyeSlashIcon v-else class="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <p class="mt-1 text-xs text-gray-500">
            Minimum 8 characters with uppercase, lowercase, and number
          </p>
        </div>

        <!-- Username -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Artist Username*</label>
          <input
            v-model="username"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-black"
            placeholder="your_artist_name"
          />
        </div>

        <!-- Terms -->
        <div class="flex items-center">
          <input
            id="terms"
            v-model="acceptedTerms"
            type="checkbox"
            class="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
          />
          <label for="terms" class="ml-2 block text-sm text-gray-700">
            I agree to the <a href="#" class="text-black hover:underline">Terms and conditions</a>
          </label>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between pt-4">
          <button
            type="button"
            @click="$router.go(-1)"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            class="px-6 py-2 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
          >
            Next
          </button>
        </div>

        <!-- Login Redirect -->
        <p class="text-center text-sm text-gray-600">
          Already have an account? 
          <NuxtLink to="/login" class="text-black font-medium hover:underline">Log in</NuxtLink>
        </p>
      </form>
    </div>

    <!-- Right (Image) -->
    <div class="w-full md:w-1/2 order-2">
      <img 
        src="https://images.unsplash.com/photo-1605165566807-508fb529cf3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80" 
        alt="Artist working" 
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';
import confetti from 'canvas-confetti';

const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const phoneNumber = ref('');
const email = ref('');
const username = ref('');
const password = ref('');
const acceptedTerms = ref(false);
const showPassword = ref(false);

const countries = [{ name: 'Ethiopia', code: '+251', flag: '🇪🇹' }];
const selectedCountry = ref(countries[0]);

const handleSubmit = async () => {
  try {
    const fullPhoneNumber = selectedCountry.value.code + phoneNumber.value;

    // Step 1: Register user
    const response = await $fetch('http://localhost:8000/api/artist/register', {
      method: 'POST',
      body: {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        phoneNumber: fullPhoneNumber,
        email: email.value.trim(),
        userName: username.value.trim(),
        password: password.value,
        acceptedTerms: acceptedTerms.value
      }
    });

    if (response.success) {
      // Step 2: Send 6-digit code
      console.log('User registered. Now sending verification code to:', email.value);
      const verifyResponse = await fetch('http://localhost:8000/api/artist/send-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.value.trim() })
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        throw new Error(`Failed to send verification code: ${verifyData.message || 'Unknown error'}`);
      }

      // Show confetti
      confetti();

      // Navigate to email verification page
      router.push(`/sign-up/creator/email-verification?email=${encodeURIComponent(email.value.trim())}`);
    } else {
      alert(response.message || 'Registration failed');
    }
  } catch (error) {
    alert(error.message || 'An error occurred during registration.');
  }
};
</script>

<style scoped>
/* Add any extra styling if needed */
</style>
