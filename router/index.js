// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/index.vue';          // Adjust paths as needed
import Explore from '@/components/explore/exploreint.vue';
import About from '@/pages/about.vue';         // Create this file if missing
import Contact from '@/pages/contact.vue';     // Create this file if missing
import Login from '@/components/auth/login.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/explore', component: Explore },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/login', component: Login },
  // Add other routes (e.g., signup, password reset)
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;