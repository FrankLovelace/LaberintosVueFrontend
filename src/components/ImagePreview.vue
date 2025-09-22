<script setup lang="ts">
import { useImagePreview } from '@/stores/ImagePreviewStore'

// Obtenemos el estado y las funciones de nuestro store
const { isVisible, imageUrl } = useImagePreview()
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
  >
    <img
      :src="imageUrl"
      alt="Vista previa ampliada"
      class="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
    />
  </div>
</template>
