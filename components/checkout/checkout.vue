<template>
    <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md mx-auto">
        <!-- Progress Steps -->
        <div class="flex justify-between mb-8 relative">
          <div class="absolute top-1/2 h-1 w-full bg-gray-300 -z-10"></div>
          <div 
            class="absolute top-1/2 h-1 bg-black -z-10 transition-all duration-300"
            :style="{ width: progressWidth }"
          ></div>
          
          <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center mb-2 text-sm font-medium"
              :class="currentStep >= index ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'"
            >
              {{ index + 1 }}
            </div>
            <span class="text-xs text-gray-600">{{ step }}</span>
          </div>
        </div>
  
        <!-- Cart Summary (Step 1) -->
        <div v-if="currentStep === 0" class="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Your Order</h2>
          
          <div class="space-y-4 mb-6">
            <div v-for="item in cart" :key="item.id" class="flex items-center justify-between py-3 border-b border-gray-200">
              <div class="flex items-center">
                <img :src="item.image" class="w-12 h-12 object-cover rounded mr-3">
                <div>
                  <h3 class="font-medium text-gray-800">{{ item.name }}</h3>
                  <p class="text-gray-500 text-sm">{{ item.quantity }} × {{ formatCurrency(item.price) }}</p>
                </div>
              </div>
              <span class="font-medium">{{ formatCurrency(item.price * item.quantity) }}</span>
            </div>
          </div>
  
          <div class="flex justify-between py-4 border-t border-gray-200">
            <span class="text-gray-600">Total</span>
            <span class="text-lg font-bold text-black">{{ formatCurrency(total) }}</span>
          </div>
  
          <button 
            @click="currentStep++"
            class="w-full mt-4 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
          >
            Continue to Payment
          </button>
        </div>
  
        <!-- Chapa Payment Form (Step 2) -->
        <div v-else-if="currentStep === 1" class="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Payment Information</h2>
          
          <!-- Payment Method Radio Buttons -->
          <div class="mb-6 space-y-3">
            <label 
              v-for="method in paymentMethods"
              :key="method.id"
              class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              :class="selectedMethod === method.id ? 'border-black bg-black/5' : 'border-gray-300'"
            >
              <input 
                type="radio" 
                v-model="selectedMethod" 
                :value="method.id" 
                class="h-5 w-5 text-black focus:ring-black"
              >
              <div class="flex items-center ml-4">
                <img 
                  :src="method.icon" 
                  :alt="method.name" 
                  class="h-8 w-8 object-contain mr-3"
                  @error="handleImageError"
                >
                <div>
                  <span class="font-medium block">{{ method.name }}</span>
                  <span class="text-xs text-gray-500">{{ method.description }}</span>
                </div>
              </div>
            </label>
          </div>
          <!-- Mobile Money/Telebirr Fields -->
        <div v-if="['mobile_money', 'telebirr'].includes(selectedMethod)" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span class="text-gray-500">+251</span>
              </div>
              <input
                v-model="payment.phone"
                type="tel"
                placeholder="912345678"
                class="w-full pl-14 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                @input="validatePhone"
              >
              <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
            </div>
          </div>
          
          <div v-if="selectedMethod === 'mobile_money'">
            <label class="block text-sm font-medium text-gray-700 mb-1">Network</label>
            <select
              v-model="payment.network"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            >
              <option value="etb">Ethiopian Birr (ETB)</option>
              <option value="telebirr">Telebirr</option>
            </select>
          </div>
        </div>

        <!-- Bank Transfer Fields -->
        <div v-if="selectedMethod === 'bank'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
            <select
              v-model="payment.bank"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
            >
              <option v-for="bank in banks" :value="bank.id">{{ bank.name }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
            <input
              v-model="payment.account"
              type="text"
              placeholder="100034567890"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              @input="validateAccount"
            >
            <p v-if="errors.account" class="mt-1 text-sm text-red-600">{{ errors.account }}</p>
          </div>
        </div>
        <div class="flex justify-between mt-8">
          <button 
            @click="currentStep--"
            class="px-4 py-2 text-gray-600 hover:text-black flex items-center"
          >
            ← Back
          </button>
          <button 
            @click="processPayment"
            class="px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
            :disabled="processing  !isFormValid"
          >
            <span v-if="!processing">Pay {{ formatCurrency(total) }}</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          </button>
        </div>
      </div>

      <!-- Confirmation (Step 3) -->
      <div v-else class="bg-white p-8 rounded-lg shadow-sm border border-gray-300 text-center">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p class="text-gray-600 mb-4">Your order #{{ orderId }} is confirmed.</p>
        <div class="bg-gray-50 p-4 rounded-lg mb-6 text-left">
          <p class="text-sm font-medium">Payment Method: <span class="capitalize">{{ paymentMethods.find(m => m.id === selectedMethod)?.name }}</span></p>
          <p class="text-sm mt-1">Amount: <span class="font-medium">{{ formatCurrency(total) }}</span></p>
          <p class="text-sm mt-1">Date: <span class="font-medium">{{ new Date().toLocaleDateString() }}</span></p>
        </div>
        <button 
          @click="resetCheckout"
          class="px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
        >
          Back to Comics
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// Payment configuration
const currentStep = ref(0)
const steps = ['Cart', 'Payment', 'Complete']
const progressWidth = computed(() => `${(currentStep / (steps.length - 1)) * 100}%`)

const cart = [
  {
    id: 1,
    name: "Premium Comics Access",
    price: 250, // ETB
    quantity: 1,
    image: "https://placehold.co/100/000000/white?text=COMIC"
  }
]

const total = computed(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0))

