<script setup>
// Import libraries
import { RouterLink } from 'vue-router';
</script>

<!-- Define template -->
<template>
  <div>
    <header>
      <nav class="navbar">
        <div class="container-fluid">
          <div class="navbar-brand">
            <router-link to="/" class="brand-link">
              <img src="../assets/img/Logo.png" alt="Logo" />
            </router-link>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>