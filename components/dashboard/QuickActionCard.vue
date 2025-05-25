<template>
    <div class="bg-white rounded-xl shadow-sm border border-stone-200 p-5">
      <div class="flex items-center mb-3">
        <div class="p-2 rounded-lg mr-3" :class="color.split(' ')[0]">
          <Icon :name="icon" class="text-lg" :class="color.split(' ')[1]" />
        </div>
        <h3 class="font-semibold" :class="color.split(' ')[1]">{{ title }}</h3>
      </div>
      <p class="text-sm text-stone-500 mb-4">{{ description }}</p>
      <button class="text-sm px-3 py-1.5 rounded-lg border" :class="[
        color.split(' ')[1].replace('text-', 'border-'),
        color.split(' ')[1].replace('text-', 'hover:bg-') + ' hover:bg-opacity-10'
      ]">
        {{ buttonText }}
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    description: String,
    icon: String,
    buttonText: String,
    color: {
      type: String,
      default: 'bg-blue-100 text-blue-800'
    }
  })
  </script>