// Ethiopian banks data
const banks = [
  { id: 'cbe', name: 'Commercial Bank of Ethiopia' },
  { id: 'awash', name: 'Awash Bank' },
  { id: 'dashen', name: 'Dashen Bank' },
  { id: 'abyssinia', name: 'Abyssinia Bank' },
  { id: 'nib', name: 'Nib International Bank' }
]

// Payment methods with online logos
const paymentMethods = [
  { 
    id: 'mobile_money', 
    name: 'Mobile Money', 
    icon: 'https://raw.githubusercontent.com/chapa-io/chapa-brand-assets/main/icons/mobile-money.png',
    description: 'Instant payment via mobile wallet'
  },
  { 
    id: 'telebirr', 
    name: 'Telebirr', 
    icon: 'https://telebirr.ethiotelecom.et/wp-content/uploads/2021/08/telebirr-logo.png',
    description: 'Ethio Telecom mobile payment'
  },
  { 
    id: 'bank', 
    name: 'Bank Transfer', 
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/CBE_logo.svg/1200px-CBE_logo.svg.png',
    description: 'Direct bank transfer'
  },
  { 
    id: 'card', 
    name: 'Debit/Credit Card', 
    // icon: 'https://upload.wikimedia.org/wikipedia/commons
    // /thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png',
    description: 'Visa, Mastercard, etc.'
  }
]

const selectedMethod = ref('mobile_money')
const processing = ref(false)
const orderId = ref('COMIC-' + Math.floor(Math.random() * 10000))

// Payment data with validation
const payment = reactive({
  name: '',
  email: '',
  phone: '',
  network: 'etb',
  bank: 'cbe',
  account: '',
  cardNumber: '',
  expiry: '',
  cvv: ''
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  account: '',
  cardNumber: '',
  expiry: '',
  cvv: ''
})

// Handle image loading errors
const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/40/cccccc/999999?text=PM'
}

// Validation functions
const validateName = () => {
  if (!payment.name.trim()) errors.name = 'Full name is required'
  else if (payment.name.length < 3) errors.name = 'Name too short'
  else errors.name = ''
}

const validateEmail = () => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!payment.email) errors.email = 'Email is required'
  else if (!re.test(payment.email)) errors.email = 'Invalid email format'
  else errors.email = ''
}

const validatePhone = () => {
  const re = /^9\d{8}$/
  if (!payment.phone) errors.phone = 'Phone number is required'
  else if (!re.test(payment.phone)) errors.phone = 'Invalid Ethiopian phone number (e.g. 912345678)'
  else errors.phone = ''
}

