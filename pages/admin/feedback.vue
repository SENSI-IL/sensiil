<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">User Feedback & Reports</h1>
      <p class="text-gray-600 mb-6">Review user-submitted reports and feedback. Take action if needed.</p>
  
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          v-for="report in reports"
          :key="report.id"
          class="bg-white shadow rounded-lg p-4"
        >
          <h3 class="font-semibold text-lg mb-1">Report #{{ report.id }}</h3>
          <p class="text-sm text-gray-500">Submitted by: {{ report.reportedBy }}</p>
          <p class="text-sm text-gray-700 mt-2 mb-2">
            <strong>Reason:</strong> {{ report.reason }}
          </p>
          <p class="text-sm text-gray-600 mb-4 italic">"{{ report.message }}"</p>
  
          <div class="flex gap-2">
            <button
              class="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              @click="respondToReport(report)"
            >
              Respond
            </button>
            <button
              class="bg-red-600 text-white px-3 py-1 rounded text-sm"
              @click="takeAction(report)"
            >
              Take Action
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: 'admin',
  })
  
  // Dummy data (you'll connect this to your backend API later)
  const reports = ref([
    {
      id: 101,
      reportedBy: 'Sami L.',
      reason: 'Inappropriate artwork',
      message: 'This artwork includes offensive content.'
    },
    {
      id: 102,
      reportedBy: 'Mimi A.',
      reason: 'Scam or spam',
      message: 'The user is sending scam job offers.'
    },
    {
      id: 103,
      reportedBy: 'Anonymous',
      reason: 'Copyright issue',
      message: 'Artwork seems to be copied from another artist.'
    }
  ])
  
  const respondToReport = (report) => {
    alert(`Responding to report #${report.id}...`)
    // TODO: Open a modal or redirect to response form
  }
  
  const takeAction = (report) => {
    alert(`Action taken on report #${report.id}.`)
    // TODO: Suspend user / remove content etc.
  }
  </script>
  