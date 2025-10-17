<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Interfaz para definir la estructura de un cliente
interface Cliente {
  id: number
  nombre: string
  logoUrl: string

  linkExterno?: string
}

const clientes = ref<Cliente[]>([])
const isLoading = ref<boolean>(true)

// Función para asegurar que el link sea una URL absoluta
const formatLink = (url: string) => {
  if (!url) return '#'
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  // Añade https:// a los links que no lo tengan para asegurar que sean externos.
  return `https://${url}`
}

onMounted(async () => {
  try {
    const response = await fetch('https://app.laberintospraderas.com/api/portfolio/clientes')
    if (!response.ok) {
      throw new Error('Error al cargar los clientes')
    }
    const data = await response.json()
    clientes.value = data
  } catch (error) {
    console.error('Error al obtener los datos de los clientes:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="bg-gray-50 py-16">
    <div class="container mx-auto px-6 text-center">
      <h2 class="text-3xl font-bold text-gray-800">Nuestros Clientes Confían en Nosotros</h2>
      <p class="mt-4 text-gray-600 max-w-2xl mx-auto">
        Tenemos el honor de ser socios estratégicos de marcas líderes que avalan la calidad y
        seguridad de nuestro trabajo.
      </p>

      <!-- Estado de Carga -->
      <div v-if="isLoading" class="mt-12 flex justify-center items-center gap-x-3">
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
        <p class="text-gray-500">Cargando logos...</p>
      </div>

      <!-- Contenido Principal -->
      <div v-else class="mt-12 flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
        <!-- Itera sobre cada cliente -->
        <div v-for="cliente in clientes" :key="cliente.id">
          <!-- Si el cliente TIENE link, se renderiza como una etiqueta <a> -->
          <a
            v-if="cliente.linkExterno"
            :href="formatLink(cliente.linkExterno)"
            target="_blank"
            rel="noopener noreferrer"
            class="flex justify-center items-center h-20 w-40 transition duration-300 ease-in-out hover:opacity-75"
            :title="cliente.nombre"
          >
            <img
              :src="cliente.logoUrl"
              :alt="'Logo de ' + cliente.nombre"
              class="max-h-full max-w-full object-contain"
            />
          </a>
          <div v-else class="flex justify-center items-center h-20 w-40" :title="cliente.nombre">
            <img
              :src="cliente.logoUrl"
              :alt="'Logo de ' + cliente.nombre"
              class="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
