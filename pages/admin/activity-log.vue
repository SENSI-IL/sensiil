<template>
    <div>
      <h2 class="text-2xl font-semibold mb-6">Activity Log</h2>
  
      <div class="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(log, index) in activityLogs" :key="log.id">
              <td class="px-4 py-2">{{ index + 1 }}</td>
              <td class="px-4 py-2">{{ log.user }}</td>
              <td class="px-4 py-2">{{ log.action }}</td>
              <td class="px-4 py-2">{{ log.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: 'admin'
  })
  
  const activityLogs = ref([
    { id: 1, user: 'Etsub', action: 'Approved comic "Rise of Sensi’il"', time: '2025-05-05 10:15 AM' },
    { id: 2, user: 'Edu', action: 'Rejected comic "Legacy of Light"', time: '2025-05-05 11:00 AM' },
    { id: 3, user: 'Seli', action: 'Updated profile information', time: '2025-05-05 01:30 PM' }
  ])
  </script>
  