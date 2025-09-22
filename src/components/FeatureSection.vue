<script setup lang="ts">
// Definimos las "props" que este componente puede recibir.
// Esto nos permite pasarle datos desde la página que lo use.
defineProps({
  title: String,
  description: String,
  imageUrl: String,
  // Esta prop booleana nos permite controlar si la imagen va a la izquierda o a la derecha
  imageOnLeft: {
    type: Boolean,
    default: true, // Por defecto, la imagen estará a la izquierda
  },
})
</script>

<template>
  <div class="grid md:grid-cols-2 gap-12 items-center">
    <div :class="imageOnLeft ? 'md:order-1' : 'md:order-2'">
      <img :src="imageUrl" :alt="title" class="rounded-lg shadow-lg w-96 h-auto mx-auto" />
    </div>

    <div :class="imageOnLeft ? 'md:order-2' : 'md:order-1'">
      <h3 class="text-3xl font-bold text-gray-800">{{ title }}</h3>
      <p class="mt-4 text-lg text-gray-600">
        {{ description }}
      </p>
    </div>
  </div>
</template>
