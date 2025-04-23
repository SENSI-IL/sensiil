<template>
  <div class="max-w-6xl mx-auto p-4 sm:p-6">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Main Content -->
      <div class="flex-1 space-y-8">
        <h1 class="text-3xl font-bold text-gray-800">Account Settings</h1>

        <!-- Profile Section -->
        <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-gray-800">Profile Information</h2>
          </div>
          
          <div class="space-y-8">
            <div class="flex items-center gap-6">
              <div class="relative">
                <img :src="user.avatar" class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg">
                <button 
                  @click="$refs.avatarInput.click()"
                  class="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-all transform hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <input 
                  type="file" 
                  ref="avatarInput"
                  class="hidden"
                  @change="updateAvatar"
                  accept="image/*"
                >
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">JPG, GIF or PNG. Max 5MB</p>
                <p class="text-xs text-gray-400">Recommended size: 400×400px</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Name</label>
                <input 
                  v-model="user.name" 
                  type="text" 
                  class="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Email</label>
                <input 
                  v-model="user.email" 
                  type="email" 
                  class="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Bio</label>
              <textarea 
                v-model="user.bio" 
                rows="4"
                class="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Account Security -->
        <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-12 h-12 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-gray-800">Security Settings</h2>
          </div>
          
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Current Password</label>
              <div class="relative">
                <input 
                  type="password" 
                  class="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all pr-12"
                  placeholder="Enter current password"
                >
                <button class="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">New Password</label>
                <div class="relative">
                  <input 
                    type="password" 
                    class="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all pr-12"
                    placeholder="••••••••"
                  >
                  <button class="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Confirm Password</label>
                <div class="relative">
                  <input 
                    type="password" 
                    class="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all pr-12"
                    placeholder="••••••••"
                  >
                  <button class="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Preferences Sidebar -->
      <div class="lg:w-80 space-y-8">
        <!-- Preferences Card -->
        <div class="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-6">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Preferences</h2>
          </div>
          
          <div class="space-y-6">
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="block text-sm font-medium text-gray-700">Dark Mode</label>
                <button 
                  @click="preferences.darkMode = !preferences.darkMode"
                  :class="{'bg-indigo-600': preferences.darkMode, 'bg-gray-200': !preferences.darkMode}"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span 
                    :class="{'translate-x-6': preferences.darkMode, 'translate-x-1': !preferences.darkMode}"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow"
                  />
                </button>
              </div>
              <p class="text-xs text-gray-500">Switch between light and dark theme</p>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <button 
          class="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          Save All Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: 'Alex Ross',
        avatar: 'https://i.imgur.com/JuMq4KX.jpg',
        bio: 'Legendary comic book artist known for his painted style. Eisner and Harvey Award winner for Marvels, Kingdom Come, and Justice Society covers.',
        email: 'alex.ross@example.com'
      },
      preferences: {
        darkMode: false
      }
    }
  },
  methods: {
    updateAvatar(e) {
      const file = e.target.files[0]
      if (file && file.size < 5000000) { // 5MB limit
        const reader = new FileReader()
        reader.onload = (event) => {
          this.user.avatar = event.target.result
        }
        reader.readAsDataURL(file)
      } else {
        alert('Please select an image smaller than 5MB')
      }
    }
  }
}
</script>

<style>
/* Enhanced transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Custom shadow for toggle */
.shadow {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

/* Gradient text for potential future use */
.text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
</style>