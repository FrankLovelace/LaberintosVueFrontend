<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// --- ESTADO ---
// Iniciamos en 'galeria' para ver el resultado de tu trabajo inmediatamente
const activeTab = ref<'destacados' | 'galeria'>('galeria')

// Estado para Galería Infinita
const galleryImages = ref<string[]>([])
const galleryPage = ref(1)
const galleryLoading = ref(false)
const galleryHasMore = ref(true)
const sentinel = ref<HTMLElement | null>(null) // El elemento "vigía" para el scroll infinito
let observer: IntersectionObserver | null = null

// --- FUNCIONES DE CARGA ---

// Cargar Galería Infinita (Usa tu nuevo endpoint)
const fetchGallery = async () => {
  if (galleryLoading.value || !galleryHasMore.value) return

  galleryLoading.value = true
  try {
    const response = await fetch(
      `https://app.laberintospraderas.com/api/portfolio/gallery-images?page=${galleryPage.value}&pageSize=20`,
    )
    if (!response.ok) throw new Error('Error en la petición')

    const data = await response.json()

    if (data.items && data.items.length > 0) {
      galleryImages.value.push(...data.items)
      galleryPage.value++ // Preparamos la siguiente página

      if (galleryPage.value > data.totalPages) {
        galleryHasMore.value = false
      }
    } else {
      galleryHasMore.value = false
    }
  } catch (error) {
    console.error('Error cargando galería:', error)
    galleryHasMore.value = false
  } finally {
    galleryLoading.value = false
  }
}

// --- CICLO DE VIDA Y OBSERVER ---

const startObserver = () => {
  // Limpiamos observer previo si existe
  if (observer) observer.disconnect()

  observer = new IntersectionObserver(([entry]) => {
    // Solo cargamos si el elemento es visible Y estamos en la pestaña de galería
    if (entry && entry.isIntersecting && activeTab.value === 'galeria') {
      fetchGallery()
    }
  })

  // Pequeño timeout para asegurar que el elemento 'sentinel' ya se renderizó en el DOM
  setTimeout(() => {
    if (sentinel.value && observer) {
      observer.observe(sentinel.value)
    }
  }, 100)
}

onMounted(() => {
  // Si iniciamos en galería, arrancamos la carga
  if (activeTab.value === 'galeria') {
    fetchGallery()
    startObserver()
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

// Lógica al cambiar de pestaña
const switchTab = (tab: 'destacados' | 'galeria') => {
  activeTab.value = tab

  if (tab === 'galeria') {
    // Si la galería está vacía, hacemos la primera carga
    if (galleryImages.value.length === 0) {
      fetchGallery()
    }
    // Reconectamos el observer
    startObserver()
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <Navbar />

    <main class="pt-24 pb-12">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-800 mb-4">Nuestro Portafolio</h1>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Explora nuestra trayectoria creando sonrisas a través de proyectos únicos.
          </p>
        </div>

        <!-- PESTAÑAS (TABS) -->
        <div class="flex justify-center mb-10 border-b border-gray-200">
          <button
            @click="switchTab('destacados')"
            :class="[
              'px-6 py-3 font-medium text-lg transition-colors border-b-2 mb-[-2px]',
              activeTab === 'destacados'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            ]"
          >
            Proyectos Destacados
          </button>
          <button
            @click="switchTab('galeria')"
            :class="[
              'px-6 py-3 font-medium text-lg transition-colors border-b-2 mb-[-2px]',
              activeTab === 'galeria'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            ]"
          >
            Galería Completa
          </button>
        </div>

        <!-- TAB 1: PROYECTOS DESTACADOS (PLACEHOLDER) -->
        <section
          v-if="activeTab === 'destacados'"
          class="animate-fade-in flex justify-center py-20"
        >
          <div
            class="text-center p-10 bg-white rounded-xl shadow-sm border border-gray-100 max-w-md"
          >
            <div class="text-6xl mb-4">🚀</div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Hello World!</h2>
            <p class="text-gray-500">
              Estamos preparando una selección detallada de nuestros mejores proyectos. ¡Vuelve
              pronto para verlos!
            </p>
          </div>
        </section>

        <!-- TAB 2: GALERÍA COMPLETA (GRID INFINITO) -->
        <section v-if="activeTab === 'galeria'" class="animate-fade-in">
          <!-- Grid de Imágenes -->
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div
              v-for="(imgUrl, index) in galleryImages"
              :key="index"
              class="group relative aspect-square bg-gray-200 rounded-lg overflow-hidden"
            >
              <img
                :src="imgUrl"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt="Proyecto Laberintos"
              />
              <!-- Overlay sutil al hacer hover -->
              <div
                class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"
              ></div>
            </div>
          </div>

          <!-- Elemento centinela para Infinite Scroll -->
          <div ref="sentinel" class="h-24 py-8 flex justify-center items-center w-full">
            <div v-if="galleryLoading" class="flex items-center space-x-2 text-gray-500">
              <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100"></div>
              <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            </div>
            <p
              v-else-if="!galleryHasMore && galleryImages.length > 0"
              class="text-gray-400 text-sm"
            >
              Has llegado al final de la galería.
            </p>
            <p
              v-else-if="!galleryHasMore && galleryImages.length === 0"
              class="text-gray-400 text-sm"
            >
              Aún no hay imágenes en la galería.
            </p>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.delay-100 {
  animation-delay: 0.1s;
}
.delay-200 {
  animation-delay: 0.2s;
}
</style>
