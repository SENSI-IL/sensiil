<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <!-- Form Header -->
          <div class="px-6 py-5 border-b border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900">Complete Your Profile</h2>
            <p class="mt-1 text-sm text-gray-500">Set up your comic artist profile</p>
          </div>
  
          <!-- Profile Form -->
          <form class="divide-y divide-gray-200" @submit.prevent="handleSubmit">
            <!-- Profile Picture Section (Now First) -->
            <div class="px-6 py-5">
              <h3 class="text-lg font-medium text-gray-900">Profile Picture</h3>
              <div class="mt-4 flex items-center">
                <div class="relative group">
                  <div class="w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                    <img v-if="profileImagePreview" :src="profileImagePreview" class="w-full h-full object-cover" alt="Profile preview" />
                    <div v-else class="text-gray-400">
                      <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label class="cursor-pointer bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs">
                      Change
                      <input type="file" @change="handleProfileImageChange" class="hidden" accept="image/*" />
                    </label>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm text-gray-500">Recommended: 400×400 pixels</p>
                  <p class="text-sm text-gray-500">JPG, PNG, or GIF (Max 5MB)</p>
                  <p class="text-sm text-gray-500">Clear, professional headshot or logo</p>
                </div>
              </div>
            </div>
  
            <!-- Cover Image Section (Now Second) -->
            <div class="px-6 py-5">
              <h3 class="text-lg font-medium text-gray-900">Cover Image</h3>
              <div class="mt-4">
                <div class="relative group">
                  <div class="w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <img v-if="coverImagePreview" :src="coverImagePreview" class="w-full h-full object-cover" alt="Cover preview" />
                    <div v-else class="text-gray-400">
                      <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p class="mt-1 text-sm">Upload cover image</p>
                    </div>
                  </div>
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label class="cursor-pointer bg-black bg-opacity-50 text-white px-4 py-2 rounded-md">
                      Change Cover
                      <input type="file" @change="handleCoverImageChange" class="hidden" accept="image/*" />
                    </label>
                  </div>
                </div>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">Recommended: 1600×400 pixels</p>
                  <p class="text-sm text-gray-500">JPG or PNG (Max 10MB)</p><p class="text-sm text-gray-500">Showcase your artwork or brand</p>
                </div>
              </div>
            </div>
  
            <!-- Basic Info Section -->
            <div class="px-6 py-5">
              <h3 class="text-lg font-medium text-gray-900">Artist Information</h3>
              <div class="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <label for="profession" class="block text-sm font-medium text-gray-700">Professional Title</label>
                  <div class="mt-1">
                    <input
                      v-model="formData.profession"
                      type="text"
                      id="profession"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                      placeholder="e.g. Comic Artist, Illustrator"
                    />
                  </div>
                </div>
  
                <div class="sm:col-span-3">
                  <label for="artStyle" class="block text-sm font-medium text-gray-700">Primary Art Style</label>
                  <div class="mt-1">
                    <select
                      v-model="formData.artStyle"
                      id="artStyle"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                    >
                      <option value="">Select your style</option>
                      <option>Manga</option>
                      <option>Superhero</option>
                      <option>Graphic Novel</option>
                      <option>Webcomic</option>
                      <option>Cartoon</option>
                      <option>Anime</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
  
                <div class="sm:col-span-6">
                  <label for="bio" class="block text-sm font-medium text-gray-700">Artist Bio</label>
                  <div class="mt-1">
                    <textarea
                      v-model="formData.bio"
                      id="bio"
                      rows="4"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                      placeholder="Tell us about your work and artistic approach..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Form Actions -->
            <div class="px-6 py-4 bg-gray-50 text-right">
              <button
                type="button"
                @click="goBack"
                class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Back
              </button>
              <button
                type="submit"
                class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Complete Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // Form data
  const formData = ref({
    profession: '',
    artStyle: '',
    bio: ''
  });
  
  // Image handling
  const profileImage = ref(null);
  const profileImagePreview = ref(null);
  const coverImage = ref(null);
  const coverImagePreview = ref(null);
  
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      profileImage.value = file;
      const reader = new FileReader();reader.onload = (e) => {
        profileImagePreview.value = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      coverImage.value = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        coverImagePreview.value = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async () => {
    try {
      // Create FormData for file uploads
      const form = new FormData();
      
      // Append image files if they exist
      if (profileImage.value) {
        form.append('profileImage', profileImage.value);
      }
      if (coverImage.value) {
        form.append('coverImage', coverImage.value);
      }
      
      // Append other form data
      for (const key in formData.value) {
        form.append(key, formData.value[key]);
      }
      
      // API call would go here
      // await $fetch('/api/artist/profile', {
      //   method: 'POST',
      //   body: form
      // });
      
      // For testing, just navigate to dashboard
      router.push('/profile');
      
    } catch (error) {
      console.error('Profile setup failed:', error);
    }
  };
  
  const goBack = () => {
    router.go(-1);
  };
  </script>
  
  <style scoped>
  /* Custom styles if needed */
  </style>