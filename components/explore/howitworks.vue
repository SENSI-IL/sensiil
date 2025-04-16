<template>
    <section class="py-12 bg-gray-100 text-gray-800">
      <!-- Section Title -->
      <h2 class="text-3xl font-bold text-center mb-8 uppercase tracking-widest">
        How It Works
      </h2>
  
      <!-- Steps -->
      <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Step 1: Sign Up -->
        <div class="text-center p-6 bg-white rounded-lg shadow-lg">
          <svg class="w-16 h-16 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 16v4H8v-4M8 8V4h8v4M12 12h0M4 8v8M12 12h0" />
          </svg>
          <h3 class="text-2xl font-semibold mt-4">Sign Up</h3>
          <p class="text-sm mt-2 text-gray-600">Choose your role: Artist, Client, or Reader. Create an account to access exclusive features.</p>
        </div>
  
        <!-- Step 2: Select Role -->
        <div class="text-center p-6 bg-white rounded-lg shadow-lg">
          <svg class="w-16 h-16 mx-auto text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4v12l8-6-8-6z" />
          </svg>
          <h3 class="text-2xl font-semibold mt-4">Select Your Role</h3>
          <p class="text-sm mt-2 text-gray-600">Artists can post their work, clients can post job descriptions, and readers can enjoy comics!</p>
        </div>
  
        <!-- Step 3: Dashboard -->
        <div class="text-center p-6 bg-white rounded-lg shadow-lg">
          <svg class="w-16 h-16 mx-auto text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
          <h3 class="text-2xl font-semibold mt-4">Create & Collaborate</h3>
          <p class="text-sm mt-2 text-gray-600">Artists can upload comics, clients can post job descriptions, and readers can explore artwork.</p>
        </div>
      </div>
    </section>
  
    <!-- Artist Dashboard: Post Comic -->
    <section v-if="isArtist" class="py-12 bg-gray-100 text-gray-800">
      <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-2xl font-semibold text-center mb-4">Post Your Comic</h3>
        <form @submit.prevent="postComic">
          <div class="mb-4">
            <input v-model="comicTitle" type="text" placeholder="Comic Title" class="w-full px-4 py-2 rounded-lg border border-gray-300" />
          </div>
          <div class="mb-4">
            <textarea v-model="comicDescription" placeholder="Describe your comic..." class="w-full px-4 py-2 rounded-lg border border-gray-300"></textarea>
          </div>
          <div class="mb-4">
            <input type="file" @change="handleFileUpload" class="w-full py-2 px-4 rounded-lg border border-gray-300" />
          </div>
          <div class="text-center">
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg">Post Comic</button>
          </div>
        </form>
      </div>
    </section>
  
    <!-- Client Dashboard: Post Job -->
    <section v-if="isClient" class="py-12 bg-gray-100 text-gray-800">
      <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-2xl font-semibold text-center mb-4">Post a Job Opportunity</h3>
        <form @submit.prevent="postJob">
          <div class="mb-4">
            <input v-model="jobTitle" type="text" placeholder="Job Title" class="w-full px-4 py-2 rounded-lg border border-gray-300" />
          </div>
          <div class="mb-4">
            <textarea v-model="jobDescription" placeholder="Job Description" class="w-full px-4 py-2 rounded-lg border border-gray-300"></textarea>
          </div>
          <div class="text-center">
            <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded-lg">Post Job</button>
          </div>
        </form>
      </div>
    </section>
  
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isArtist = ref(false);  // Example: Use actual logic to check user role
  const isClient = ref(false);  // Example: Use actual logic to check user role
  
  // Artist post form data
  const comicTitle = ref('');
  const comicDescription = ref('');
  const comicImage = ref(null);
  
  // Client post form data
  const jobTitle = ref('');
  const jobDescription = ref('');
  
  // Handle file upload for comics
  const handleFileUpload = (event) => {
    comicImage.value = event.target.files[0];
  };
  
  // Artist post comic
  const postComic = () => {
    if (comicTitle.value && comicDescription.value && comicImage.value) {
      // Handle the posting logic (e.g., send data to the backend)
      console.log('Comic Posted:', comicTitle.value, comicDescription.value, comicImage.value);
    } else {
      console.log('Please fill in all fields');
    }
  };
  
  // Client post job
  const postJob = () => {
    if (jobTitle.value && jobDescription.value) {
      // Handle the posting logic (e.g., send data to the backend)
      console.log('Job Posted:', jobTitle.value, jobDescription.value);
    } else {
      console.log('Please fill in all fields');
    }
  };
  </script>
  