<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import TrustedBy from '../components/TrustedBy.vue'
</script>

<template>
  <div>
    <Navbar />
    <main>
      <HeroSection />

      <div class="py-16 bg-white"></div>

      <TrustedBy />
    </main>
  </div>
</template>
