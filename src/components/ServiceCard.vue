<script setup lang="ts">
import { useImagePreview } from '@/stores/ImagePreviewStore' // <-- 1. IMPORTAR

const props = defineProps({
  // <-- 2. GUARDAMOS LAS PROPS EN UNA VARIABLE
  title: String,
  description: String,
  imageUrl: String,
  features: Array as () => string[],
})

// Obtenemos las funciones de nuestro store
const { showPreview, hidePreview } = useImagePreview()

// Función para llamar a showPreview con la URL de esta tarjeta
const handleMouseEnter = () => {
  if (props.imageUrl) {
    showPreview(props.imageUrl)
  }
}
</script>

<template>
  <div
    @mouseenter="handleMouseEnter"
    @mouseleave="hidePreview"
    class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
  >
    <img :src="imageUrl" :alt="title" class="w-full h-56 object-cover" />
    <div class="p-6">
      <h3 class="text-2xl font-bold text-gray-800">{{ title }}</h3>
      <p class="mt-2 text-gray-600">{{ description }}</p>
      <ul class="mt-4 space-y-2">
        <li v-for="feature in features" :key="feature" class="flex items-start">
          <svg
            class="flex-shrink-0 h-6 w-6 text-accent mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span class="text-gray-700">{{ feature }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
