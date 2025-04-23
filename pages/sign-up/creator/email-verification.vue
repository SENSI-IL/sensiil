<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Verify Your Email
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        We've sent a 6-digit verification code to <span class="font-medium">{{ email }}</span>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Verification Form -->
        <form class="space-y-6" @submit.prevent="verifyCode">
          <!-- OTP Input -->
          <div>
            <label for="otp" class="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <div class="mt-1 flex justify-center space-x-4">
              <input
                v-for="(digit, index) in otp"
                :key="index"
                v-model="otp[index]"
                type="text"
                maxlength="1"
                @input="handleOtpInput(index, $event)"
                @keydown.delete="handleOtpDelete(index, $event)"
                class="w-12 h-12 text-2xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                :class="{ 'border-green-500': isVerified }"
              />
            </div>
            <p v-if="error" class="mt-2 text-sm text-red-600">
              {{ error }}
            </p>
            <p class="mt-2 text-sm text-gray-500">
              For testing: Enter any 6 digits
            </p>
          </div>

          <!-- Countdown Timer -->
          <div class="text-center">
            <p v-if="timeLeft > 0" class="text-sm text-gray-500">
              Resend code in {{ minutes }}:{{ seconds.toString().padStart(2, '0') }}
            </p>
            <button
              v-else
              type="button"
              @click="resendCode"
              class="text-sm font-medium text-black hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
              :disabled="isResending"
            >
              {{ isResending ? 'Sending...' : 'Resend Verification Code' }}
            </button>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col space-y-4">
            <!-- Verify Button -->
            <button
              type="submit"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
              :disabled="isVerifying"
            >
              <span v-if="isVerifying">
                Verifying...
              </span>
              <span v-else>
                Verify Email
              </span>
            </button>

            <!-- Always visible Next Button -->
            <button
              type="button"
              @click="goToNextStep"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Continue to Next Step
            </button>
          </div>
        </form>

        <!-- Email Not Correct? -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Email not correct? 
            <button @click="goBack" class="font-medium text-black hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1">
              Go back
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Get email from route query or store
const email = ref('artist@example.com'); // Replace with actual email from signup

// OTP State
const otp = ref(Array(6).fill(''));
const isVerified = ref(false);
const isVerifying = ref(false);
const isResending = ref(false);
const error = ref('');

// Timer State
const timeLeft = ref(120); // 2 minutes
let timer;

// Computed properties for timer display
const minutes = computed(() => Math.floor(timeLeft.value / 60));
const seconds = computed(() => timeLeft.value % 60);

// Handle OTP input
const handleOtpInput = (index, event) => {
  const value = event.target.value;
  
  // Only allow numbers
  if (!/^\d*$/.test(value)) {
    otp.value[index] = '';
    return;
  }

  otp.value[index] = value;
  
  // Auto-focus next input
  if (value && index < 5) {
    document.querySelectorAll('input[type="text"]')[index + 1].focus();
  }
};

// Handle OTP delete
const handleOtpDelete = (index, event) => {
  if (event.key === 'Backspace' && !otp.value[index] && index > 0) {
    document.querySelectorAll('input[type="text"]')[index - 1].focus();
  }
};

// Verify OTP
const verifyCode = async () => {
  isVerifying.value = true;
  error.value = '';
  
  try {
    // Combine OTP digits
    const code = otp.value.join('');
    
    // Basic validation
    if (code.length !== 6) {
      error.value = 'Please enter a 6-digit code';
      isVerifying.value = false;
      return;
    }

    // API call to verify code
    // Replace with your actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock success response
    isVerified.value = true;
    
  } catch (err) {
    error.value = err.response?.data?.message || 'Verification failed. Please try again.';
  } finally {
    isVerifying.value = false;
  }
};

// Navigate to next step
const goToNextStep = () => {
  router.push('/sign-up/creator/setup-profile'); // Update this to your actual next step route
};

// Resend verification code
const resendCode = async () => {
  isResending.value = true;
  
  try {
    // API call to resend code
    // Replace with your actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset timer
    timeLeft.value = 120;
    startTimer();
    
    // Clear OTP
    otp.value = Array(6).fill('');
    document.querySelectorAll('input[type="text"]')[0].focus();
    
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to resend code. Please try again.';
  } finally {
    isResending.value = false;
  }
};

// Start countdown timer
const startTimer = () => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timer);
    }
  }, 1000);
};

// Go back to previous step
const goBack = () => {
  router.go(-1);
};

// Start timer on component mount
onMounted(() => {
  startTimer();
  document.querySelectorAll('input[type="text"]')[0].focus();
});

// Clean up timer
onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style>
/* No need for custom styles since we're using Tailwind utilities */
/* Disabled button styles are handled by Tailwind's disabled:opacity-75 */
</style>