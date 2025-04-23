
<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Upgrade to unlock <span class="font-semibold">premium comics, exclusive merch,</span> and 
          <span class="font-semibold">priority support</span>.
        </p>
      </div>

      <!-- Pricing Cards (Free vs. Premium) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Free Plan -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">Free</h3>
            <p class="text-gray-600 text-sm mb-4">For casual readers</p>
            
            <div class="mb-6">
              <span class="text-4xl font-bold text-gray-900">$0</span>
              <span class="text-gray-500">/forever</span>
            </div>

            <ul class="space-y-3 mb-8">
              <li class="flex items-center text-gray-600">
                <Icon name="heroicons:check-circle" class="text-green-500 mr-2" size="1.2rem" />
                Access to free comics
              </li>
              <li class="flex items-center text-gray-600">
                <Icon name="heroicons:check-circle" class="text-green-500 mr-2" size="1.2rem" />
                Basic support
              </li>
              <li class="flex items-center text-gray-400">
                <Icon name="heroicons:x-circle" class="text-gray-300 mr-2" size="1.2rem" />
                No premium content
              </li>
            </ul>

            <button 
              class="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-medium cursor-default"
            >
              Current Plan
            </button>
          </div>
        </div>

        <!-- Premium Plan (Highlighted) -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-blue-500 transform hover:scale-[1.02] transition-transform">
          <div class="p-6">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-1">Premium</h3>
                <p class="text-gray-600 text-sm mb-4">Unlock everything</p>
              </div>
              <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">BEST VALUE</span>
            </div>
            
            <div class="mb-6">
              <span class="text-4xl font-bold text-gray-900">$5</span>
              <span class="text-gray-500">/month</span>
            </div>

            <ul class="space-y-3 mb-8">
              <li class="flex items-center text-gray-600">
                <Icon name="heroicons:check-circle" class="text-green-500 mr-2" size="1.2rem" />
                All comics unlocked
              </li>
              <li class="flex items-center text-gray-600">
                <Icon name="heroicons:check-circle" class="text-green-500 mr-2" size="1.2rem" />
                Exclusive merch discounts
              </li>
              <li class="flex items-center text-gray-600">
                <Icon name="heroicons:check-circle" class="text-green-500 mr-2" size="1.2rem" />
                Priority 24/7 support
              </li>
            </ul>

            <button 
              class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Note -->
      <div class="mt-12 text-center text-gray-500 text-sm">
        <p>100% secure payment. Cancel anytime.</p>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>