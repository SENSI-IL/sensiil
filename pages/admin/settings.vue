<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-semibold text-stone-800">Platform Settings</h2>
      <button 
        @click="saveSettings"
        class="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-amber-100 px-4 py-2 rounded-lg transition-colors"
        :disabled="isSaving"
      >
        <Icon v-if="isSaving" name="eos-icons:loading" class="text-lg" />
        <Icon v-else name="mdi:content-save" class="text-lg" />
        <span>{{ isSaving ? 'Saving...' : 'Save Changes' }}</span>
      </button>
    </div>

    <!-- General Settings -->
    <div class="bg-white rounded-xl shadow-sm border border-stone-200 p-6 mb-6">
      <div class="flex items-center gap-3 mb-4">
        <Icon name="mdi:cog" class="text-xl text-amber-600" />
        <h3 class="text-xl font-semibold text-stone-800">General Settings</h3>
      </div>

      <div class="space-y-5">
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <label for="site-name" class="w-full md:w-1/4 text-stone-700 font-medium">
            Platform Name
          </label>
          <div class="w-full md:w-3/4">
            <input
              id="site-name"
              type="text"
              v-model="settings.siteName"
              class="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Enter platform name"
            />
            <p class="text-xs text-stone-500 mt-1">This appears in page titles and emails</p>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <label for="site-email" class="w-full md:w-1/4 text-stone-700 font-medium">
            Support Email
          </label>
          <div class="w-full md:w-3/4">
            <input
              id="site-email"
              type="email"
              v-model="settings.supportEmail"
              class="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Enter support email"
            />
            <p class="text-xs text-stone-500 mt-1">Where users will contact for support</p>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <label class="w-full md:w-1/4 text-stone-700 font-medium">
            Platform Logo
          </label>
          <div class="w-full md:w-3/4">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-lg bg-stone-100 border border-stone-200 overflow-hidden">
                <img 
                  v-if="settings.logoUrl" 
                  :src="settings.logoUrl" 
                  class="w-full h-full object-contain"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-stone-400">
                  <Icon name="mdi:image" class="text-2xl" />
                </div>
              </div>
              <button 
                class="text-sm border border-stone-300 px-4 py-2 rounded-lg hover:bg-stone-50 transition-colors"
                @click="openFileUpload"
              >
                Change Logo
              </button>
            </div>
            <input 
              type="file" 
              ref="fileInput"
              class="hidden"
              accept="image/*"
              @change="handleLogoUpload"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Feature Toggles -->
    <div class="bg-white rounded-xl shadow-sm border border-stone-200 p-6 mb-6">
      <div class="flex items-center gap-3 mb-4">
        <Icon name="mdi:feature-search" class="text-xl text-amber-600" />
        <h3 class="text-xl font-semibold text-stone-800">Feature Control</h3>
      </div>

      <div class="space-y-4">
        <div class="flex justify-between items-center p-3 hover:bg-stone-50 rounded-lg transition-colors">
          <div>
            <p class="font-medium text-stone-800">User Verification</p>
            <p class="text-sm text-stone-500">Require email verification for new users</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="settings.enableVerification" 
              class="sr-only peer"
            >
            <div class="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
          </label>
        </div>

        <div class="flex justify-between items-center p-3 hover:bg-stone-50 rounded-lg transition-colors">
          <div>
            <p class="font-medium text-stone-800">Role-Based Access (RBAC)</p>
            <p class="text-sm text-stone-500">Enable advanced permission controls</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="settings.enableRBAC" 
              class="sr-only peer"
            >
            <div class="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
          </label>
        </div>

        <div class="flex justify-between items-center p-3 hover:bg-stone-50 rounded-lg transition-colors">
          <div>
            <p class="font-medium text-stone-800">Portfolio Submissions</p>
            <p class="text-sm text-stone-500">Allow artists to submit portfolios</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="settings.allowPortfolios" 
              class="sr-only peer"
            >
            <div class="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
          </label>
        </div>

        <div class="flex justify-between items-center p-3 hover:bg-stone-50 rounded-lg transition-colors">
          <div>
            <p class="font-medium text-stone-800">Job Posting</p>
            <p class="text-sm text-stone-500">Allow clients to post new jobs</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              v-model="settings.allowJobPosting" 
              class="sr-only peer"
            >
            <div class="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
          </label>
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="bg-white rounded-xl shadow-sm border border-red-200 p-6">
      <div class="flex items-center gap-3 mb-4">
        <Icon name="mdi:alert-circle" class="text-xl text-red-600" />
        <h3 class="text-xl font-semibold text-red-800">Danger Zone</h3>
      </div>

      <div class="space-y-4">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 bg-red-50 rounded-lg">
          <div>
            <p class="font-medium text-red-800">Reset All Settings</p>
            <p class="text-sm text-red-600">Revert to default platform settings</p>
          </div>
          <button 
            @click="confirmReset"
            class="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-100 transition-colors whitespace-nowrap"
          >
            Reset to Defaults
          </button>
        </div>

        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 bg-red-50 rounded-lg">
          <div>
            <p class="font-medium text-red-800">Clear All Data</p>
            <p class="text-sm text-red-600">Permanently delete all platform data</p>
          </div>
          <button 
            @click="confirmDataWipe"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
          >
            Wipe All Data
          </button>
        </div>
      </div>
    </div>

    <!-- Notification Toast -->
    <div 
      v-if="notification.show"
      class="fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all duration-300"
      :class="{
        'bg-green-100 text-green-800': notification.type === 'success',
        'bg-red-100 text-red-800': notification.type === 'error'
      }"
    >
      <Icon 
        :name="notification.type === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'" 
        class="text-lg" 
      />
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup>
const fileInput = ref(null)
const isSaving = ref(false)

const settings = ref({
  siteName: 'Sensi’il Platform',
  supportEmail: 'support@sensiil.com',
  logoUrl: null,
  enableVerification: true,
  enableRBAC: true,
  allowPortfolios: true,
  allowJobPosting: true
})

const notification = reactive({
  show: false,
  type: '',
  message: ''
})

const openFileUpload = () => {
  fileInput.value.click()
}

const handleLogoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // In a real app, you would upload to your server here
    const reader = new FileReader()
    reader.onload = (e) => {
      settings.value.logoUrl = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const saveSettings = async () => {
  try {
    isSaving.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    showNotification('success', 'Settings saved successfully')
  } catch (error) {
    showNotification('error', 'Failed to save settings')
  } finally {
    isSaving.value = false
  }
}

const confirmReset = () => {
  if (confirm('Are you sure you want to reset all settings to defaults?')) {
    // Reset logic here
    showNotification('success', 'Settings reset to defaults')
  }
}

const confirmDataWipe = () => {
  if (confirm('WARNING: This will permanently delete ALL data. Are you absolutely sure?')) {
    // Data wipe logic here
    showNotification('error', 'All data has been deleted', 5000)
  }
}

const showNotification = (type, message, duration = 3000) => {
  notification.show = true
  notification.type = type
  notification.message = message
  setTimeout(() => notification.show = false, duration)
}

definePageMeta({
  layout: 'admin'
})
</script>

<style scoped>
/* Custom checkbox toggle styles */
input:checked ~ .dot {
  transform: translateX(100%);
}
</style>4trcde