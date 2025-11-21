<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

// Definimos la estructura del proyecto que recibimos
interface Proyecto {
  nombreProyecto: string
  descripcion: string
  todasLasImagenes: string[]
  nombreCliente: string
  clienteLogoUrl?: string
}

const props = defineProps<{
  isOpen: boolean
  project: Proyecto | null
}>()

const emit = defineEmits(['close'])

// Estado de la imagen seleccionada actualmente en el visor
const currentImage = ref('')

// --- ESTADO Y LÓGICA PARA EL ZOOM ---
const zoomStyle = ref({}) // Estilos dinámicos para aplicar el zoom

const handleMouseMove = (e: MouseEvent) => {
  const img = e.target as HTMLImageElement

  // Obtenemos las dimensiones y posición de la imagen en la pantalla
  const { left, top, width, height } = img.getBoundingClientRect()

  // Calculamos la posición del mouse como porcentaje relativo a la imagen
  const x = ((e.clientX - left) / width) * 100
  const y = ((e.clientY - top) / height) * 100

  // Aplicamos el zoom hacia esa posición exacta
  zoomStyle.value = {
    transformOrigin: `${x}% ${y}%`,
    transform: 'scale(2)', // Nivel de zoom (2x)
    cursor: 'zoom-out',
  }
}

const resetZoom = () => {
  // Regresamos la imagen a su estado normal
  zoomStyle.value = {
    transformOrigin: 'center center',
    transform: 'scale(1)',
    cursor: 'zoom-in',
  }
}

// Cuando cambia el proyecto o se abre el modal, ponemos la primera imagen y reseteamos zoom
watch(
  () => props.project,
  (newProject) => {
    if (newProject && newProject.todasLasImagenes.length > 0) {
      currentImage.value = newProject.todasLasImagenes[0]
      resetZoom()
    }
  },
)

// Resetear zoom también al cambiar de imagen interna
watch(currentImage, () => {
  resetZoom()
})

const close = () => {
  emit('close')
}

// Cerrar con la tecla ESC
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) close()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <!-- TRANSICIÓN DE ENTRADA/SALIDA -->
  <Transition name="modal">
    <div
      v-if="isOpen && project"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <!-- BACKDROP (FONDO OSCURO Y BORROSO) -->
      <div
        class="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        @click="close"
      ></div>

      <!-- CONTENIDO DEL MODAL -->
      <div
        class="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] flex overflow-hidden animate-scale-up"
      >
        <!-- BOTÓN DE CERRAR -->
        <button
          @click="close"
          class="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-gray-800 transition-colors shadow-sm"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <!-- ÁREA DE IMÁGENES (IZQUIERDA + CENTRO) -->
        <div class="flex-grow flex bg-gray-100 overflow-hidden">
          <!-- 1. TIRA DE MINIATURAS (IZQUIERDA) -->
          <div
            v-if="project.todasLasImagenes.length > 1"
            class="w-24 flex-shrink-0 flex flex-col gap-3 p-3 overflow-y-auto bg-white border-r border-gray-200 scrollbar-hide z-20"
          >
            <button
              v-for="(img, index) in project.todasLasImagenes"
              :key="index"
              @click="currentImage = img"
              :class="[
                'relative aspect-square rounded-lg overflow-hidden transition-all duration-300 flex-shrink-0',
                currentImage === img
                  ? 'ring-2 ring-blue-600 ring-offset-1 opacity-100'
                  : 'opacity-60 hover:opacity-100',
              ]"
            >
              <img :src="img" class="w-full h-full object-cover" />
            </button>
          </div>

          <!-- 2. VISOR PRINCIPAL (CENTRO) - CON ZOOM -->
          <!-- Agregamos overflow-hidden aquí para que el zoom no se salga del cuadro -->
          <div
            class="flex-grow flex items-center justify-center p-4 bg-gray-50 relative overflow-hidden"
          >
            <img
              :src="currentImage"
              class="max-w-full max-h-full object-contain shadow-lg rounded-md transition-transform duration-200 ease-out"
              :style="zoomStyle"
              @mousemove="handleMouseMove"
              @mouseleave="resetZoom"
            />
          </div>
        </div>

        <!-- 3. INFORMACIÓN (DERECHA) -->
        <div
          class="w-96 flex-shrink-0 bg-white p-8 flex flex-col overflow-y-auto border-l border-gray-100 z-20"
        >
          <!-- Encabezado Proyecto -->
          <div class="mb-6">
            <div class="flex items-center gap-3 mb-4" v-if="project.clienteLogoUrl">
              <img :src="project.clienteLogoUrl" class="h-10 w-auto object-contain" />
              <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">{{
                project.nombreCliente
              }}</span>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 leading-tight">
              {{ project.nombreProyecto }}
            </h2>
          </div>

          <!-- Descripción -->
          <div class="prose prose-blue text-gray-600 leading-relaxed mb-8">
            <p>{{ project.descripcion }}</p>
          </div>

          <!-- Footer / Call to Action -->
          <div class="mt-auto pt-6 border-t border-gray-100">
            <button
              class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Contactar sobre esto</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Animaciones para el modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes scaleUp {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Ocultar scrollbar pero mantener funcionalidad */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
