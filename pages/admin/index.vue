<template>
  <div class="space-y-6">
    <!-- Dashboard Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold text-stone-800">Dashboard Overview</h1>
        <p class="text-stone-500 mt-1">Welcome back, {{ user.name }}. Here's what's happening today.</p>
      </div>
      <div class="mt-4 md:mt-0">
        <button class="flex items-center space-x-2 bg-stone-800 hover:bg-stone-700 text-amber-100 px-4 py-2 rounded-lg transition-colors">
          <Icon name="mdi:refresh" class="text-lg" />
          <span>Refresh Data</span>
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardCard 
        title="Total Users" 
        value="1,245" 
        icon="mdi:account-multiple"
        color="text-blue-600"
        trend="12% increase"
      />
      <DashboardCard 
        title="Portfolios" 
        value="312" 
        icon="mdi:image-multiple"
        color="text-purple-600"
        trend="5 new today"
      />
      <DashboardCard 
        title="Jobs Completed" 
        value="87" 
        icon="mdi:briefcase-check"
        color="text-green-600"
        trend="3 in progress"
      />
      <DashboardCard 
        title="Total Earnings" 
        value="$4,500" 
        icon="mdi:cash-multiple"
        color="text-amber-600"
        trend="8% from last month"
      />
    </div>

    <!-- Recent Activity Section -->
    <div class="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
      <div class="p-5 border-b border-stone-200 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-stone-800">Recent Activities</h2>
        <button class="text-sm text-stone-500 hover:text-stone-700 flex items-center">
          <span>View All</span>
          <Icon name="mdi:chevron-right" class="ml-1" />
        </button>
      </div>
      <ul class="divide-y divide-stone-200">
        <ActivityItem 
          type="upload"
          user="Selam Abebe"
          action="uploaded a new portfolio"
          time="2 hours ago"
        />
        <ActivityItem 
          type="hire"
          user="Yonas"
          action="hired artist Mikiyas"
          time="5 hours ago"
        />
        <ActivityItem 
          type="alert"
          user="Lily"
          action="reported inappropriate content"
          time="1 day ago"
        />
        <ActivityItem 
          type="registration"
          user="Hana K."
          action="registered as Artist"
          time="2 days ago"
        />
      </ul>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <QuickActionCard 
        title="Moderate Content"
        description="Review newly uploaded portfolios"
        icon="mdi:shield-search"
        buttonText="Start Review"
        color="bg-purple-100 text-purple-800"
      />
      <QuickActionCard 
        title="View Reports"
        description="3 unresolved user reports"
        icon="mdi:alert-circle"
        buttonText="Check Now"
        color="bg-red-100 text-red-800"
      />
      <QuickActionCard 
        title="Platform Analytics"
        description="View monthly performance"
        icon="mdi:chart-line"
        buttonText="See Stats"
        color="bg-blue-100 text-blue-800"
      />
    </div>
  </div>
</template>

<script setup>
// Import components
import DashboardCard from '@/components/dashboard/DashboardCard.vue'
import ActivityItem from '@/components/dashboard/ActivityItem.vue'
import QuickActionCard from '@/components/dashboard/QuickActionCard.vue'

// Page Data
const user = {
  name: 'Admin User'
}

definePageMeta({
  layout: 'admin'
})
</script>