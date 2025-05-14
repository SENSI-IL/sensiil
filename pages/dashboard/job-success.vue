<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-50">
      <div class="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
        <h2 class="text-2xl font-bold text-green-600 mb-2">🎉 Success!</h2>
        <p class="text-gray-700 mb-4">
          Your job has been published or extended successfully.
        </p>
        <NuxtLink to="/dashboard/jobs">
          <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Go to My Jobs
          </button>
        </NuxtLink>
      </div>
    </div>
  </template>
  