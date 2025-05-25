<template>
  <div>
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-stone-800">Portfolio & Content Management</h1>
        <p class="text-stone-500 mt-1">Manage artist submissions and featured content</p>
      </div>
      
      <div class="flex flex-col sm:flex-row gap-3">
        <!-- Search -->
        <div class="relative flex-1 min-w-[200px]">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search portfolios..."
            class="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
          <Icon name="mdi:magnify" class="absolute left-3 top-2.5 text-stone-400" />
        </div>
        
        <!-- Refresh Button -->
        <button 
          class="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-amber-100 px-4 py-2 rounded-lg transition-colors"
          @click="refreshPortfolios"
          :disabled="loading"
        >
          <Icon name="mdi:refresh" class="text-lg" :class="{ 'animate-spin': loading }" />
          <span>{{ loading ? 'Refreshing...' : 'Refresh' }}</span>
        </button>
      </div>
    </div>

    <!-- Filters and Bulk Actions -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4">
      <!-- Status Filter -->
      <select 
        v-model="statusFilter"
        class="flex-1 sm:flex-none border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
      >
        <option value="all">All Statuses</option>
        <option value="pending">Pending Approval</option>
        <option value="approved">Approved</option>
      </select>
      
      <!-- Feature Filter -->
      <select 
        v-model="featureFilter"
        class="flex-1 sm:flex-none border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
      >
        <option value="all">All Portfolios</option>
        <option value="featured">Featured Only</option>
        <option value="non-featured">Non-Featured</option>
      </select>
      
      <!-- Bulk Actions -->
      <div class="flex-1 sm:flex-none flex gap-2">
        <select 
          v-model="bulkAction"
          class="flex-1 border border-stone-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500"
          :disabled="selectedPortfolios.length === 0"
        >
          <option value="">Bulk Actions</option>
          <option value="approve">Approve</option>
          <option value="feature">Feature</option>
          <option value="unfeature">Unfeature</option>
          <option value="remove">Remove</option>
        </select>
        <button 
          @click="applyBulkAction"
          class="bg-stone-800 text-amber-100 px-4 py-2 rounded-lg disabled:opacity-50"
          :disabled="!bulkAction || selectedPortfolios.length === 0"
        >
          Apply
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <Icon name="eos-icons:loading" class="text-4xl text-amber-500" />
    </div>

    <!-- Empty State -->
    <div 
      v-else-if="filteredPortfolios.length === 0" 
      class="bg-white rounded-xl p-8 text-center border border-stone-200"
    >
      <Icon name="mdi:image-remove" class="mx-auto text-4xl text-stone-400 mb-3" />
      <h3 class="text-lg font-medium text-stone-700">No portfolios found</h3>
      <p class="text-stone-500 mt-1">
        {{ searchQuery ? 'Try a different search term' : 'No portfolios match your filters' }}
      </p>
      <button 
        @click="resetFilters"
        class="mt-4 text-amber-600 hover:text-amber-700 text-sm font-medium"
      >
        Reset all filters
      </button>
    </div>

    <!-- Portfolios Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="portfolio in paginatedPortfolios"
        :key="portfolio.id"
        class="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow"
        :class="{ 'ring-2 ring-amber-500': selectedPortfolios.includes(portfolio.id) }"
      >
        <div class="relative h-48 overflow-hidden bg-stone-100">
          <img 
            :src="portfolio.image" 
            :alt="portfolio.title" 
            class="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            @error="handleImageError"
          >
          <!-- Status Badges -->
          <span 
            v-if="portfolio.featured"
            class="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1"
          >
            <Icon name="mdi:star" class="text-xs" />
            Featured
          </span>
          <span 
            class="absolute bottom-2 left-2 text-xs px-2 py-1 rounded flex items-center gap-1"
            :class="{
              'bg-green-100 text-green-800': portfolio.status === 'approved',
              'bg-yellow-100 text-yellow-800': portfolio.status === 'pending'
            }"
          >
            <Icon 
              :name="portfolio.status === 'approved' ? 'mdi:check-circle' : 'mdi:clock'" 
              class="text-xs" 
            />
            {{ portfolio.status === 'approved' ? 'Approved' : 'Pending' }}
          </span>
          <!-- Selection Checkbox -->
          <input 
            type="checkbox" 
            v-model="selectedPortfolios"
            :value="portfolio.id"
            class="absolute top-2 right-2 h-5 w-5 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
          >
        </div>

        <div class="p-4">
          <h3 class="font-semibold text-stone-800 mb-1">{{ portfolio.title }}</h3>
          <p class="text-sm text-stone-500 mb-3">By {{ portfolio.artist }}</p>
          <p class="text-xs text-stone-400 mb-4">
            Added {{ formatDate(portfolio.createdAt) }}
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-2">
            <button
              v-if="portfolio.status !== 'approved'"
              class="flex-1 min-w-[80px] flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
              @click="approvePortfolio(portfolio)"
            >
              <Icon name="mdi:check" class="text-sm" />
              Approve
            </button>
            <button
              class="flex-1 min-w-[80px] flex items-center justify-center gap-1 px-3 py-1.5 rounded text-sm transition-colors"
              :class="{
                'bg-amber-600 hover:bg-amber-700 text-white': !portfolio.featured,
                'bg-stone-200 hover:bg-stone-300 text-stone-800': portfolio.featured
              }"
              @click="featurePortfolio(portfolio)"
            >
              <Icon :name="portfolio.featured ? 'mdi:star-off' : 'mdi:star'" class="text-sm" />
              {{ portfolio.featured ? 'Unfeature' : 'Feature' }}
            </button>
            <button
              class="flex-1 min-w-[80px] flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
              @click="removePortfolio(portfolio)"
            >
              <Icon name="mdi:delete" class="text-sm" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="filteredPortfolios.length > itemsPerPage" class="mt-8 flex justify-center">
      <nav class="flex items-center gap-1">
        <button 
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          class="w-10 h-10 rounded-full flex items-center justify-center border"
          :class="{
            'border-amber-500 bg-amber-50 text-amber-700': currentPage === page,
            'border-stone-200 hover:bg-stone-100': currentPage !== page
          }"
        >
          {{ page }}
        </button>
      </nav>
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
// Imports
import { ref, reactive, computed } from 'vue'