const validateAccount = () => {
  if (!payment.account) errors.account = 'Account number is required'
  else if (payment.account.length < 10) errors.account = 'Account number too short'
  else errors.account = ''
}

const validateCardNumber = () => {
  const cleaned = payment.cardNumber.replace(/\s/g, '')
  if (!cleaned) errors.cardNumber = 'Card number is required'
  else if (cleaned.length < 16) errors.cardNumber = 'Invalid card number'
  else errors.cardNumber = ''
}

const validateExpiry = () => {
  const re = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/
  if (!payment.expiry) errors.expiry = 'Expiry date is required'
  else if (!re.test(payment.expiry)) errors.expiry = 'Invalid format (MM/YY)'
  else errors.expiry = ''
}

const validateCVV = () => {
  if (!payment.cvv) errors.cvv = 'CVV is required'
  else if (payment.cvv.length !== 3) errors.cvv = 'Must be 3 digits'
  else errors.cvv = ''
}

// Form validation state
const isFormValid = computed(() => {
  if (!payment.name !payment.email) return false
  
  if (['mobile_money', 'telebirr'].includes(selectedMethod.value)) {
    return !errors.phone && !!payment.phone
  }
  
  if (selectedMethod.value === 'bank') {
    return !errors.account && !!payment.account
  }
  
  if (selectedMethod.value === 'card') {
    return !errors.cardNumber && !errors.expiry && !errors.cvv && 
           !!payment.cardNumber && !!payment.expiry && !!payment.cvv
  }
  
  return true
})

// Formatting functions
const formatCurrency = (amount) => {
  return 'ETB ' + amount.toFixed(2)
}

const formatCardNumber = () => {
  payment.cardNumber = payment.cardNumber.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
  validateCardNumber()
}

const formatExpiry = () => {
  payment.expiry = payment.expiry.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2').substring(0, 5)
  validateExpiry()
}
// Process payment
const processPayment = async () => {
  // Validate all fields
  validateName()
  validateEmail()
  
  if (['mobile_money', 'telebirr'].includes(selectedMethod.value)) {
    validatePhone()
  } else if (selectedMethod.value === 'bank') {
    validateAccount()
  } else if (selectedMethod.value === 'card') {
    validateCardNumber()
    validateExpiry()
    validateCVV()
  }
  
  if (!isFormValid.value) return
  
  processing.value = true
  
  try {
    // In a real app, call your backend API here
    const response = await fetch('/api/chapa-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: total.value,
        currency: 'ETB',
        email: payment.email,
        first_name: payment.name.split(' ')[0],
        last_name: payment.name.split(' ')[1]  '',
        tx_ref: orderId.value,
        payment_method: selectedMethod.value,
        ...(selectedMethod.value === 'mobile_money' && {
          phone_number: `+251${payment.phone}`,
          network: payment.network
        }),
        ...(selectedMethod.value === 'bank' && {
          bank_code: payment.bank,
          account_number: payment.account
        }),
        ...(selectedMethod.value === 'card' && {
          card_number: payment.cardNumber.replace(/\s/g, ''),
          expiry_date: payment.expiry,
          cvv: payment.cvv
        })
      })
    })
    
    const data = await response.json()
    
    if (data.status === 'success') {
      currentStep.value++
    } else {
      alert(`Payment failed: ${data.message  'Unknown error'}`)
    }
  } catch (error) {
    alert(Payment error: ${error.message})
  } finally {
    processing.value = false
  }
}

const resetCheckout = () => {
  currentStep.value = 0
  Object.assign(payment, {
    name: '',
    email: '',
    phone: '',
    network: 'etb',
    bank: 'cbe',
    account: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  })
  Object.keys(errors).forEach(key => errors[key] = '')
}
</script>

<style>
/* Custom radio button styling */
input[type="radio"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  outline: none;
  transition: all 0.2s ease;
  position: relative;
}

input[type="radio"]:checked {
  border-color: #000;
  background-color: #000;
}

input[type="radio"]:checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
}
</style>