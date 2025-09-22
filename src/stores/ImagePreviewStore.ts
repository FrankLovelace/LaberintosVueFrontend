import { ref } from 'vue'

// Estado reactivo (el corazón de nuestro store)
const isVisible = ref<boolean>(false)
const imageUrl = ref<string>('')
const timer = ref<number | null>(null)

const PREVIEW_DELAY = 1000 // 1 segundo de retraso

// Funciones para modificar el estado (las acciones)
export function useImagePreview() {
  const showPreview = (url: string) => {
    // Si ya hay un timer, lo limpiamos para evitar múltiples popups
    if (timer.value) {
      clearTimeout(timer.value)
    }
    // Creamos un nuevo timer
    timer.value = window.setTimeout(() => {
      imageUrl.value = url
      isVisible.value = true
    }, PREVIEW_DELAY)
  }

  const hidePreview = () => {
    // Si el cursor se quita antes del delay, cancelamos el timer
    if (timer.value) {
      clearTimeout(timer.value)
    }
    // Ocultamos la vista previa
    isVisible.value = false
    imageUrl.value = ''
  }

  // Exponemos el estado y las funciones para que otros componentes los usen
  return {
    isVisible,
    imageUrl,
    showPreview,
    hidePreview,
  }
}
