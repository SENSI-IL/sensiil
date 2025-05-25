<template>
  <div>
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-stone-800">Job & Hiring Management</h1>
        <p class="text-stone-500 mt-1">Monitor and manage client job requests</p>
      </div>
      
      <div class="flex gap-3">
        <!-- Search -->
        <div class="relative flex-1 min-w-[200px]">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search jobs..."
            class="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
          <Icon name="mdi:magnify" class="absolute left-3 top-2.5 text-stone-400" />
        </div>
        
        <!-- Status Filter -->
        <select 
          v-model="statusFilter"
          class="border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </div>

    <!-- Empty State -->
    <div 
      v-if="filteredJobs.length === 0" 
      class="bg-white rounded-xl p-8 text-center border border-stone-200"
    >
      <Icon name="mdi:briefcase-remove" class="mx-auto text-4xl text-stone-400 mb-3" />
      <h3 class="text-lg font-medium text-stone-700">No jobs found</h3>
      <p class="text-stone-500 mt-1">
        {{ searchQuery ? 'Try a different search term' : 'No jobs match your filters' }}
      </p>
    </div>

    <!-- Jobs Grid -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        v-for="job in filteredJobs"
        :key="job.id"
        class="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow"
      >
        <div class="p-5">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-semibold text-stone-800">{{ job.title }}</h3>
            <span 
              class="text-xs px-2 py-1 rounded-full capitalize"
              :class="{
                'bg-yellow-100 text-yellow-800': job.status === 'pending',
                'bg-green-100 text-green-800': job.status === 'accepted',
                'bg-red-100 text-red-800': job.status === 'rejected'
              }"
            >
              {{ job.status }}
            </span>
          </div>
          
          <div class="space-y-2 text-sm mb-4">
            <p class="text-stone-600">
              <Icon name="mdi:account" class="inline mr-1 text-stone-400" />
              <span class="font-medium">Client:</span> {{ job.client }}
            </p>
            <p class="text-stone-600">
              <Icon name="mdi:brush" class="inline mr-1 text-stone-400" />
              <span class="font-medium">Artist:</span> 
              <span :class="{ 'text-stone-400': !job.artist }">
                {{ job.artist || 'Not assigned' }}
              </span>
            </p>
            <p class="text-stone-600">
              <Icon name="mdi:calendar" class="inline mr-1 text-stone-400" />
              <span class="font-medium">Posted:</span> {{ formatDate(job.postedDate) }}
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-2">
            <button
              v-if="job.status !== 'accepted'"
              class="flex-1 min-w-[100px] flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
              @click="changeStatus(job, 'accepted')"
            >
              <Icon name="mdi:check" class="text-sm" />
              Accept
            </button>
            <button
              v-if="job.status !== 'rejected'"
              class="flex-1 min-w-[100px] flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
              @click="changeStatus(job, 'rejected')"
            >
              <Icon name="mdi:close" class="text-sm" />
              Reject
            </button>
            <button
              class="flex-1 min-w-[100px] flex items-center justify-center gap-1 bg-stone-600 hover:bg-stone-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
              @click="viewJobDetails(job)"
            >
              <Icon name="mdi:eye" class="text-sm" />
              Details
            </button>
          </div>
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
// State
const searchQuery = ref('')
const statusFilter = ref('all')

const notification = reactive({
  show: false,
  type: '',
  message: ''
})

// Sample job data
const jobs = ref([
  {
    id: 1,
    title: 'Character Design for Game',
    client: 'Liya Tesfaye',
    artist: 'Abel Dessie',
    status: 'pending',
    postedDate: '2023-06-15',
    description: 'Need 5 fantasy character designs for mobile RPG game'
  },
  {
    id: 2,
    title: 'Album Cover Illustration',
    client: 'Nahom M.',
    artist: 'Selam Abebe',
    status: 'accepted',
    postedDate: '2023-06-10',
    description: 'Modern abstract design for jazz album release'
  },
  {
    id: 3,
    title: 'Children\'s Book Pages',
    client: 'Helen Y.',
    artist: 'Mikiyas Yilma',
    status: 'pending',
    postedDate: '2023-06-18',
    description: '10 illustrated pages for educational children\'s book'
  },
  {
    id: 4,
    title: 'Logo Design',
    client: 'Addis Tech',
    artist: null,
    status: 'pending',
    postedDate: '2023-06-20',
    description: 'Modern tech company logo with Ethiopian elements'
  }
])

// Computed
const filteredJobs = computed(() => {
  let result = jobs.value
  
  // Apply status filter
  if (statusFilter.value !== 'all') {
    result = result.filter(job => job.status === statusFilter.value)
  }
  
  // Apply search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(job => 
      job.title.toLowerCase().includes(query) || 
      job.client.toLowerCase().includes(query) ||
      (job.artist && job.artist.toLowerCase().includes(query))
    )
  }
  
  return result
})

// Methods
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const showNotification = (type, message) => {
  notification.show = true
  notification.type = type
  notification.message = message
  setTimeout(() => notification.show = false, 3000)
}

const changeStatus = async (job, newStatus) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    job.status = newStatus
    showNotification(
      'success', 
      `Job "${job.title}" ${newStatus} successfully`
    )
  } catch (error) {
    showNotification('error', 'Failed to update job status')
  }
}

const viewJobDetails = (job) => {
  // TODO: Implement job details modal or page navigation
  console.log('Viewing job details:', job)
}

definePageMeta({
  layout: 'admin'
})
</script>

<style scoped>
/* Custom transitions */
button {
  transition: all 0.2s ease;
}
</style>
  