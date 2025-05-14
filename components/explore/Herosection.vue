<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="title">Explore Stories That Speak to Your Soul</h1>
      <p class="subtitle">Dive into powerful comics crafted by Ethiopian artists.</p>
      <div class="hero-buttons">
        <router-link to="/exploring" class="btn explore-btn">Start Exploring</router-link>
        <router-link to="/sign-up/creator/signup-creator" class="btn creator-btn">Join as Creator</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
// No JS needed unless you want interactivity
</script>

<style scoped>
.hero {
  background-color: #1a1a1a;
  /* dark gray */
  color: white;
  padding: 5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-content {
  max-width: 700px;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s;
  text-decoration: none;
}

.explore-btn {
  background-color: white;
  color: black;
}

.creator-btn {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn:hover {
  transform: scale(1.05);
  background-color: #444;
  color: white;
}
</style>