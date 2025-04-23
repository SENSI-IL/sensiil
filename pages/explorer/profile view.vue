<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- Cover Photo with darker overlay -->
    <div class="h-48 rounded-t-lg overflow-hidden relative">
      <img 
        src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
        class="w-full h-full object-cover"
        alt="Comic book cover background"
      >
      <div class="absolute inset-0 bg-black bg-opacity-30"></div>
    </div>

    <!-- Profile Header - Explorer View -->
    <div class="flex flex-col sm:flex-row items-start px-6">
      <!-- Avatar -->
      <div class="relative -mt-12 sm:-mt-16 mr-6">
        <img 
          :src="user.avatar" 
          class="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
        >
      </div>
      
      <!-- Name, title and bio section -->
      <div class="flex-1 mt-4 sm:mt-0">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ user.name }}</h1>
            <p class="text-xl font-medium text-gray-700 mt-1">{{ user.title }}</p>
          </div>
          <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Follow
          </button>
        </div>
        
        <p class="text-gray-600 mt-4">{{ user.bio }}</p>
      </div>
    </div>

    <!-- Comics Section - Explorer View -->
    <div class="mt-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">{{ user.name }}'s Comics</h2>
        <div class="flex space-x-2">
          <button 
            v-for="sortOption in sortOptions" 
            :key="sortOption"
            @click="activeSort = sortOption"
            class="px-3 py-1 text-sm rounded-full border hover:bg-gray-100"
            :class="{ 'bg-black text-white border-black hover:bg-gray-800': activeSort === sortOption }"
          >
            {{ sortOption }}
          </button>
        </div>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div 
          v-for="comic in sortedComics" 
          :key="comic.id" 
          class="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <div class="relative">
            <img :src="comic.image" class="w-full h-48 object-cover group-hover:opacity-90">
            <div class="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {{ comic.rating }}
            </div>
          </div>
          <div class="p-4">
            <h3 class="font-bold text-lg mb-1">{{ comic.title }}</h3>
            <p class="text-sm text-gray-600">{{ comic.date }}</p>
            <div class="mt-3 flex justify-between items-center">
              <span class="text-xs text-gray-500">{{ comic.views }} views</span>
              <button class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                Read Now
              </button>
            </div>
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
      activeSort: 'Popular',
      sortOptions: ['Popular', 'Newest', 'Top Rated'],
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
            date: 'Jan 15, 2023',
            views: '124.5K',
            rating: 4.8
          },
          { 
            id: 2, 
            title: 'Marvels', 
            image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', 
            date: 'Feb 20, 2023',
            views: '89.2K',
            rating: 4.7
          },
          { 
            id: 3, 
            title: 'Justice', 
            image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', 
            date: 'Mar 5, 2023',
            views: '76.8K',
            rating: 4.6
          }
        ]
      }
    }
  },
  computed: {
    sortedComics() {
      if (this.activeSort === 'Newest') {
        return [...this.user.comics].sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (this.activeSort === 'Top Rated') {
        return [...this.user.comics].sort((a, b) => b.rating - a.rating);
      }
      // Default: Popular (by views)
      return [...this.user.comics].sort((a, b) => 
        parseFloat(b.views.replace('K', '')) - parseFloat(a.views.replace('K', '')));
    }
  }
}
</script>

<style>
/* Optional custom styles */
.hover\:shadow-lg {
  transition: box-shadow 0.3s ease;
}
</style>