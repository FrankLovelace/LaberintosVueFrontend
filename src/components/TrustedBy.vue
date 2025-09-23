<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Cliente {
  id: number
  nombre: string
  logoUrl: string
  LinkExterno?: string // Verifica que el nombre sea exactamente este
}

const clientes = ref<Cliente[]>([])
const isLoading = ref<boolean>(true)

onMounted(async () => {
  try {
    const response = await fetch('https://app.laberintospraderas.com/api/portfolio/clientes')
    if (!response.ok) {
      throw new Error('Error al cargar los clientes')
    }
    const data = await response.json()
    clientes.value = data
  } catch (error) {
    console.error(error)
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

      <div v-if="isLoading" class="mt-12">
        <p>Cargando logos...</p>
      </div>

      <div v-else class="mt-12 flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
        <div v-for="cliente in clientes" :key="cliente.id">
          <a
            v-if="cliente.LinkExterno"
            :href="cliente.LinkExterno"
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
