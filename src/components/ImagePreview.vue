<script setup lang="ts">
import { useImagePreview } from '@/stores/ImagePreviewStore'
const { isVisible, imageUrl, hidePreview } = useImagePreview()
</script>

<template>
  <div
    v-if="isVisible"
    @click.self="hidePreview"
    class="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 cursor-pointer"
  >
    <img
      @click.stop
      :src="imageUrl"
      alt="Vista previa ampliada"
      class="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-default"
    />
  </div>
</template>
