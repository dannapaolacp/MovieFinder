<script setup>
// Import libraries
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheMovieFinder from '@/components/TheMovieFinder.vue';
</script>

<!-- Define template -->
<template>
    <div class="container">
        <TheHeader />
        <TheMovieFinder />
        <TheFooter />
    </div>
</template>

<!-- Define styles -->
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
</style>
