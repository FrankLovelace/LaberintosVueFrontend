<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="bg-primary text-white">
    <div class="container mx-auto px-6 py-16 text-center">
      <h2 class="text-3xl font-bold">Construyamos Juntos</h2>
      <p class="mt-4 max-w-2xl mx-auto text-blue-100">
        Confiamos en nuestra capacidad para transformar cualquier espacio en una aventura.
        Permítenos ser parte de tu próximo gran proyecto.
      </p>
      <RouterLink
        to="/contacto"
        class="mt-8 inline-block bg-accent text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-500 transition-transform hover:scale-105"
      >
        Contáctanos
      </RouterLink>
    </div>
  </section>
</template>
