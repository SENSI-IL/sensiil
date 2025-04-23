<template>
    <div>
      <FormNav />
      <div class="signup-container">
        <!-- Role Selection Cards -->
        <div class="choice-container">
          <h1 class="text-3xl font-bold text-center mb-6">Select Your Role</h1>
          <div class="choices">
            <!-- Creator Option -->
            <div 
              class="choice-card" 
              :class="{'selected': role === 'creator'}"
              @click="selectRole('creator')"
            >
              <div class="choice-content">
                <h2 class="text-xl font-semibold">Creator</h2>
                <p>As a Creator, you can:</p>
                <ul>
                  <li>Create and manage your portfolio</li>
                  <li>Sell your comic art</li>
                  <li>Showcase your work on your profile</li>
                  <li>Get jobs</li>
                </ul>
              </div>
            </div>
  
            <!-- Explorer Option -->
            <div 
              class="choice-card" 
              :class="{'selected': role === 'explorer'}"
              @click="selectRole('explorer')"
            >
              <div class="choice-content">
                <h2 class="text-xl font-semibold">Explorer</h2>
                <p>As an Explorer, you can:</p>
                <ul>
                  <li>Browse and discover art</li>
                  <li>Purchase art from creators</li>
                  <li>Save your favorite works</li>
                  <li>Post your jobs and hiring comic artists</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // State to store the selected role
  const role = ref(null);
  
  // Function to handle role selection and redirect based on role
  const selectRole = (selectedRole) => {
    role.value = selectedRole;
  
    // Redirect to the appropriate signup page based on role
    if (selectedRole === 'creator') {
      router.push('/sign-up/creator/signup-creator');
    } else if (selectedRole === 'explorer') {
      router.push('/explorer/signup-explorer');
    }
  };
  </script>
  
  <style scoped>
  .signup-container {
    max-width: 900px;
    margin: auto;
    padding: 2rem;
    margin-top: 8rem;
    position: relative;
  }
  
  .choice-container {
    text-align: center;
  }
  
  .choices {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
  
  .choice-card {
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid #ddd;
    width: 300px;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .choice-card.selected {
    border-color: #00796b; /* Highlight selected card */
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
  
  .choice-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
  
  .choice-content {
    text-align: left;
  }
  
  h2 {
    margin-bottom: 1rem;
  }
  
  ul {
    list-style-type: disc;
    text-align: left;
    margin: 0;
    padding: 0;
    padding-left: 1.5rem;
  }
  </style>
  