<template>
    <li class="p-4 hover:bg-stone-50 transition-colors">
      <div class="flex items-start">
        <div class="p-2 rounded-full mr-3" :class="[iconColor.replace('text-', 'bg-') + ' bg-opacity-20']">
          <Icon :name="icon" class="text-lg" :class="iconColor" />
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-stone-800">
            <span class="font-semibold">{{ user }}</span> {{ action }}
          </p>
          <p class="text-xs text-stone-400 mt-1">{{ time }}</p>
        </div>
      </div>
    </li>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    type: String,
    user: String,
    action: String,
    time: String
  })
  
  const icon = computed(() => ({
    upload: 'mdi:upload',
    hire: 'mdi:handshake',
    alert: 'mdi:alert',
    registration: 'mdi:account-plus'
  })[props.type])
  
  const iconColor = computed(() => ({
    upload: 'text-blue-500',
    hire: 'text-green-500',
    alert: 'text-red-500',
    registration: 'text-purple-500'
  })[props.type])
  </script>