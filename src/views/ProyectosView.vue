<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import PortfolioView from '@/components/PortfolioView.vue'
</script>

<template>
  <div>
    <Navbar />
    <main class="text-center py-20">
      <h1 class="text-4xl font-bold text-gray-800">Nuestros Proyectos</h1>
      <PortfolioView />
    </main>
  </div>
</template>
