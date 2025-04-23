<template>
    <div class="bg-gray-50 min-h-screen">
      <!-- Breadcrumb with Comic Style -->
      <div class="bg-white py-3 border-b border-gray-200">
        <div class="max-w-4xl mx-auto px-4">
          <span class="text-gray-600 font-comic">Home > Your Comic Cart</span>
        </div>
      </div>
  
      <!-- Cart Header with Comic Theme -->
      <div class="max-w-4xl mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2 font-comic">COMIC CART</h1>
        <p class="text-gray-600 font-comic">You have {{ cart.length }} awesome comic item{{ cart.length === 1 ? '' : 's' }}!</p>
      </div>
  
      <!-- Comic Items Table -->
      <div v-if="cart.length" class="max-w-4xl mx-auto px-4 pb-8">
        <div class="bg-white rounded-lg shadow-md overflow-hidden border-2 border-black">
          <!-- Table Header -->
          <div class="hidden md:grid grid-cols-12 bg-yellow-400 p-4 font-bold text-black font-comic border-b-2 border-black">
            <div class="col-span-6">COMIC ITEM</div>
            <div class="col-span-2 text-center">PRICE</div>
            <div class="col-span-2 text-center">QTY</div>
            <div class="col-span-2 text-center">TOTAL</div>
          </div>
  
          <!-- Cart Items -->
          <div v-for="(item, index) in cart" :key="item.id" class="border-b-2 border-black last:border-b-0">
            <div class="grid grid-cols-1 md:grid-cols-12 p-4 gap-4">
              <!-- Product Info -->
              <div class="col-span-6 flex items-start">
                <img :src="item.image" :alt="item.title" class="w-20 h-20 object-cover rounded-lg border-2 border-black mr-4">
                <div>
                  <h3 class="font-bold text-gray-800 font-comic">{{ item.title }}</h3>
                  <p class="text-sm text-gray-600 mt-1 font-comic">Format: {{ item.format }}</p>
                  <div class="mt-2 flex items-center">
                    <span class="text-sm font-bold mr-2 font-comic">Type:</span>
                    <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-comic">
                      {{ item.type }}
                    </span>
                  </div>
                </div>
              </div>
  
              <!-- Price -->
              <div class="col-span-2 flex items-center justify-center font-comic">
                <span class="font-bold">{{ formatCurrency(item.price) }}</span>
              </div>
  
              <!-- Quantity -->
              <div class="col-span-2 flex items-center justify-center">
                <div class="flex items-center border-2 border-black rounded-lg">
                  <button 
                    @click="decrementQuantity(index)"
                    class="px-3 py-1 text-black hover:bg-yellow-100 font-comic"
                    :disabled="item.quantity <= 1"
                  >
                    −
                  </button>
                  <span class="px-3 font-bold font-comic">{{ item.quantity }}</span>
                  <button 
                    @click="incrementQuantity(index)"
                    class="px-3 py-1 text-black hover:bg-yellow-100 font-comic"
                  >
                    +
                  </button>
                </div>
              </div>
  
              <!-- Total -->
              <div class="col-span-2 flex items-center justify-center font-comic">
                <span class="font-bold">{{ formatCurrency(item.price * item.quantity) }}</span>
              </div>
            </div>
          </div>
  
          <!-- Cart Summary -->
          <div class="p-4 bg-yellow-50 border-t-2 border-black">
            <div class="flex flex-col md:flex-row justify-between items-center">
              <div class="mb-4 md:mb-0">
                <p class="text-lg font-bold font-comic">SUBTOTAL: <span class="text-red-600 ml-2">{{ formatCurrency(subtotal) }}</span></p>
                <p class="text-sm text-gray-600 mt-1 font-comic">*Digital delivery included</p>
              </div>
              <div class="flex space-x-4">
                <NuxtLink 
                  to="/store" 
                  class="px-6 py-2 border-2 border-black rounded-lg bg-white hover:bg-yellow-100 transition-colors font-bold font-comic shadow-comic"
                >
                  KEEP SHOPPING
                </NuxtLink>
                <NuxtLink 
                  to="/checkout" 
                  class="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-bold font-comic shadow-comic"
                >
                  POW! CHECKOUT
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Empty Cart -->
      <div v-else class="max-w-4xl mx-auto px-4 py-12 text-center">
        <div class="bg-white p-8 rounded-lg border-2 border-black shadow-comic">
          <p class="text-xl font-bold text-gray-800 mb-4 font-comic">YOUR CART IS EMPTY!</p>
          <p class="text-gray-600 mb-6 font-comic">All great adventures start with the first comic...</p>
          <NuxtLink 
            to="/store" 
            class="inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-bold font-comic shadow-comic"
          >
            EXPLORE COMICS
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Sample comic cart data
  const cart = useState('cart', () => [
    {
      id: 1,
      title: 'THE SHADOW NINJA #1',
      description: 'First issue of the cult series',
      format: 'Digital PDF',
      type: 'Single Issue',
      price: 3.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'COSMIC STICKER PACK',
      description: '50+ character stickers',
      format: 'PNG Files',
      type: 'Stickers',
      price: 4.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'HEROES T-SHIRT',
      description: 'Limited edition',
      format: 'Physical',
      type: 'Merch',
      price: 24.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ])
  
  // Computed properties
  const subtotal = computed(() => {
    return cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })
  
  // Methods
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }
  
  const incrementQuantity = (index) => {
    cart.value[index].quantity++
  }
  
  const decrementQuantity = (index) => {
    if (cart.value[index].quantity > 1) {
      cart.value[index].quantity--
    }
  }
  
  const removeFromCart = (index) => {
    cart.value.splice(index, 1)
  }
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
  
  .font-comic {
    font-family: 'Comic Neue', cursive;
  }
  
  .shadow-comic {
    box-shadow: 4px 4px 0px #000;
  }
  
  /* Mobile responsive */
  @media (max-width: 767px) {
    .grid-cols-1 > div {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }
    
    .grid-cols-1 > div::before {
      content: attr(data-label);
      font-weight: 600;
      width: 100px;
      flex-shrink: 0;
    }
  }
  </style>