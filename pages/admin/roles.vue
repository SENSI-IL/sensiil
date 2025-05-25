<template>
    <div>
      <h2 class="text-2xl font-semibold mb-4">Manage Roles & Permissions</h2>
  
      <div class="bg-white rounded-lg shadow p-6">
        <div v-for="role in roles" :key="role.name" class="mb-6">
          <h3 class="text-xl font-semibold mb-2">{{ role.name }}</h3>
  
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <label v-for="permission in permissions" :key="permission" class="flex items-center space-x-2">
              <input
                type="checkbox"
                :value="permission"
                v-model="role.permissions"
                class="accent-blue-600"
              />
              <span>{{ permission }}</span>
            </label>
          </div>
        </div>
  
        <button
          @click="saveRoles"
          class="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: 'admin'
  })
  
  const roles = ref([
    { name: 'Admin', permissions: ['Manage Users', 'Moderate Content', 'View Analytics'] },
    { name: 'Artist', permissions: ['Upload Portfolio', 'Edit Profile'] },
    { name: 'Client', permissions: ['Post Jobs', 'Hire Artists'] }
  ])
  
  const permissions = [
    'Manage Users',
    'Moderate Content',
    'Upload Portfolio',
    'Post Jobs',
    'Hire Artists',
    'View Analytics',
    'Edit Profile'
  ]
  
  function saveRoles() {
    console.log('Updated roles:', roles.value)
    alert('Changes saved!')
  }
  </script>
  