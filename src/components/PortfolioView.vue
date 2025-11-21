<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from '@/components/Navbar.vue'

// --- INTERFACES ---
interface ProyectoDto {
  nombreProyecto: string
  descripcion: string
  imagenUrl: string
  imagenUrl2?: string
  imagenUrl3?: string
  imagenUrl4?: string
  nombreCliente: string
  clienteLogoUrl?: string
}

interface ProyectoFrontend extends ProyectoDto {
  todasLasImagenes: string[]
}

// --- ESTADO ---
const activeTab = ref<'destacados' | 'galeria'>('destacados')

// Estado Proyectos
const proyectos = ref<ProyectoFrontend[]>([])
const loadingProyectos = ref(false)

// Estado Galería
const galleryImages = ref<string[]>([])
const galleryPage = ref(1)
const galleryLoading = ref(false)
const galleryHasMore = ref(true)
const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

// --- FUNCIONES DE AYUDA ---
// Función para recortar el texto a N caracteres
const truncateText = (text: string, length: number) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

// --- FUNCIONES DE CARGA ---
const fetchProyectos = async () => {
  loadingProyectos.value = true
  try {
    const response = await fetch('https://app.laberintospraderas.com/api/portfolio/proyectos')
    if (response.ok) {
      const data: ProyectoDto[] = await response.json()

      proyectos.value = data.map((p) => {
        const imgs: string[] = []
        if (p.imagenUrl) imgs.push(p.imagenUrl)
        if (p.imagenUrl2) imgs.push(p.imagenUrl2)
        if (p.imagenUrl3) imgs.push(p.imagenUrl3)
        if (p.imagenUrl4) imgs.push(p.imagenUrl4)

        return {
          ...p,
          todasLasImagenes: imgs,
        }
      })
    }
  } catch (error) {
    console.error('Error cargando proyectos:', error)
  } finally {
    loadingProyectos.value = false
  }
}

const fetchGallery = async () => {
  if (galleryLoading.value || !galleryHasMore.value) return
  galleryLoading.value = true
  try {
    const response = await fetch(
      `https://app.laberintospraderas.com/api/portfolio/gallery-images?page=${galleryPage.value}&pageSize=20`,
    )
    const data = await response.json()
    if (data.items && data.items.length > 0) {
      galleryImages.value.push(...data.items)
      galleryPage.value++
      if (galleryPage.value > data.totalPages) galleryHasMore.value = false
    } else {
      galleryHasMore.value = false
    }
  } catch {
    galleryHasMore.value = false
  } finally {
    galleryLoading.value = false
  }
}

// --- NAVEGACIÓN ---
const irADetalle = (proyecto: ProyectoFrontend) => {
  console.log('Navegar a detalle de:', proyecto.nombreProyecto)
}

const abrirLightbox = (imgUrl: string) => {
  console.log('Abrir imagen en grande:', imgUrl)
}

// --- CICLO DE VIDA ---
const startObserver = () => {
  if (observer) observer.disconnect()
  observer = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting && activeTab.value === 'galeria') fetchGallery()
  })
  setTimeout(() => {
    if (sentinel.value && observer) observer.observe(sentinel.value)
  }, 100)
}

onMounted(() => {
  fetchProyectos()
  if (activeTab.value === 'galeria') {
    fetchGallery()
    startObserver()
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

const switchTab = (tab: 'destacados' | 'galeria') => {
  activeTab.value = tab
  if (tab === 'galeria') {
    if (galleryImages.value.length === 0) fetchGallery()
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

        <!-- PESTAÑAS -->
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

        <!-- TAB 1: PROYECTOS DESTACADOS -->
        <section v-if="activeTab === 'destacados'" class="animate-fade-in">
          <div v-if="loadingProyectos" class="text-center py-20">
            <div
              class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"
            ></div>
          </div>

          <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- TARJETA DE PROYECTO -->
            <article
              v-for="(proyecto, index) in proyectos"
              :key="index"
              class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100"
            >
              <!-- ÁREA DE IMÁGENES (Mosaico Dinámico) -->
              <div class="w-full aspect-[4/3] bg-gray-100 p-1">
                <div class="flex h-full w-full gap-1">
                  <!-- 1. IMAGEN PRINCIPAL -->
                  <div
                    @click="irADetalle(proyecto)"
                    :class="[
                      'h-full relative overflow-hidden rounded-lg cursor-pointer group',
                      proyecto.todasLasImagenes.length > 1 ? 'w-3/4' : 'w-full',
                    ]"
                  >
                    <img
                      :src="proyecto.imagenUrl"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity"
                    ></div>
                  </div>

                  <!-- 2. COLUMNA DERECHA (Miniaturas) -->
                  <div
                    v-if="proyecto.todasLasImagenes.length > 1"
                    class="w-1/4 flex flex-col gap-1 h-full"
                  >
                    <div
                      v-for="(imgExtra, i) in proyecto.todasLasImagenes.slice(1)"
                      :key="i"
                      @click.stop="abrirLightbox(imgExtra)"
                      class="relative flex-1 overflow-hidden rounded-lg cursor-zoom-in group"
                    >
                      <img
                        :src="imgExtra"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div
                        class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ÁREA DE TEXTO -->
              <div class="p-6 flex flex-col flex-grow cursor-pointer" @click="irADetalle(proyecto)">
                <div class="flex items-center justify-between mb-3">
                  <h3
                    class="text-xl font-bold text-gray-900 line-clamp-1"
                    :title="proyecto.nombreProyecto"
                  >
                    {{ proyecto.nombreProyecto }}
                  </h3>
                  <img
                    v-if="proyecto.clienteLogoUrl"
                    :src="proyecto.clienteLogoUrl"
                    class="h-8 w-auto object-contain opacity-80"
                    :title="proyecto.nombreCliente"
                  />
                </div>

                <!-- DESCRIPCIÓN TRUNCADA A 150 CARACTERES -->
                <p class="text-gray-600 text-sm mb-4 flex-grow">
                  {{ truncateText(proyecto.descripcion, 150) }}
                </p>

                <div
                  class="pt-4 border-t border-gray-50 flex items-center text-blue-600 text-sm font-semibold group"
                >
                  Ver Detalles
                  <svg
                    class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </div>
            </article>
          </div>
        </section>

        <!-- TAB 2: GALERÍA COMPLETA -->
        <section v-if="activeTab === 'galeria'" class="animate-fade-in">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div
              v-for="(imgUrl, index) in galleryImages"
              :key="index"
              class="group relative aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-zoom-in"
              @click="abrirLightbox(imgUrl)"
            >
              <img
                :src="imgUrl"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
          <div ref="sentinel" class="h-24 py-8 flex justify-center items-center w-full">
            <div v-if="galleryLoading" class="flex items-center space-x-2 text-gray-500">
              <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100"></div>
              <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            </div>
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