// State
const loading = ref(false)
const searchQuery = ref('')
const statusFilter = ref('all')
const featureFilter = ref('all')
const bulkAction = ref('')
const selectedPortfolios = ref([])
const currentPage = ref(1)
const itemsPerPage = 6

const notification = reactive({
  show: false,
  type: '',
  message: ''
})

// Portfolio data
const portfolios = ref([
  {
    id: 1,
    title: 'Dreamscape',
    artist: 'Selam Abebe',
    image: 'https://via.placeholder.com/600x400.png?text=Artwork+1',
    status: 'pending',
    featured: false,
    createdAt: '2023-05-15'
  },
  {
    id: 2,
    title: 'Modern Life',
    artist: 'Mikiyas Yilma',
    image: 'https://via.placeholder.com/600x400.png?text=Artwork+2',
    status: 'pending',
    featured: false,
    createdAt: '2023-05-18'
  },
  {
    id: 3,
    title: 'Traditional Harmony',
    artist: 'Hana K.',
    image: 'https://via.placeholder.com/600x400.png?text=Artwork+3',
    status: 'approved',
    featured: true,
    createdAt: '2023-05-10'
  },
  {
    id: 4,
    title: 'Urban Dreams',
    artist: 'Yonas T.',
    image: 'https://via.placeholder.com/600x400.png?text=Artwork+4',
    status: 'approved',
    featured: false,
    createdAt: '2023-05-12'
  },
  {
    id: 5,
    title: 'Abstract Thoughts',
    artist: 'Lily M.',
    image: 'https://via.placeholder.com/600x400.png?text=Artwork+5',
    status: 'pending',
    featured: false,
    createdAt: '2023-05-20'
  },
  {
    id: 6,
    title: 'Cultural Heritage',
    artist: 'Abel F.',
    image: 'https://via.placeholder.com/600x400.png?text=Artwork+6',
    status: 'approved',
    featured: true,
    createdAt: '2023-05-05'
  }
])

