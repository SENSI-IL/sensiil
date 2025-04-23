<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- Cover Photo with darker overlay for better text contrast -->
    <div class="h-48 rounded-t-lg overflow-hidden relative">
      <img 
        src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
        class="w-full h-full object-cover"
        alt="Comic book cover background"
      >
      <div class="absolute inset-0 bg-black bg-opacity-30"></div>
    </div>

    <!-- Profile Header - Redesigned for better visibility -->
    <div class="flex flex-col sm:flex-row items-start px-6">
      <!-- Avatar with less negative margin -->
      <div class="relative -mt-12 sm:-mt-16 mr-6">
        <img 
          :src="user.avatar" 
          class="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
        >
        <button 
          @click="$refs.avatarInput.click()"
          class="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition"
        >
          ✏️
        </button>
        <input 
          type="file" 
          ref="avatarInput"
          class="hidden"
          @change="updateAvatar"
          accept="image/*"
        >
      </div>
      
      <!-- Name, title and bio section with clear hierarchy -->
      <div class="flex-1 mt-4 sm:mt-0">
        <h1 class="text-3xl font-bold text-gray-900">{{ user.name }}</h1>
        <p class="text-xl font-medium text-gray-700 mt-1">{{ user.title }}</p>
        <p class="text-gray-600 mt-3">{{ user.bio }}</p>
      </div>
    </div>

    <!-- Comic Upload Button -->
    <div class="mt-6 flex justify-end">
      <button 
        @click="showUploadModal = true"
        class="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-black transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Upload New Comic
      </button>
    </div>

    <!-- Comics Grid -->
    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-4">My Comics</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div 
          v-for="comic in user.comics" 
          :key="comic.id" 
          class="border rounded-lg overflow-hidden hover:shadow-md transition"
        >
          <img :src="comic.image" class="w-full h-48 object-cover">
          <div class="p-3">
            <h3 class="font-bold">{{ comic.title }}</h3>
            <p class="text-sm text-gray-600">{{ comic.date }}</p>
            <div class="mt-2 flex justify-between items-center">
              <span class="text-xs text-gray-500">{{ comic.views || 0 }} views</span>
              <button 
                @click="deleteComic(comic.id)"
                class="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Comic Modal -->
    <div v-if="showUploadModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Upload New Comic</h2>
          <button @click="closeUploadModal">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Title</label>
            <input 
              v-model="newComic.title" 
              type="text" 
              class="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter comic title"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Cover Image</label>
            <div 
              @click="$refs.comicInput.click()"
              class="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
            >
              <template v-if="!newComic.preview">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="mt-2 text-sm text-gray-600">Click to upload cover image</p>
                <p class="text-xs text-gray-500">PNG, JPG up to 5MB</p>
              </template>
              <img v-else :src="newComic.preview" class="h-40 mx-auto object-contain">
            </div>
            <input 
              type="file" 
              ref="comicInput"
              class="hidden"
              @change="handleComicUpload"
              accept="image/*"
            >
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button 
              @click="closeUploadModal"
              class="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              @click="uploadComic" 
              :disabled="!newComic.title || !newComic.image"
              :class="{'opacity-50 cursor-not-allowed': !newComic.title || !newComic.image}"
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Upload Comic
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showUploadModal: false,
      newComic: {
        title: '',
        image: null,
        preview: null
      },
      user: {
        name: 'Alex Ross',
        title: 'Legendary Comic Book Artist',
        avatar: 'https://i.pravatar.cc/150?img=3',
        bio: 'Known for my photorealistic painting style and work on Marvels, Kingdom Come, and Justice League. I combine classic superhero iconography with fine art techniques.',
        comics: [
          { 
            id: 1, 
            title: 'Kingdom Come', 
            image: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80', 
            date: '2023-01-15',
            views: 1245
          },
          { 
            id: 2, 
            title: 'Marvels', 
            image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 
            date: '2023-02-20',
            views: 892
          }
        ]
      }
    }
  },
  methods: {
    updateAvatar(e) {
      const file = e.target.files[0]
      if (file && file.size < 5000000) { // 5MB limit
        const reader = new FileReader()
        reader.onload = (event) => {
          this.user.avatar = event.target.result
        }
        reader.readAsDataURL(file)
      } else {
        alert('Please select an image smaller than 5MB')
      }
    },
    handleComicUpload(e) {
      const file = e.target.files[0]
      if (file && file.size < 5000000) { // 5MB limit
        this.newComic.image = file
        this.newComic.preview = URL.createObjectURL(file)
      } else {
        alert('Please select an image smaller than 5MB')
      }
    },
    uploadComic() {
      const newComic = {
        id: Date.now(),
        title: this.newComic.title,
        image: this.newComic.preview,
        date: new Date().toLocaleDateString(),
        views: 0
      }
      
      this.user.comics.unshift(newComic)
      this.closeUploadModal()
    },
    deleteComic(id) {
      if (confirm('Are you sure you want to delete this comic?')) {
        this.user.comics = this.user.comics.filter(comic => comic.id !== id)
      }
    },
    closeUploadModal() {
      this.showUploadModal = false
      this.newComic = {
        title: '',
        image: null,
        preview: null
      }
    }
  }
}
</script>

<style>
/* Optional custom styles */
.hover\:shadow-md {
  transition: box-shadow 0.3s ease;
}
</style>