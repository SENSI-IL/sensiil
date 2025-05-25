<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Analytics & Logs</h1>
      <p class="text-gray-600 mb-6">Monitor key stats and user activity logs.</p>
  
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-white rounded-lg p-6 shadow">
          <h2 class="text-lg font-semibold text-gray-700">Total Users</h2>
          <p class="text-3xl font-bold text-blue-600">{{ stats.totalUsers }}</p>
        </div>
        <div class="bg-white rounded-lg p-6 shadow">
          <h2 class="text-lg font-semibold text-gray-700">Total Portfolios</h2>
          <p class="text-3xl font-bold text-purple-600">{{ stats.totalPortfolios }}</p>
        </div>
        <div class="bg-white rounded-lg p-6 shadow">
          <h2 class="text-lg font-semibold text-gray-700">Total Earnings</h2>
          <p class="text-3xl font-bold text-green-600">${{ stats.totalEarnings }}</p>
        </div>
      </div>
  
      <!-- Most Viewed Artworks -->
      <h2 class="text-xl font-bold mb-2">Most Viewed Artworks</h2>
      <ul class="mb-8">
        <li
          v-for="(art, index) in stats.topArtworks"
          :key="index"
          class="bg-gray-100 px-4 py-2 mb-2 rounded-md flex justify-between"
        >
          <span>{{ art.title }} by {{ art.artist }}</span>
          <span class="text-sm text-gray-500">{{ art.views }} views</span>
        </li>
      </ul>
  
      <!-- Login Activity Log -->
      <h2 class="text-xl font-bold mb-2">Recent Login Activity</h2>
      <ul>
        <li
          v-for="(log, index) in stats.loginLogs"
          :key="index"
          class="border-b py-2 flex justify-between text-sm text-gray-700"
        >
          <span>{{ log.user }}</span>
          <span>{{ log.date }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: 'admin',
  })
  
  const stats = ref({
    totalUsers: 358,
    totalPortfolios: 124,
    totalEarnings: 4257.50,
    topArtworks: [
      { title: 'The Storm', artist: 'Selam T.', views: 213 },
      { title: 'Desert Bloom', artist: 'Edu K.', views: 187 },
      { title: 'Cultural Echoes', artist: 'Sara M.', views: 175 }
    ],
    loginLogs: [
      { user: 'admin@sensiil.com', date: '2025-05-06 09:12' },
      { user: 'lidiyam@gmail.com', date: '2025-05-06 08:45' },
      { user: 'mikaelg@client.com', date: '2025-05-05 21:17' }
    ]
  })
  </script>
  