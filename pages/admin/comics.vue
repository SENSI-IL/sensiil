<template>
    <div>
      <h2 class="text-2xl font-semibold mb-6">Pending Comics for Review</h2>
  
      <div class="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Artist</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(comic, index) in comics" :key="comic.id">
              <td class="px-4 py-2">{{ index + 1 }}</td>
              <td class="px-4 py-2">{{ comic.title }}</td>
              <td class="px-4 py-2">{{ comic.artist }}</td>
              <td class="px-4 py-2 capitalize text-yellow-600 font-semibold">{{ comic.status }}</td>
              <td class="px-4 py-2 text-right space-x-2">
                <button class="text-blue-600 hover:underline text-sm">View</button>
                <button class="text-green-600 hover:underline text-sm">Approve</button>
                <button class="text-red-500 hover:underline text-sm">Reject</button>
              </td>
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
  
  const comics = ref([
    { id: 1, title: 'Rise of Sensi’il', artist: 'Etsub', status: 'pending' },
    { id: 2, title: 'Legacy of Light', artist: 'Edu', status: 'pending' },
    { id: 3, title: 'Shadow of the Past', artist: 'Seli', status: 'pending' }
  ])
  </script>
  