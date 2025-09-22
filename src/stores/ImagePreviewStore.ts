import { ref, watch } from 'vue'

const isVisible = ref<boolean>(false)
const imageUrl = ref<string>('')

// --- LÓGICA MEJORADA PARA EL BOTÓN "ATRÁS" ---
const handlePopState = () => {
  // Si el popup está visible cuando el usuario navega hacia atrás, lo cerramos.
  if (isVisible.value) {
    isVisible.value = false
    imageUrl.value = ''
  }
}

// Observamos la variable 'isVisible'.
watch(isVisible, (newValue) => {
  if (newValue) {
    // Si el popup se hace visible, empezamos a escuchar el evento "popstate".
    window.addEventListener('popstate', handlePopState)
  } else {
    // Si el popup se oculta, dejamos de escuchar para no gastar recursos.
    window.removeEventListener('popstate', handlePopState)
  }
})

export function useImagePreview() {
  const showPreview = (url: string) => {
    imageUrl.value = url
    isVisible.value = true
  }

  const hidePreview = () => {
    isVisible.value = false
    imageUrl.value = ''
  }

  return {
    isVisible,
    imageUrl,
    showPreview,
    hidePreview,
  }
}
