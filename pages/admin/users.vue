<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">User Management</h1>
    <p class="text-gray-600 mb-6">Manage users, approve artists, assign roles, and deactivate accounts.</p>

    <div class="overflow-x-auto bg-white rounded shadow">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 text-left">
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Role</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="border-t hover:bg-gray-50">
            <td class="px-4 py-2">{{ user.name }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2">
              <select v-model="user.role" class="border rounded px-2 py-1">
                <option>Admin</option>
                <option>Artist</option>
                <option>Client</option>
              </select>
            </td>
            <td class="px-4 py-2">
              <span :class="user.status === 'active' ? 'text-green-600' : 'text-red-600'">
                {{ user.status }}
              </span>
            </td>
            <td class="px-4 py-2 space-x-2">
              <button class="px-3 py-1 bg-green-500 text-white rounded" @click="approveUser(user)">Approve</button>
              <button class="px-3 py-1 bg-yellow-400 text-white rounded" @click="suspendUser(user)">Suspend</button>
              <button class="px-3 py-1 bg-red-600 text-white rounded" @click="deleteUser(user)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
})

// Dummy user data (replace with API later)
const users = ref([
  { id: 1, name: 'Selam Abebe', email: 'selam@example.com', role: 'Artist', status: 'pending' },
  { id: 2, name: 'Yonas Gebru', email: 'yonas@example.com', role: 'Client', status: 'active' },
  { id: 3, name: 'Hana K.', email: 'hana@example.com', role: 'Artist', status: 'active' },
])

const approveUser = (user) => {
  user.status = 'active'
  // TODO: send update to backend
}

const suspendUser = (user) => {
  user.status = 'suspended'
  // TODO: send update to backend
}

const deleteUser = (user) => {
  const index = users.value.findIndex((u) => u.id === user.id)
  if (index !== -1) users.value.splice(index, 1)
  // TODO: delete user in backend
}
</script>

  