<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Payments & Subscriptions</h1>
      <p class="text-gray-600 mb-6">Review payment history and control premium subscriptions.</p>
  
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead class="bg-gray-100 text-left">
            <tr>
              <th class="py-3 px-4">User</th>
              <th class="py-3 px-4">Type</th>
              <th class="py-3 px-4">Amount</th>
              <th class="py-3 px-4">Date</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="payment in payments"
              :key="payment.id"
              class="border-t hover:bg-gray-50"
            >
              <td class="py-2 px-4">{{ payment.user }}</td>
              <td class="py-2 px-4">{{ payment.type }}</td>
              <td class="py-2 px-4">${{ payment.amount }}</td>
              <td class="py-2 px-4">{{ payment.date }}</td>
              <td class="py-2 px-4">
                <span
                  :class="{
                    'text-green-600': payment.status === 'approved',
                    'text-yellow-600': payment.status === 'pending',
                    'text-red-600': payment.status === 'declined'
                  }"
                >
                  {{ payment.status }}
                </span>
              </td>
              <td class="py-2 px-4">
                <button
                  class="bg-green-500 text-white px-2 py-1 rounded text-sm mr-2"
                  @click="updateStatus(payment, 'approved')"
                >
                  Approve
                </button>
                <button
                  class="bg-red-600 text-white px-2 py-1 rounded text-sm"
                  @click="updateStatus(payment, 'declined')"
                >
                  Decline
                </button>
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
  
  // Dummy payment data (replace with real API data later)
  const payments = ref([
    {
      id: 1,
      user: 'Lidiya M.',
      type: 'Premium Subscription',
      amount: 9.99,
      date: '2025-04-22',
      status: 'pending'
    },
    {
      id: 2,
      user: 'Mikael G.',
      type: 'Artwork Unlock',
      amount: 2.50,
      date: '2025-04-20',
      status: 'approved'
    },
    {
      id: 3,
      user: 'Yohannes A.',
      type: 'Subscription Renewal',
      amount: 9.99,
      date: '2025-04-18',
      status: 'declined'
    }
  ])
  
  const updateStatus = (payment, newStatus) => {
    payment.status = newStatus
    // TODO: Send status update to backend
  }
  </script>
  