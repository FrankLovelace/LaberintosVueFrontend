<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ProjectModal from '@/components/ProjectModal.vue'
import ImageLightbox from '@/components/ImageLightbox.vue'

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
const proyectos = ref<ProyectoFrontend[]>([])
const loadingProyectos = ref(false)

// Estado para el Modal
const isModalOpen = ref(false)
const selectedProject = ref<ProyectoFrontend | null>(null)
const selectedInitialImage = ref<string | undefined>(undefined) // <-- NUEVO: Guarda la imagen clickeada

// Estado Galería
const galleryImages = ref<string[]>([])
const galleryPage = ref(1)
const galleryLoading = ref(false)
const galleryHasMore = ref(true)
const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

// Estado Lightbox
const isLightboxOpen = ref(false)
const selectedGalleryImage = ref('')

const abrirLightbox = (url: string) => {
  selectedGalleryImage.value = url
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const cerrarLightbox = () => {
  isLightboxOpen.value = false
  document.body.style.overflow = 'auto'
}

const truncateText = (text: string, length: number) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

// --- LÓGICA DEL MODAL ---
const abrirModalProyecto = (proyecto: ProyectoFrontend, imagenInicial?: string) => {
  selectedProject.value = proyecto
  selectedInitialImage.value = imagenInicial // Guardamos cuál imagen se clickeó
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const cerrarModal = () => {
  isModalOpen.value = false
  setTimeout(() => {
    selectedProject.value = null
  }, 300)
  document.body.style.overflow = 'auto'
}

// --- CARGA DE DATOS ---
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
        return { ...p, todasLasImagenes: imgs }
      })
    }
  } catch (error) {
    console.error(error)
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

        <!-- Pestañas -->
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
              <div
                class="w-full aspect-[4/3] bg-gray-100 p-1 cursor-pointer"
                @click="abrirModalProyecto(proyecto)"
              >
                <div class="flex h-full w-full gap-1">
                  <!-- 1. IMAGEN PRINCIPAL (Izquierda) -->
                  <!-- Se ajusta el ancho dinámicamente según si hay más imágenes o no -->
                  <div
                    :class="[
                      'h-full relative overflow-hidden rounded-lg group',
                      proyecto.todasLasImagenes.length > 2
                        ? 'w-3/4'
                        : proyecto.todasLasImagenes.length === 2
                          ? 'w-2/3'
                          : 'w-full',
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
                    :class="[
                      'flex flex-col gap-1 h-full',
                      proyecto.todasLasImagenes.length === 2 ? 'w-1/3' : 'w-1/4',
                    ]"
                  >
                    <div
                      v-for="(imgExtra, i) in proyecto.todasLasImagenes.slice(1)"
                      :key="i"
                      class="relative flex-1 overflow-hidden rounded-lg group"
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
              <div
                class="p-6 flex flex-col flex-grow cursor-pointer"
                @click="abrirModalProyecto(proyecto)"
              >
                <div class="flex items-center justify-between mb-3">
                  <h3 class="text-xl font-bold text-gray-900 line-clamp-1">
                    {{ proyecto.nombreProyecto }}
                  </h3>
                  <img
                    v-if="proyecto.clienteLogoUrl"
                    :src="proyecto.clienteLogoUrl"
                    class="h-8 w-auto object-contain opacity-80"
                  />
                </div>
                <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                  {{ truncateText(proyecto.descripcion, 150) }}
                </p>
                <div
                  class="pt-4 border-t border-gray-50 flex items-center text-blue-600 text-sm font-semibold group"
                >
                  Ver Detalles Completos
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
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
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
            <!-- Spinner -->
            <div v-if="galleryLoading" class="flex items-center space-x-2 text-gray-500">
              <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100"></div>
              <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <ProjectModal
      :isOpen="isModalOpen"
      :project="selectedProject"
      :initialImage="selectedInitialImage"
      @close="cerrarModal"
    />
    <ImageLightbox
      :isOpen="isLightboxOpen"
      :imageUrl="selectedGalleryImage"
      @close="cerrarLightbox"
    />
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
</style>
