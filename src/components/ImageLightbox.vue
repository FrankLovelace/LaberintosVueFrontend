<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  isOpen: boolean
  imageUrl: string | null
}>()

const emit = defineEmits(['close'])

const zoomStyle = ref({})

const resetZoom = () => {
  zoomStyle.value = {
    transformOrigin: 'center center',
    transform: 'scale(1)',
    cursor: 'zoom-in',
  }
}

// Resetear si cambia la imagen o se cierra
watch(() => props.imageUrl, resetZoom)
watch(
  () => props.isOpen,
  (val) => {
    if (!val) resetZoom()
  },
)

const close = () => emit('close')

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) close()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen && imageUrl"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      @click.self="close"
    >
      <!-- Botón Cerrar -->
      <button
        @click="close"
        class="absolute top-4 right-4 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
        title="Cerrar (Esc)"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

      <!-- Contenedor de Imagen -->
      <div class="relative w-full h-full p-4 flex items-center justify-center overflow-hidden">
        <img
          :src="imageUrl"
          class="max-w-full max-h-full object-contain shadow-2xl transition-transform duration-200 ease-out select-none"
          :style="zoomStyle"
          @click.stop=""
        />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
