<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// --- Interfaces para los Datos ---
interface ClientLogo {
  id: number
  logoUrl: string
  nombre?: string
}

interface PaginatedResponse {
  currentPage: number
  totalPages: number
  items: ClientLogo[]
}

// --- Estado Reactivo del Componente ---
const logos = ref<ClientLogo[]>([])
const currentPage = ref(1)
const totalPages = ref(1)
const isLoading = ref(false)
const observer = ref<IntersectionObserver | null>(null)
const sentinel = ref<HTMLElement | null>(null)

// --- Lógica para Cargar los Datos ---
const fetchLogos = async () => {
  if (isLoading.value || currentPage.value > totalPages.value) {
    return
  }

  isLoading.value = true
  try {
    const response = await fetch(
      `https://app.laberintospraderas.com/api/portfolio/gallery-logos?page=${currentPage.value}&pageSize=30`,
    )
    if (!response.ok) {
      throw new Error('Error al cargar la galería de logos')
    }
    const data: PaginatedResponse = await response.json()

    logos.value.push(...data.items)
    totalPages.value = data.totalPages
    currentPage.value++
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

// --- Configuración del "Infinite Scroll" ---
onMounted(() => {
  fetchLogos()

  observer.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      fetchLogos()
    }
  })

  if (sentinel.value) {
    observer.value.observe(sentinel.value)
  }
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})
</script>

<template>
  <div class="bg-white py-16">
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-3xl font-bold text-gray-800">Nuestra Galería de Clientes</h2>
      <p class="mt-4 text-gray-600 max-w-2xl mx-auto">
        Un vistazo a la amplia gama de clientes con los que hemos tenido el placer de colaborar a lo
        largo de los años.
      </p>

      <div class="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
        <div
          v-for="logo in logos"
          :key="logo.id"
          class="flex justify-center items-center h-40 p-4"
          :title="logo.nombre"
        >
          <img
            :src="logo.logoUrl"
            :alt="'Logo de ' + logo.nombre"
            class="max-h-full max-w-full object-contain"
          />
        </div>
      </div>

      <div ref="sentinel" class="h-10 mt-8">
        <div v-if="isLoading" class="flex justify-center items-center gap-x-3">
          <svg
            class="animate-spin h-5 w-5 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p class="text-gray-500">Cargando más logos...</p>
        </div>
      </div>
    </div>
  </div>
</template>
