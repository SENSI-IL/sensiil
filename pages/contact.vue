<template>
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold text-white mb-4">Contact Us</h1>
  
      <p class="text-lg text-gray-300 mb-6">
        Have any questions or want to reach out to us? Fill out the form below and we'll get back to you as soon as possible.
      </p>
  
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="text-sm text-white">Your Name</label>
          <input
            v-model="name"
            type="text"
            id="name"
            class="w-full p-3 mt-1 bg-gray-800 text-white rounded-lg"
            required
          />
        </div>
  
        <div class="mb-4">
          <label for="email" class="text-sm text-white">Your Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full p-3 mt-1 bg-gray-800 text-white rounded-lg"
            required
          />
        </div>
  
        <div class="mb-6">
          <label for="message" class="text-sm text-white">Your Message</label>
          <textarea
            v-model="message"
            id="message"
            rows="6"
            class="w-full p-3 mt-1 bg-gray-800 text-white rounded-lg"
            required
          ></textarea>
        </div>
  
        <button
          type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const name = ref('')
  const email = ref('')
  const message = ref('')
  
  const submitForm = () => {
    // Here, you can handle the form submission logic (e.g., sending an email or saving to a database)
    console.log({ name: name.value, email: email.value, message: message.value })
    alert('Thank you for reaching out! We will get back to you soon.')
  }
  </script>
  
  <style scoped>
  /* Add any custom styles you need */
  </style>
  