// Computed Properties
const filteredPortfolios = computed(() => {
  let result = portfolios.value
  
  // Apply status filter
  if (statusFilter.value !== 'all') {
    result = result.filter(p => p.status === statusFilter.value)
  }
  
  // Apply feature filter
  if (featureFilter.value !== 'all') {
    result = result.filter(p => 
      featureFilter.value === 'featured' ? p.featured : !p.featured
    )
  }
  
  // Apply search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.artist.toLowerCase().includes(query)
    )
  }
  
  return result
})

const paginatedPortfolios = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredPortfolios.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(filteredPortfolios.value.length / itemsPerPage)
})

// Methods
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const handleImageError = (event) => {
  event.target.src = '/placeholder-artwork.jpg'
}

const showNotification = (type, message) => {
  notification.show = true
  notification.type = type
  notification.message = message
  setTimeout(() => notification.show = false, 3000)
}

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = 'all'
  featureFilter.value = 'all'
  currentPage.value = 1
}

// Actions
const approvePortfolio = async (portfolio) => {
  try {
    loading.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    portfolio.status = 'approved'
    showNotification('success', `"${portfolio.title}" approved successfully`)
  } catch (error) {
    showNotification('error', 'Failed to approve portfolio')
  } finally {
    loading.value = false
  }
}

const featurePortfolio = async (portfolio) => {
  try {
    loading.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    portfolio.featured = !portfolio.featured
    showNotification(
      'success', 
      `"${portfolio.title}" ${portfolio.featured ? 'featured' : 'unfeatured'}`
    )
  } catch (error) {
    showNotification('error', 'Failed to update feature status')
  } finally {
    loading.value = false
  }
}

const removePortfolio = async (portfolio) => {
  if (!confirm(`Are you sure you want to remove "${portfolio.title}" by ${portfolio.artist}?`)) return
  
  try {
    loading.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    const index = portfolios.value.findIndex(p => p.id === portfolio.id)
    if (index !== -1) {
      portfolios.value.splice(index, 1)
      showNotification('success', 'Portfolio removed successfully')
    }
  } catch (error) {
    showNotification('error', 'Failed to remove portfolio')
  } finally {
    loading.value = false
  }
}

const refreshPortfolios = async () => {
  try {
    loading.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    showNotification('success', 'Portfolios refreshed')
  } catch (error) {
    showNotification('error', 'Failed to refresh portfolios')
  } finally {
    loading.value = false
  }
}

const applyBulkAction = async () => {
  if (!bulkAction.value || selectedPortfolios.value.length === 0) return
  
  if (bulkAction.value === 'remove' && !confirm(
    `Are you sure you want to remove ${selectedPortfolios.value.length} portfolios?`
  )) return
  
  try {
    loading.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    portfolios.value.forEach(portfolio => {
      if (selectedPortfolios.value.includes(portfolio.id)) {
        switch (bulkAction.value) {
          case 'approve':
            portfolio.status = 'approved'
            break
          case 'feature':
            portfolio.featured = true
            break
          case 'unfeature':
            portfolio.featured = false
            break
          case 'remove':
            const index = portfolios.value.findIndex(p => p.id === portfolio.id)
            if (index !== -1) portfolios.value.splice(index, 1)
            break
        }
      }
    })
    
    showNotification(
      'success', 
      `Bulk action completed (${selectedPortfolios.value.length} portfolios)`
    )
    selectedPortfolios.value = []
    bulkAction.value = ''
  } catch (error) {
    showNotification('error', 'Bulk action failed')
  } finally {
    loading.value = false
  }
}

definePageMeta({
  layout: 'admin'
})
</script>

<style scoped>
/* Custom transitions */
input[type="checkbox"] {
  transition: all 0.2s ease;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>