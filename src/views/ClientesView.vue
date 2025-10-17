<script setup lang="ts">
import LogoGallery from '@/components/LogoGallery.vue'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <Navbar />
  <main class="pt-20 pb-10">
    <section class="bg-white py-20">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-4xl font-bold text-gray-800">Clientes</h1>
      </div>
    </section>
  </main>
  <LogoGallery />
</template>
