<template>
    <div class="bg-white rounded-xl shadow-sm border border-stone-200 p-5 hover:shadow-md transition-shadow">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-stone-500">{{ title }}</p>
          <p class="text-2xl font-bold mt-1" :class="color">{{ value }}</p>
          <p class="text-xs text-stone-400 mt-2">{{ trend }}</p>
        </div>
        <div class="p-2 rounded-lg bg-opacity-20" :class="[color.replace('text-', 'bg-')]">
          <Icon :name="icon" class="text-xl" :class="color" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    value: String,
    icon: String,
    color: {
      type: String,
      default: 'text-blue-600'
    },
    trend: String
  })
  </script>